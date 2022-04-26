function parseCookie() {
    const cookies = {};
    const raw = document.cookie;
    let split = raw.split(';');
    console.log(split);
    for (const i of split) {
        let cookie = i.split('=');
        cookies[cookie[0].trim()] = cookie[1].trim();
    }
    return cookies;
}

function analyze(jsonText) {
    // parse JSON
    const json = JSON.parse(jsonText);
    // when the document is ready,
    $(function() {
        // iterate through the data
        if (parseCookie()['username']) {
            for (const item of json.nav.loggedIn) {
                // append data to page with JQuery
                let name = item.name;
                if (name === 'replace') {
                    name = parseCookie()['username'];
                }
                $('header ul').append(`<li class="${item.class}">
                <a href="${item.href}">${name}</a></li>`);
            }
        } else {
            for (const item of json.nav.newUser) {
                $('header ul').append(`<li class="${item.class}">
                <a href="${item.href}">${item.name}</a></li>`);
            }
        }

        for (const item of json.footer) {
            $('footer>ul').append(`<li id="li${json.footer.indexOf(item)}">
            <h4>${item[0]}</h4><ul></ul></li>`);
            for (const i of item[1]) {
                $(`footer>ul li#li${json.footer.indexOf(item)} ul`).append(`<li>${i}</li>`);
            }
        }
    });
    return json;
}
const xhttp = new XMLHttpRequest();
let response;
xhttp.onload = function() {
    response = xhttp.responseText;
    const json = analyze(response);
}
xhttp.open('GET', '/js/json/dynamic.json');
xhttp.send();