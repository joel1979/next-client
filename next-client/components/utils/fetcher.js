function fetcher(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Basic insert base64 encoded string here`,
            'Content-Type': 'application/json',
            'cors': 'no-cors',

        },
    }).then(response => response.json());
}

export default fetcher;