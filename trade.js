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
            selectBoxStock.innerHtML = ''
            const noneOption = document.createElement('option');
            noneOption.innerText = 'None';

            accountCell.textContent = code;
            stockCell.textContent = positionData[code][indexa]['stock'];
            priceCell.textContent = positionData[code][indexa]['price'];
            quantityCell.textContent = positionData[code][indexa]['quantity'];
            stockOption.innerText = positionData[code][indexa]['stock'];

            
            selectBoxStock.append(stockOption);
            selectBoxStock.append(noneOption);
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
            }
            let portfolioDetails = JSON.parse(localStorage.getItem('portfolio'));
            console.log(portfolioDetails)
            if(portfolioDetails === null) {
                let newDetails = {
                    [selectBoxAccount.value]: {
                        [selectBoxStock.value]: {
                            price: inputPrice.value,
                            quantity: inputQuantity.value,
                        },
                    },
                };
                console.log(JSON.stringify(newDetails));
                localStorage.setItem('portfolio', JSON.stringify(newDetails));
            } else {
                const accDetails = portfolioDetails[selectBoxAccount.value];
                let f = 0
                for(const stock in accDetails) {
                    if(selectBoxStock.value === stock) {
                        f = 0
                        break;
                    } else {
                        f = 1;
                        continue;
                    }
                }
                if(f===0) {
                    console.log(portfolioDetails)
                    const stockDetails = accDetails[selectBoxStock.value];
                    const newPrice = (Number(stockDetails['price'])*Number(stockDetails['quantity']) + Number(inputPrice.value)*Number(inputQuantity.value))/(Number(stockDetails['quantity']) + Number(inputQuantity.value));
                    const newQuantity = Number(inputQuantity.value) + Number(stockDetails['quantity']);
                    portfolioDetails[selectBoxAccount.value][selectBoxStock.value]['price'] = newPrice;
                    portfolioDetails[selectBoxAccount.value][selectBoxStock.value]['quantity'] = newQuantity;
                    localStorage.setItem('portfolio', JSON.stringify(portfolioDetails));
                } else if(f===1) {
                    console.log(portfolioDetails)
                    portfolioDetails[selectBoxAccount.value][selectBoxStock.value] = {
                        price: inputPrice.value,
                        quantity: inputQuantity.value,
                    };
                    localStorage.setItem('portfolio', JSON.stringify(portfolioDetails));
                }
            }
            refreshPositions();
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
            const currentStocks = JSON.parse(localStorage.getItem('portfolio'));
            console.log(selectBoxAccount.value);
            const accountStocks = currentStocks[selectBoxAccount.value];
            console.log(accountStocks)
            console.log(accountStocks[selectBoxStock.value]);
            let sum = Number(accountStocks[selectBoxStock.value]['quantity']);
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
                let portfolioDetails = JSON.parse(localStorage.getItem('portfolio'));
                let positionDetails = JSON.parse(localStorage.getItem('position'));
                let accountPositions = positionDetails[selectBoxAccount.value];
                let remaining = Number(inputQuantity.value);
                let price = 0;
                let arr = [];
                for(const stock in accountPositions) {
                    if(stock === 'length') {
                        break;
                    }
                    if (accountPositions[stock]['quantity'] < remaining && accountPositions[stock]['stock'] === selectBoxStock.value) {
                        arr.push(stock);
                        remaining = remaining - Number(accountPositions[stock]['quantity']);
                    } else if(accountPositions[stock]['quantity'] >= remaining && accountPositions[stock]['stock'] === selectBoxStock.value) {
                        arr.push(stock);
                        remaining = accountPositions[stock]['quantity'] - remaining; 
                        price = remaining*Number(accountPositions[stock]['price']);   
                    }
                }
                let sum1 = remaining;
                let sum2 = price;
                console.log(sum1);
                console.log(sum2);
                console.log(arr);
                for(let i = Number(arr[arr.length-1])+1; i<accountPositions['length']; i++) {
                    if(i === Number(accountPositions['length'])-1) {
                        break;
                    }
                    if(accountPositions[i]['stock'] === selectBoxStock.value) {
                        sum1 += Number(accountPositions[i]['quantity']);
                        sum2 += Number(accountPositions[i]['quantity'])*Number(accountPositions[i]['price']);
                    }
                }
                portfolioDetails[selectBoxAccount.value][selectBoxStock.value] = {
                    price: sum2/sum1,
                    quantity: sum1,
                }
                localStorage.setItem('portfolio', JSON.stringify(portfolioDetails));
            }
        }
    })

    refreshAccountValues();
    refreshStockValues();
    refreshPositions();
});