const fromselect = document.querySelector("#fromselect");
const toselect = document.querySelector("#toselect");

const frominput = document.querySelector("#frominput");
const toinput = document.querySelector("#toinput");

const api = "https://open.er-api.com/v6/latest/USD";

//
const convert = document.querySelector("#convert");
const convertcontent = document.querySelector(".convertcontent");
const history = document.querySelector("#history");
const historycontent = document.querySelector(".historycontent");
history.addEventListener('click', function () {
    historycontent.style.display = "block";
    convertcontent.style.display = "none";
    history.style.backgroundColor = "#F0F5FA";
    convert.style.backgroundColor = "#FFFFFF";
});
convert.addEventListener('click', function () {
    historycontent.style.display = "none";
    convertcontent.style.display = "block";
    convert.style.backgroundColor = "#F0F5FA";
    history.style.backgroundColor = "#FFFFFF";
})

//https://www.w3schools.com/js/js_api_fetch.asp
function getAPI() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(result);
}

function result(currency) {
    const data = currency.rates;

    // document.querySelector("#update").innerHTML = `Update : ${currency.time_last_update_utc}`;

    // document.querySelector("#convert").addEventListener('click', function () {
    //     //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript?rq=1
    //     let from = currency.rates[fromselect.options[fromselect.selectedIndex].value];
    //     let to = currency.rates[toselect.options[toselect.selectedIndex].value];
        
    //     console.log(currency.rates["USD"]);
    //     let total = (to/from) * frominput.value;
    //     if (isNaN(total)) {
    //         alert("Select Currency !!!")
    //     } else {
    //         toinput.setAttribute('value', total);    
    //     }
    // });
}

getAPI();
