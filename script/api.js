const fromselect = document.querySelector("#fromselect");
const toselect = document.querySelector("#toselect");

const frominput = document.querySelector("#frominput");
const toinput = document.querySelector("#toinput");

const api = "https://open.er-api.com/v6/latest/USD";

//https://www.w3schools.com/js/js_api_fetch.asp
function getAPI() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(result);
}

function result(currency) {
    const data = currency.rates;
    // console.log(data);

    // Rate
    document.querySelector("#jpy").innerHTML = `${data["JPY"]}`;
    document.querySelector("#krw").innerHTML = `${data["KRW"]}`;
    document.querySelector("#idr").innerHTML = `${data["IDR"]}`;
    document.querySelector("#rub").innerHTML = `${data["RUB"]}`;


    document.querySelector("#update").innerHTML = `Last Updated : ${currency.time_last_update_utc}`;

    document.querySelector("#convertbtn").addEventListener('click', function () {
        //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript?rq=1
        let from = currency.rates[fromselect.options[fromselect.selectedIndex].value];
        let to = currency.rates[toselect.options[toselect.selectedIndex].value];
        
        let total = (to/from) * frominput.value;
        console.log("total : " + total);

        if (isNaN(total)) {
            swalAlert("error", "Select Currency !", "Error");;
        } else {
            toinput.setAttribute('value', total);  
            addHistory({
                from : fromselect.options[fromselect.selectedIndex].value,
                to : toselect.options[toselect.selectedIndex].value,
                amount : frominput.value,
                result : String(total)
            });
            readHistory();
        }
    });
}
getAPI();
