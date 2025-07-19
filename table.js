var dataSet = [];

var table = new DataTable('#example', {
     columns: [
        {
            "title": "Short", 
            data: "short"
        },
        {
            "title": "Name", 
            data: "name",
            render: function (data, type) {
                if (type === 'display') {
                    return '<a href="' + data["homepage"] + '">' + data["name"] + '</a>';
                }
 
                return data["name"];
            }
        },
        {
            "title": "Type", 
            data: "type"
        },
        {"title": "Country", data: "country"},
        {
            "title": "Amount (LTC)", 
            data: "amount",
            render: function (data, type) {
                if (type === 'display') {
                    return '<a href="' + data[0]["source"] + '">' + data[0]["amount"].toLocaleString(
                                              undefined, // leave undefined to use the visitor's browser 
                                                         // locale or a string like 'en-US' to override it.
                                              { minimumFractionDigits: 2 }
                                            ); + '</a>';
                }
 
                return data[0]["amount"];
            }
        }
    ],
    data: dataSet,
    order: [4, "desc"]
})

async function fetchData(filename) {
    const response = await fetch("table.json")
        .then(response => response.json()) // Parse JSON
        .then(result => table.rows.add(result).draw()) // Parse JSON
        .catch(error => console.error('Error fetching JSON:', error));
    return response;
}

async function load() {
    const result = fetchData();
}

load(); 
