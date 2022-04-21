function parseQuery(queries) {
    let parsedQueries = {};
    for (let q in queries) {
        const query = queries[q];
        parsedQueries[q] = query.replace(/\+/g, ' ').replace(/%2C/gi, ',').replace(/%3A/gi, ':');
    }
    return parsedQueries;
}
$(function() {
    const raw = JSON.parse($('data').attr('value'));
    const queries = parseQuery(raw);
    if (true) { // will add checking code
        $('main h1>span').append(queries['meta-t']);
        $('main table>tbody').append(
            `<tr>
                <th>Title:</th>
                <td>${queries['meta-t']}</td>
            </tr>
            <tr>
                <th>Description:</th>
                <td>${queries['meta-d']}</td>
            </tr>
            <tr>
                <th>Keywords:</th>
                <td>${queries['meta-k']}</td>
            </tr>
            <tr>
                <th>Author:</th>
                <td>${queries['meta-a']}</td>
            </tr>
            <tr>
                <th>Overall Layout:</th>
                <td>${queries['layout-o']}</td>
            </tr>`
        );
        $('button#approve').click(function(e) {
            if (confirm('Are you sure you want to approve the form data?')) {
                $('main section>section').hide();
                $('main section').append('<b>Approved</b><a href="/">Go to home</a>');
                $.ajax({
                    url: '/data/',
                    method: 'POST',
                    data: JSON.stringify(queries),
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
});