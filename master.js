let modal = document.getElementById("myModal");
let btn = document.querySelector(".addAccount");
let stkbtn = document.querySelector(".addStock")
let stkmodal = document.getElementById("myStockModal")
let span = document.getElementsByClassName("close")[0];
let stkclose = document.querySelector(".stkclose")
let submitButton = document.querySelector(".subm");
let subButton = document.querySelector(".subm1")
const error1 = document.querySelector("#error1");
const error2 = document.querySelector("#error2");
const error3 = document.querySelector("#error3");
const error4 = document.querySelector("#error4");
submitButton.addEventListener("click", () => {
    const code = document.querySelector("#account-c");
    const name = document.querySelector("#account-n");
    const inputValue = name.value;
    const codeValue = code.value;
    if(inputValue === "") {
        error1.style.display = 'block';
        error1.style.color = 'red';
        error2.style.display = 'block';
        error2.style.color = 'white';
    } else if (codeValue === "") {
        error1.style.display = 'block';
        error1.style.color = 'white';
        error2.style.display = 'block';
        error2.style.color = 'red';
    } else {
        const oldAccount = JSON.parse(localStorage.getItem('account'));
        if(oldAccount === null) {
            const newAccount = {
                [codeValue]: {
                    name: inputValue,
                    date: new Date().toLocaleDateString(),
                },
            };
            localStorage.setItem('account', JSON.stringify(newAccount));
        } else {
            oldAccount[codeValue] = {
                name: inputValue,
                date: new Date().toLocaleDateString(),
            };
            localStorage.setItem('account', JSON.stringify(oldAccount));
        }
        const added = document.querySelector("#added");
        added.style.display = 'block';
    }
});

subButton.addEventListener("click", function () {
    const code = document.querySelector("#stock-c");
    const name = document.querySelector("#stock-n");
    const inputValue = name.value;
    const codeValue = code.value;
    if(inputValue === "") {
        error3.style.display = 'block';
        error3.style.color = 'red';
        error4.style.display = 'block';
        error4.style.color = 'white';
    } else if (codeValue === "") {
        error3.style.display = 'block';
        error3.style.color = 'white';
        error4.style.display = 'block';
        error4.style.color = 'red';
    } else {
        const oldStock = JSON.parse(localStorage.getItem('stock'));
        if(oldStock === null) {
            const newStock = {
                [codeValue]: {
                    name: inputValue,
                    date: new Date().toLocaleDateString(),
                },
            };
            localStorage.setItem('stock', JSON.stringify(newStock));
        } else {
            oldStock[codeValue] = {
                name: inputValue,
                date: new Date().toLocaleDateString(),
            };
            localStorage.setItem('stock', JSON.stringify(oldStock));
        }
        const added = document.querySelector("#added1");
        added.style.display = 'block';
    }
});

btn.onclick = function() {
    modal.style.display = "block";
    document.body.classList.add("modal-open");
};

stkbtn.onclick = function() {
    stkmodal.style.display = "block";
    document.body.classList.add("modal-open");
}

stkclose.onclick = function() {
    stkmodal.style.display = "none";
    document.body.classList.remove('modal-open');
    document.querySelector("#stock-c").value = '';
    document.querySelector("#stock-n").value = '';
    const added = document.querySelector("#added1");
    added.style.display = 'none';
    error1.style.display = 'none';
    error2.style.display = 'none';
    clearStock();
    refreshStock();
}

span.onclick = function() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    document.querySelector("#account-c").value = '';
    document.querySelector("#account-n").value = '';
    const added = document.querySelector("#added");
    added.style.display = 'none';
    error1.style.display = 'none';
    error2.style.display = 'none';
    clearValues()
    refreshValues()
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        document.querySelector("#account-c").value = '';
        error1.style.display = 'none';
        error2.style.display = 'none';
        document.querySelector("#account-n").value = '';
        const added = document.querySelector("#added");
        added.style.display = 'none';
        clearValues()
        refreshValues()
    } else if(event.target == stkmodal) {
        stkmodal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.querySelector("#stock-c").value = '';
        document.querySelector("#stock-n").value = '';
        const added = document.querySelector("#added1");
        added.style.display = 'none';
        error1.style.display = 'none';
        error2.style.display = 'none';
        clearStock();
        refreshStock();
    }
};

function clearValues() {
    const allVals = document.querySelectorAll('.datarow');
    allVals.forEach((vale) => {
        vale.remove();
    })
}

function clearStock() {
    const AllVals = document.querySelectorAll('.datarow1');
    AllVals.forEach((val) => {
        val.remove();
    })
}

function refreshValues() {
    const accountValues = JSON.parse(localStorage.getItem('account'));
    for(const code in accountValues) {
        let accountMaster = document.querySelector('.account-master')
        const account = accountValues[code];
        let minusIcon = document.createElement("i");
        minusIcon.classList.add('fa-solid');
        minusIcon.classList.add('fa-minus');
        minusIcon.classList.add('boldertext');
        minusIcon.classList.add('removeAccount')
        minusIcon.id = code;
        minusIcon.style.marginRight = "2.5%";
        const rowE = document.createElement('div');
        rowE.classList.add('datarow');
        const codeDiv = document.createElement('div');
        codeDiv.classList.add('first-two');
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('last-two');
        const parah = document.createElement('p');
        parah.innerText = code;
        const parah2 = document.createElement('p');
        parah2.innerText = account.name;
        const parah3 = document.createElement('p');
        parah3.innerText = account.date;
        dateDiv.append(parah3);
        codeDiv.append(parah);
        codeDiv.append(parah2);
        rowE.append(codeDiv);
        rowE.append(dateDiv);
        rowE.append(minusIcon);
        accountMaster.append(rowE);
    }
    let arr = document.querySelectorAll('.removeAccount')
    arr.forEach((remover) => {
        remover.addEventListener("click", function () {
            let accountData = JSON.parse(localStorage.getItem('account'));
            delete accountData[remover.id];
            const newVal = JSON.stringify(accountData);
            localStorage.setItem('account', newVal);
            clearValues()
            refreshValues();
        });
    });
}

function refreshStock() {
    const stockValues = JSON.parse(localStorage.getItem('stock'));
    for(const stk in stockValues) {
        let stockMaster = document.querySelector('.securities-master')
        const stocks = stockValues[stk];
        let minusIcon = document.createElement("i");
        minusIcon.classList.add('fa-solid');
        minusIcon.classList.add('fa-minus');
        minusIcon.classList.add('boldertext');
        minusIcon.classList.add('removeStock')
        minusIcon.id = stk;
        minusIcon.style.marginRight = "2.5%";
        const rowE = document.createElement('div');
        rowE.classList.add('datarow1');
        const codeDiv = document.createElement('div');
        codeDiv.classList.add('first-two');
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('last-two');
        const parah = document.createElement('p');
        parah.innerText = stk;
        const parah2 = document.createElement('p');
        parah2.innerText = stocks.name;
        const parah3 = document.createElement('p');
        parah3.innerText = stocks.date;
        dateDiv.append(parah3);
        codeDiv.append(parah);
        codeDiv.append(parah2);
        rowE.append(codeDiv);
        rowE.append(dateDiv);
        rowE.append(minusIcon);
        stockMaster.append(rowE);
    }
    let arr = document.querySelectorAll('.removeStock')
    arr.forEach((remover) => {
        remover.addEventListener("click", function () {
            let stockData = JSON.parse(localStorage.getItem('stock'));
            delete stockData[remover.id];
            const newVal = JSON.stringify(stockData);
            localStorage.setItem('stock', newVal);
            clearStock()
            refreshStock();
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    refreshValues();
    refreshStock();
});

