var dataSet = [];

var table = new DataTable('#example', {
     columns: [
        {"title": "Short", data: "short"},
        {"title": "Name", data: "name"},
        {"title": "Type", data: "type"},
        {"title": "Country", data: "country"},
        {"title": "Amount", data: "amount"},
        {"title": "Source", data: "source"}
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
