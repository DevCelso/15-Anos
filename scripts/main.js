const countdow = document.getElementById("countdown");
const eventDate = new Date("2025-09-06T11:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        countdow.textContent = "É hoje! ✨";
        return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / (1000)) % 60;

    countdow.textContent = `${days} dias, ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

//Carrosel galeria
let cont = 1;
document.getElementById('radio1').checked = true;

setInterval(() => {
    cont++;
    if (cont > 3) cont = 1;
    document.getElementById('radio' + cont).checked = true;
}, 5000);


