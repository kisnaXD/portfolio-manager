document.addEventListener("DOMContentLoaded", function () {
    let tablebody = document.getElementById("table-rows");
    let portfolioDetails = JSON.parse(localStorage.getItem('portfolio'));
    for(const account in portfolioDetails) {
        for(stock in portfolioDetails[account]) {
            let accountOption = document.createElement('td');
            accountOption.textContent = account;
            let stockOption = document.createElement('td');
            let priceOption = document.createElement('td');
            let quantityOption = document.createElement('td');
            let totalOption = document.createElement('td');
            let row = document.createElement('tr');
            stockOption.textContent = stock;
            priceOption.textContent = portfolioDetails[account][stock]['price'];
            quantityOption.textContent = portfolioDetails[account][stock]['quantity'];
            totalOption.textContent = Number(portfolioDetails[account][stock]['price']) * Number(portfolioDetails[account][stock]['quantity']);

            row.append(accountOption);
            row.append(stockOption);
            row.append(priceOption);
            row.append(quantityOption);
            row.append(totalOption);

            tablebody.append(row);
        }
    }
});