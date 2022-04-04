function parseQuery(queryString) {
    let queries = queryString.replace('?', '').split('&');
    let parsedQueries = {};
    for (let i = 0; i < queries.length; i++) {
        const query = queries[i].split('=');
        parsedQueries[query[0]] = query[1];
    }
    return parsedQueries;
}
const queries = parseQuery(decodeURI(location.pathname.concat(location.search)).split('?')[1]);
console.log(queries.toString());
let formData = {};
for (const query in queries) {
    if (Object.hasOwnProperty.call(queries, query)) {
        const data = queries[query].replace(/\+/g, ' ');
        console.log(data);
        formData[query] = data;
    }
}
if (true) { // will add checking code
    $('main h1>span').append(formData['title']);
    $('main table>tbody').append(
        `<tr>
			<th>Title:</th>
			<td>${formData['title']}</td>
		</tr>
		<tr>
			<th>Description:</th>
			<td>${formData['meta-d']}</td>
		</tr>`
    );
}