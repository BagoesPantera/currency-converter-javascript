const fromselect = document.querySelector("#fromselect");
const toselect = document.querySelector("#toselect");

const frominput = document.querySelector("#frominput");
const toinput = document.querySelector("#toinput");

const api = "https://free.currconv.com/api/v7/currencies?apiKey=";
const apiKey = "c899b09fb8f6b1b3631f";

//https://www.w3schools.com/js/js_api_fetch.asp
function getAPI() {
    fetch(`${api}${apiKey}`) 
        .then(currency => {
            return currency.json();
        }).then(result);
}

function result(currency) {
    const data = currency.results;
    
    //https://stackoverflow.com/questions/42329050/how-to-get-iterate-json-object-and-json-array-using-javascript-foreach
    //to
    toselect.innerHTML = ``;
    toselect.innerHTML += `<option selected>Choose...</option>`;
    //from
    fromselect.innerHTML = ``;
    fromselect.innerHTML += `<option selected>Choose...</option>`;

    Object.entries(data).forEach(function([key, item]){
        fromselect.innerHTML += `
        <option value="${item.id}">${item.currencyName}</option>
        `;
        toselect.innerHTML += `
        <option value="${item.id}">${item.currencyName}</option>
        `;
    });

    //https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
    //random
    var randomProperty = function () {
        var keys = Object.keys(data);
        return data[keys[ keys.length * Math.random() << 0]];
    };

    for (var i = 0; i < 4; i++) {
        randomData = randomProperty();

        //
        var api = async (curId, curName) => {
            const response = await fetch(`https://free.currconv.com/api/v7/convert?q=USD_${curId}&compact=ultra&apiKey=${apiKey}`);
            const json = await response.json();

            tes = `USD_${curId}`;
            bodyrate = document.querySelector("#bodyrate");        
            bodyrate.innerHTML += `
            <tr>
                <td>${curName}</td>
                <td>${json[tes]}</td>
            </tr>`;
        }
        api(randomData.id, randomData.currencyName);
    }

    //count
    var keyCount  = Object.keys(data).length;
    document.querySelector("#currencyCount").innerHTML = `. . . and ${keyCount - 5}+ more currencies.`;

    document.querySelector("#convertbtn").addEventListener('click', function () {
        var api = async (curFrom, curTo) => {
            if (curFrom === "Choose..." || curTo === "Choose...") {
                swalAlert("error",  "Error", "Select Currency !");
            }else if (frominput.value < 0) {
                swalAlert("error", "Error", "Is your money negative ?");
            }else {
                const response = await fetch(`https://free.currconv.com/api/v7/convert?q=${curFrom}_${curTo}&compact=ultra&apiKey=${apiKey}`);
                const json = await response.json();

                tes = `${curFrom}_${curTo}`;
                total = frominput.value * json[tes];
                console.log(`TOTAL = ${total}`);
                if (isNaN(total)) {
                    swalAlert("error",  "Error", "Input a number !");
                }else{
                     toinput.setAttribute('value', total);  
                    addHistory({
                        from : fromselect.options[fromselect.selectedIndex].text,
                        to : toselect.options[toselect.selectedIndex].text,
                        amount : frominput.value,
                        result : String(total)
                    });
                    readHistory();
                }
            }
        }
        //https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript?rq=1
        api(fromselect.options[fromselect.selectedIndex].value, toselect.options[toselect.selectedIndex].value);
    });
}
getAPI();
