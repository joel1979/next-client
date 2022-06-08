function fetcher(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': 'Basic b3BlbmVoclBPQyE6ZGYhMTMjbExpIyUxMzM3cCxX',
            'Content-Type': 'application/json',
            'cors': 'no-cors',

        },
    }).then(response => response.json());
}

export default fetcher;