function ajax(method, url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onloadend = () => {
            if (xhr.status > 199 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    code: xhr.status,
                    error: JSON.parse(xhr.response).error
                });
            }
        };

        xhr.open(method, url);

        if (method.toUpperCase() !== 'GET') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        data ? xhr.send(JSON.stringify(data)) : xhr.send();
    });
}
