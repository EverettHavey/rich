document.addEventListener('DOMContentLoaded', () => {
    const moneyDisplay = document.getElementById('money');
    const itemsContainer = document.querySelector('.items');
    const receiptList = document.getElementById('receipt-list');

    const modal = document.getElementById('buy-modal');
    const modalItemName = document.getElementById('modal-item-name');
    const modalItemPrice = document.getElementById('modal-item-price');
    const quantityInput = document.getElementById('quantity');
    const totalCostDisplay = document.getElementById('total-cost');
    const confirmBuyBtn = document.getElementById('confirm-buy-btn');
    const closeBtn = document.querySelector('.close-btn');

    let money = 1_000_000_000_000;
    let selectedItemPrice = 0;
    let selectedItemName = '';

    const items = [
        { name: 'Private Island', price: 50_000_000, imageUrl: 'images/PrivateIsland.jpg' },
        { name: 'Luxury Yacht', price: 20_000_000, imageUrl: 'images/LuxuryYacht.webp' },
        { name: 'Supercar', price: 2_000_000, imageUrl: 'images/Supercar.webp' },
        { name: 'Diamond Watch', price: 100_000, imageUrl: 'images/DimondWatch.webp' },
        { name: 'Mansion', price: 100_000_000, imageUrl: 'images/Mansion.webp' },
        { name: 'Space Shuttle Ride', price: 250_000, imageUrl: 'images/SpaceShuttle.webp' },
        { name: 'McDonald\'s Franchise', price: 2_000_000, imageUrl: 'images/McDonald.webp' },
        { name: 'Starbucks Store', price: 500_000, imageUrl: 'images/Starbucks.webp' },
        { name: 'Vending Machine', price: 3_000, imageUrl: 'images/VendingMachine.webp' },


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

    function openModal(name, price) {
        selectedItemName = name;
        selectedItemPrice = price;

        modalItemName.textContent = name;
        modalItemPrice.textContent = formatMoney(price);
        quantityInput.value = 1;
        updateTotalCost();
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateTotalCost() {
        const quantity = parseInt(quantityInput.value);
        if (quantity < 1 || isNaN(quantity)) {
            quantityInput.value = 1;
        }
        const totalCost = selectedItemPrice * quantityInput.value;
        totalCostDisplay.textContent = formatMoney(totalCost);
    }

    function handleBuyNow() {
        const quantity = parseInt(quantityInput.value);
        const totalCost = selectedItemPrice * quantity;

        if (money >= totalCost) {
            money -= totalCost;
            updateMoneyDisplay();
            addToReceipt(selectedItemName, totalCost, quantity);
            closeModal();
        } else {
            alert("You don't have enough money for that quantity!");
        }
    }

    function addToReceipt(name, totalCost, quantity) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${name} x${quantity}</span><span>$${formatMoney(totalCost)}</span>`;
        receiptList.appendChild(listItem);
    }

    function setupEventListeners() {
        document.querySelectorAll('.buy-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const price = parseInt(e.target.dataset.price);
                const name = e.target.dataset.name;
                openModal(name, price);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        quantityInput.addEventListener('input', updateTotalCost);
        confirmBuyBtn.addEventListener('click', handleBuyNow);
    }

    updateMoneyDisplay();
    renderItems();
});