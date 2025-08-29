let showSeconds = true;

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const month = now.toLocaleString('default', { month: 'long' });

    document.getElementById("hour").textContent = pad(hours);
    document.getElementById("minute").textContent = pad(now.getMinutes());
    document.getElementById("period").textContent = `"${period}"`;
    document.getElementById("day").textContent = now.getDate();
    document.getElementById("month").textContent = `"${month}"`;
    document.getElementById("year").textContent = now.getFullYear();

    if (showSeconds) {
        document.getElementById("second").textContent = pad(now.getSeconds());
        document.getElementById("secondLine").style.display = "inline";
        const delay = 1000 - now.getMilliseconds();
        setTimeout(updateClock, delay);
    } else {
        document.getElementById("secondLine").style.display = "none";
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        setTimeout(updateClock, delay);
    }
}

function pad(n) {
    return n.toString().padStart(2, '0');
}

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.showseconds) {
            showSeconds = properties.showseconds.value;
            updateClock();
        }
    }
};

updateClock();