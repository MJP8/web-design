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
        const data = queries[query].replace(/\+/g, ' ').replace(/%2C/gi, ',').replace(/%3A/gi, ':');
        console.log(data);
        formData[query] = data;
    }
}
if (true) { // will add checking code
    $('main h1>span').append(formData['meta-t']);
    $('main table>tbody').append(
        `<tr>
			<th>Title:</th>
			<td>${formData['meta-t']}</td>
		</tr>
		<tr>
			<th>Description:</th>
			<td>${formData['meta-d']}</td>
		</tr>
        <tr>
            <th>Keywords:</th>
            <td>${formData['meta-k']}</td>
        </tr>
        <tr>
            <th>Author:</th>
            <td>${formData['meta-a']}</td>
        </tr>
        <tr>
            <th>Overall Layout:</th>
            <td>${formData['layout-o']}</td>
        </tr>`
    );
    $('button#approve').click(function(e) {
        if (confirm('Are you sure you want to approve the form data?')) {
            $('main section>section').hide();
            $('main section').append('<b>Approved</b><a href="/">Go to home</a>');
            $.ajax({
                url: '/data/',
                method: 'POST',
                data: JSON.stringify(formData),
                contentType: 'application/json; charset=UTF-8'
            });
        } else {
            location.assign('/new_site/');
        }
    });
    $('button#cancel').click(function(e) {
        location.assign('/new_site/');
    });
}