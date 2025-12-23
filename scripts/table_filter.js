
const radioButtons = document.querySelectorAll('input');

function toType(text){
    if(text == 'public-company'){
        return 'public-company'
    }
    if(text == 'defi'){
        return 'other'
    }
    if(text == 'collectible'){
        return 'other'
    }
    if(text == 'exchange-traded-product'){
        return 'investment'
    }
    if(text == 'publicly-traded-fund'){
        return 'investment'
    }
}
// Define the event handler function
function handleSelection(event) {
    const filter = event.target.value;
    const table = document.getElementById("dataTable");
    const trs = table.getElementsByTagName("tr");
    var total = 0;
    for (i = 0; i < trs.length; i++) {
        const tr = trs[i];
        const td = tr.getElementsByTagName("td");
        if(td.length <= 1){
            continue;
        }
        if(td[2].innerText != 'Total'){
            const found = filter == 'all' || toType(td[3].innerText) == filter;
            if (found) {
                total += parseInt(td[5].innerText.replaceAll(',', ''))
                tr.style.display = "";
            } else {
                tr.style.display = "none";
            }
        } else {
            td[5].innerHTML = '<b>' + total.toLocaleString() + '</b>';
              let formatter = Intl.NumberFormat('en', { notation: 'compact' });
            td[6].innerHTML = '<b>' + '$' + formatter.format((total*price)) +  '</b>';
        }
    }
}

// Attach 'change' event listener to each radio button
radioButtons.forEach(radio => {
radio.addEventListener("change", handleSelection);
});
 
