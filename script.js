document.addEventListener('DOMContentLoaded', () => {
    const moneyDisplay = document.getElementById('money');
    const itemsContainer = document.querySelector('.items');
    const receiptList = document.getElementById('receipt-list');

    let money = 1_000_000_000_000;
    
    const items = [
        { name: 'Private Island', price: 50_000_000, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Private+Island' },
        { name: 'Luxury Yacht', price: 20_000_000, imageUrl: 'https://via.placeholder.com/150/808080/FFFFFF?text=Luxury+Yacht' },
        { name: 'Supercar', price: 2_000_000, imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Supercar' },
        { name: 'Diamond Watch', price: 100_000, imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Diamond+Watch' },
        { name: 'Mansion', price: 100_000_000, imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?text=Mansion' },
        { name: 'Space Shuttle Ride', price: 250_000, imageUrl: 'https://via.placeholder.com/150/000080/FFFFFF?text=Space+Shuttle' },
    ];

    function formatMoney(amount) {
        return amount.toLocaleString('en-US');
    }

    function updateMoneyDisplay() {
        moneyDisplay.textContent = formatMoney(money);
    }

    function renderItems() {
        itemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${formatMoney(item.price)}</p>
                <button class="buy-btn" data-price="${item.price}" data-name="${item.name}">Buy</button>
            `;
            itemsContainer.appendChild(itemCard);
        });
        setupEventListeners();
    }

    function setupEventListeners() {
        document.querySelectorAll('.buy-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const price = parseInt(e.target.dataset.price);
                const name = e.target.dataset.name;

                if (money >= price) {
                    money -= price;
                    updateMoneyDisplay();
                    addToReceipt(name, price);
                } else {
                    alert("You don't have enough money for that!");
                }
            });
        });
    }

    function addToReceipt(name, price) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name}: $${formatMoney(price)}`;
        receiptList.appendChild(listItem);
    }

    updateMoneyDisplay();
    renderItems();
});