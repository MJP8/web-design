const xhttp = new XMLHttpRequest();
let response;
xhttp.onload = function() {
    response = xhttp.responseText;
    let json = JSON.parse(response);
    console.log(json.message);
}
xhttp.open('GET', '/js/json/dynamic.json');
xhttp.send();