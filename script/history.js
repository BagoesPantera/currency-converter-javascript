//
const storageNm = 'CyconHistory';
let history = [];

function a(data) {
    console.log(data);
}

//Primedev Calculator
function addHistory(data){
    if(localStorage.getItem(storageNm) !== null){
        history = JSON.parse(localStorage.getItem(storageNm));
    } 
    if(history.length > 3){
        history.shift();
    }
    history.push(data);
    localStorage.setItem(storageNm, JSON.stringify(history));
}

function readHistory(){
    const historyDisplay = document.querySelector("#historydisplay");
    if(localStorage.getItem(storageNm) !== null){
        history = JSON.parse(localStorage.getItem(storageNm))
        historyDisplay.innerHTML = `
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Amount</th>
            <th scope="col">Result</th>
          </tr>
        </thead>`;
        history.forEach(function (data, i) {
            historyDisplay.innerHTML += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${data.from}</td>
                <td>${data.to}</td>
                <td>${data.amount}</td>
                <td>${data.result}</td>
              </tr>
            `;
        });
        historyDisplay.innerHTML += `</tbody>
        <button class="btn btn-danger mt-3" id="clearhistoryBTN">Clear History</button>`;

        document.querySelector("#clearhistoryBTN").addEventListener('click', function () {
                // swal
                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem(storageNm);  
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    readHistory();
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                    )
                }
                });
        });
    }else{
        historyDisplay.innerHTML = `<p class="text-center">No history available</p>`;
    }
}
readHistory();


