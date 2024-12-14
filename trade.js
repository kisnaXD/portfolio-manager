function refreshAccountValues() {
    const accountData = JSON.parse(localStorage.getItem('account'));
    const tableBody = document.querySelector("#accountTable tbody");
    tableBody.innerHTML = ''
    for (const code in accountData) {
        const account = accountData[code];
        const row = document.createElement('tr');
        const codeCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const codeOption = document.createElement('option');
        let selectBoxAccount = document.getElementById("accountSelector");

        codeOption.innerText = code;
        codeCell.textContent = code;
        nameCell.textContent = account.name;
        nameCell.classList.add('right');

        selectBoxAccount.append(codeOption);
        row.append(codeCell);
        row.append(nameCell);

        tableBody.append(row);
    }
}

function refreshStockValues() {
    const stockData = JSON.parse(localStorage.getItem('stock'));
    const tableBody = document.querySelector("#securitiesTable tbody");
    tableBody.innerHTML = ''
    for(const code in stockData) {
        const row = document.createElement('tr');
        const codeCell = document.createElement('td');
        const codeOption = document.createElement('option');
        let selectBoxStock = document.getElementById("stockSelector");

        codeOption.innerText = code;
        codeCell.textContent = code;
        codeCell.classList.add('center');

        selectBoxStock.append(codeOption);
        row.append(codeCell);

        tableBody.append(row);
    }
}

function refreshPositions() {
    const positionData = JSON.parse(localStorage.getItem('position'));
    const tableBody = document.querySelector("#positionsTable tbody");
    tableBody.innerHTML = ''
    for(const code in positionData) {
        let selectBoxAccount = document.getElementById("sellAccountSelector");

        const accountOption = document.createElement('option');
        accountOption.innerText = code;
        selectBoxAccount.append(accountOption);
        for(const indexa in positionData[code]) {
            if(indexa==='length') {
                break;
            }
            const row = document.createElement('tr');
            const accountCell = document.createElement('td');
            const stockCell = document.createElement('td');
            const priceCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const stockOption = document.createElement('option');
            
            let selectBoxStock = document.getElementById("sellStockSelector");

            accountCell.textContent = code;
            stockCell.textContent = positionData[code][indexa]['stock'];
            priceCell.textContent = positionData[code][indexa]['price'];
            quantityCell.textContent = positionData[code][indexa]['quantity'];
            stockOption.innerText = positionData[code][indexa]['stock'];

            
            selectBoxStock.append(stockOption);
            row.append(accountCell);
            row.append(stockCell);
            row.append(quantityCell);
            row.append(priceCell);

            tableBody.append(row);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("FailModal");
    let buyBut = document.querySelector(".addBuyOrderButton");
    let selBut = document.querySelector(".sellOrderButton");
    let dateParah = document.querySelectorAll('#show-date');
    dateParah.forEach((dP) => {
        dP.innerText = new Date().toLocaleDateString();
    });
    let span = document.querySelector("#modal-closer");
    buyBut.addEventListener("click", function () {
        let selectBoxAccount = document.getElementById("accountSelector");
        let selectBoxStock = document.getElementById("stockSelector");
        let inputQuantity = document.getElementById("quantityInput");
        let inputPrice = document.getElementById("priceInput");
        let date = new Date();
        console.log(selectBoxAccount.value);
        if(selectBoxAccount.value === "None") {
            modal.style.display = "block"
            document.body.classList.add('modal-open');
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Account cannot be None";
        } else if(selectBoxStock.value === "None") {
            modal.style.display = "block"
            document.body.classList.add('modal-open');
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Stock cannot be None";
        } else if(inputQuantity.value === "" || inputQuantity.value === '0') {
            modal.style.display = "block";
            document.body.classList.add('modal-open');
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Quantity cannot be Empty or Zero"
        } else if(inputPrice.value === '' || inputPrice.value === '0') {
            modal.style.display = 'block';
            document.body.classList.add("modal-open");
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Price cannot be Empty or Zero";
        } else {
            document.querySelector(".successPara").style.display = 'none';
            setTimeout(function () {
                document.querySelector(".successPara").style.display = 'block';
            }, 100);

            const currentStocks = JSON.parse(localStorage.getItem('position'));
            if (currentStocks === null) {
                const newStocks = {
                    [selectBoxAccount.value] : {
                        0 : {
                            stock: selectBoxStock.value,
                            quantity: inputQuantity.value,
                            price: inputPrice.value,
                            date: date,
                        },
                        length: 1,
                    },
                };
                localStorage.setItem('position', JSON.stringify(newStocks));
            } else {
                const accountStocks = currentStocks[selectBoxAccount.value];
                if(accountStocks === undefined) {
                    currentStocks[selectBoxAccount.value] = {
                        0 : {
                            stock: selectBoxStock.value,
                            quantity: inputQuantity.value,
                            price: inputPrice.value,
                            date: date,
                        },
                        length: 1
                    };
                } else {
                    currentStocks[selectBoxAccount.value][currentStocks[selectBoxAccount.value].length] = {
                        stock: selectBoxStock.value,
                        quantity: inputQuantity.value,
                        price: inputPrice.value,
                        date: date,
                    };
                    currentStocks[selectBoxAccount.value].length +=1;
                }

                localStorage.setItem('position', JSON.stringify(currentStocks));
                refreshPositions();
            }
        }
    });

    span.addEventListener("click", function () {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    window.onclick = function (event) {
        if(event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    selBut.addEventListener("click", function () {
        let selectBoxAccount = document.getElementById("sellAccountSelector");
        let selectBoxStock = document.getElementById("sellStockSelector");
        let inputQuantity = document.getElementById("sellQuantitySelector");
        let inputPrice = document.getElementById("sellPriceSelector");
        let date = new Date().toLocaleDateString();
        console.log(selectBoxAccount.value);
        if(selectBoxAccount.value === "None") {
            modal.style.display = "block"
            document.body.classList.add('modal-open');
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Account cannot be None";
        } else if(selectBoxStock.value === "None") {
            modal.style.display = "block"
            document.body.classList.add('modal-open');
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = `Stock cannot be "None"`;
        } else if(inputQuantity.value === "") {
            modal.style.display = "block";
            document.body.classList.add('modal-open');
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Quantity cannot be Empty"
        } else if(inputPrice.value === '') {
            modal.style.display = 'block';
            document.body.classList.add("modal-open");
            let modalPara = document.querySelector('.modal-para');
            modalPara.innerText = "Price cannot be Empty";
        } else {
            const currentStocks = JSON.parse(localStorage.getItem('position'));
            const accountStocks = currentStocks[selectBoxAccount.value];
            console.log(accountStocks);
            let sum = 0
            for(const code in accountStocks) {
                console.log(code);  
                if(code === "length") {
                    break;
                }
                if(accountStocks[code]['stock'] === selectBoxStock.value){
                    sum+=Number(accountStocks[code]['quantity']);
                }
                console.log(sum);
            }
            if(sum===0) {
                modal.style.display = 'block';
                document.body.classList.add("modal-open");
                let modalPara = document.querySelector('.modal-para');
                modalPara.innerText = "Stock has not been purchased by you";
            } else if(inputQuantity.value > sum) {
                modal.style.display = 'block';
                document.body.classList.add("modal-open");
                let modalPara = document.querySelector('.modal-para');
                modalPara.innerText = "You do not have enough stocks";
            } else {
                document.querySelector(".failPara").style.display = 'none';
                setTimeout(function () {
                    document.querySelector(".failPara").style.display = 'block';
                }, 100);
                const sellOrders = JSON.parse(localStorage.getItem('sellOrders'));
                if(sellOrders === null) {
                    const newSellOrder = {
                        [selectBoxAccount.value] : {
                            0: {
                                stock: selectBoxStock.value,
                                quantity: inputQuantity.value,
                                price: inputPrice.value,
                            },
                            length: 1,
                        },
                    }
                    localStorage.setItem('sellOrders', JSON.stringify(newSellOrder));
                } else {
                    const accountSells = sellOrders[selectBoxAccount.value];
                    if(accountSells === undefined) {
                        sellOrders[selectBoxAccount.value] = {
                            0: {
                                stock: selectBoxStock.value,
                                quantity: inputQuantity.value,
                                price: inputPrice.value,
                            },
                            length: 1,
                        };

                        localStorage.setItem('sellOrders', JSON.stringify(sellOrders));
                    } else {
                        sellOrders[selectBoxAccount.value][sellOrders[selectBoxAccount.value].length] = {
                            stock: selectBoxStock.value,
                            quantity: inputQuantity.value,
                            price: inputPrice.value,
                        };
                        sellOrders[selectBoxAccount.value].length +=1;
                        localStorage.setItem('sellOrders', JSON.stringify(sellOrders));
                    }
                }
            }
        }
    })

    refreshAccountValues();
    refreshStockValues();
    refreshPositions();
});