function analyze(jsonText) {
    // parse JSON
    const json = JSON.parse(jsonText);
    // when the document is ready,
    $(function() {
        // iterate through the data
        for (const item of json.nav) {
            // append data to page with JQuery
            $('header ul').append(`<li class="${item.class}">
            <a href="${item.href}">${item.name}</a></li>`);
        }
        for (const item of json.footer) {
            $('footer ul').append(`<li id="li${json.footer.indexOf(item)}">
            <h5>${item[0]}</h5><ul></ul></li>`);
            for (const i of item[1]) {
                $(`footer ul li#li${json.footer.indexOf(item)} ul`).append(`<li>${i}</li>`);
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
    console.log(json.message);
}
xhttp.open('GET', '/js/json/dynamic.json');
xhttp.send();