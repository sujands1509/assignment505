document.addEventListener("DOMContentLoaded", () => {

    // HEART FUNCTIONALITY
    const navHeartCount = document.getElementById("nav-heart-count");
    let totalHearts = 0;

    const cardHearts = document.querySelectorAll(".card-heart");
    cardHearts.forEach(heart => {
        heart.addEventListener("click", () => {
            totalHearts++;
            navHeartCount.innerText = totalHearts;
        });
    });

    // COINS & CALL FUNCTIONALITY
    const coinBalanceEl = document.getElementById("coin-balance");
    let coinBalance = parseInt(coinBalanceEl.textContent);

    const callButtons = document.querySelectorAll(".btn-call");
    const copyButtons = document.querySelectorAll(".btn-copy");

    const historyList = document.getElementById("history-list");
    const clearHistoryBtn = document.getElementById("clear-history-btn");

    const updateCoinDisplay = () => {
        coinBalanceEl.textContent = coinBalance;
    };

    // CALL BUTTONS
    callButtons.forEach(button => {
        button.addEventListener('click', () => {

            if (coinBalance < 20) {
                alert('Insufficient coins! Please add more coins to make a call.');
                return;
            }

            const card = button.closest('.card');
            const serviceName = card.querySelector('h1').textContent;
            const serviceNumber = card.querySelector('.service-number').textContent;

            // Confirm call first
            const confirmCall = confirm(`Calling ${serviceName} at ${serviceNumber}?`);
            if (!confirmCall) return;

            // Deduct coins
            coinBalance -= 20;
            updateCoinDisplay();

            // Add to call history
            const li = document.createElement('li');
            const now = new Date().toLocaleTimeString();
            li.textContent = `${serviceName}: ${serviceNumber} at ${now}`;
            historyList.prepend(li);
        });
    });

    // COPY BUTTONS
    // COPY BUTTONS
const copyCountEl = document.getElementById("copyCount");
let totalCopies = 0;

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const serviceNumber = card.querySelector('.service-number').textContent;

        navigator.clipboard.writeText(serviceNumber)
            .then(() => {
                alert(`Number ${serviceNumber} copied to clipboard!`);
                // increment copy counter
                totalCopies++;
                copyCountEl.textContent = totalCopies;
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    });
});

    // CLEAR HISTORY
    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '';
    });

});
