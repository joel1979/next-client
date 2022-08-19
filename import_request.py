# Integration application 
# Author Joel Pettersson 220425

# This application has not been tested for clinical use and is not CE-marked.
# It may therefore be used for research purposes only and comes without any guarantees.

import requests
import ssl
import logging
import json

# ssl wizardry
ssl._create_default_https_context = ssl._create_unverified_context


# If behind a proxy (with auth)
proxies = {
    "http": "http://user:pass@proxy.domain.se:8080"
}

# Endpoints 
url_endpoint1 = ""
url_endpoint2 = ""

# Data to be consumed by APIs
querystring_inca = {"q:", "personnummer:"}
querystring_ro = {"q:",}

# Add headers (pass authentication)
headers_inca = {
}
headers_ro = {
}


try: 
    # No need for proxy since the API-call is made internally
    response = requests.request("POST", url_endpoint1, verify=False, data=querystring_ro, headers=headers_ro)
    response.raise_for_status()
    
    jsonResponse = response.json()
    
    # If JSON response contains attribute () send request to INCA.
    if 'attribute' in jsonResponse:
        response = requests.request("POST", url_endpoint2, proxies=proxies, verify=False, data=querystring_inca, headers=headers_inca)

except:
    response = requests.request("POST", url_endpoint2, proxies=proxies, verify=False, data=querystring_inca, headers=headers_inca)
    response.raise_for_status()
    
    if response.status_code != 200:
        logging.basicConfig(filename='std.log', filemode='w', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        logging.warning('Could not connect to INCA endpoint')   