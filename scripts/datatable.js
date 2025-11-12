/*
    Copyright 2025 litecoinregister.com Developers

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var table_config = {
    responsive: true,    
    autoWidth: true,
    order: [5, "desc"],
     columns: [
        {
            "title": "", 
            data: "rank",
            className: "nowrap",
            responsivePriority: 3
        },
        {
            "title": "Short", 
            data: "short",
            className: "nowrap",
            responsivePriority: 6
        },
        {
            "title": "Name", 
            data: "name",
            className: "nowrap  all",
            render: function (data, type) {
                if (type === 'display') {
                    console.log(data);
                    return '<a href="profile/' + data["slug"] + '.html">' + data["name"] + '</a>';
                }
 
                return data["name"];
            },
            responsivePriority: 2
        },
        {
            "title": "Type", 
            data: "type",
            className: "nowrap",
            responsivePriority: 5
        },
        {
            "title": "Country", 
            data: "country",
            responsivePriority: 7,
            render: function (data, type) {
                if (type === 'display') {
                    if(data == "United States"){
                        return "🇺🇸";
                    } else if (data == "Canada"){
                        return "🇨🇦";
                    } else if (data == "Germany"){
                        return "🇩🇪";
                    } else if (data == "Switzerland"){
                        return "🇨🇭";
                    } else if (data == "Sweden"){
                        return "🇸🇪";
                    } else if (data == "Hogwarts"){
                        return "🧙";
                    }
                    return "❓";
                }
                
                return data;
            }
        },
        {
            "title": "Amount (LTC)", 
            data: "events",
            className: "nowrap all",
            responsivePriority: 1,
            render: function (data, type) {
                if (type === 'display') {
                    if(data[0]['approx']){
                        prefix = "~";
                    } else {
                        prefix = "";
                    }
                    return prefix + data[0]["amount"].toLocaleString(
                          undefined, // leave undefined to use the visitor's browser 
                                     // locale or a string like 'en-US' to override it.
                          { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                        );
                }
                
                return data[0]["amount"];
            }
        },
        {
            "title": "Amount (USD)", 
            data: "events",
            render: function (data, type) {
                if (type === 'display') {
                    if(data[0]['approx']){
                        prefix = "~$";
                    } else {
                        prefix = "$";
                    }
                    return prefix + (price * data[0]["amount"]).toLocaleString(
                                              undefined, // leave undefined to use the visitor's browser 
                                                         // locale or a string like 'en-US' to override it.
                                              { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                                            );
                }
 
                return data[0]["amount"];
            },
            responsivePriority: 4
        }
    ],    
    layout: {
        topStart: {   
            buttons: [
                {            
                    text: 'Columns',
                    extend: 'colvis',
                    popoverTitle: 'Column visibility selector'
                }
            ],
            pageLength: {
                menu: [5, 10, 25, 50, -1]
            }
        },        
        topEnd: "search",
        bottomStart: {
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: ['copy', 'excel', 'csv', 'pdf', 'print']
                }
            ]
        },
        bottomEnd: {      
            info: {
                text: 'Table display: _START_ to _END_ of _TOTAL_ records'
            },      
            paging: {}
        }
    }
}

async function draw_datatable() {
    var table = new DataTable('#example', table_config);
    data.sort(function(a, b){ return b['events'][0]["amount"] - a['events'][0]["amount"]});
    for(var i = 0; i < data.length; i++ ){
        data[i]['rank'] = i + 1;
    };
    table.rows.add(data).draw();
    table.responsive.rebuild();
    table.responsive.recalc();
    table.columns.adjust().draw();
}
    
