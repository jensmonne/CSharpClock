let clockTimer = null;
let showSeconds = true;
let use24Hour = true;
let showPeriod = true;

const elements = {
    hour: document.getElementById("hour"),
    minute: document.getElementById("minute"),
    second: document.getElementById("second"),
    secondLine: document.getElementById("secondLine"),
    period: document.getElementById("period"),
    periodLine: document.getElementById("periodLine"),
    day: document.getElementById("day"),
    month: document.getElementById("month"),
    year: document.getElementById("year"),
}

function safeSet(element, value) {
    if (element.textContent !== value) {
        element.textContent = value;
    }
}

function pad(n) {
    return n.toString().padStart(2, '0');
}

function updateClock() {
    const now = new Date();
    const rawHours = now.getHours();
    const hours = use24Hour ? rawHours : (rawHours % 12 || 12);
    const month = now.toLocaleString('default', { month: 'long' });

    safeSet(elements.hour, pad(hours));
    safeSet(elements.minute, pad(now.getMinutes()));
    safeSet(elements.day, now.getDate());
    safeSet(elements.month, month);
    safeSet(elements.year, now.getFullYear());

    if (showPeriod) {
        safeSet(elements.period, rawHours >= 12 ? "PM" : "AM");
        elements.periodLine.style.display = "inline";
    } else {
        elements.periodLine.style.display = "none";
    }

    let delay;
    if (showSeconds) {
        elements.second.textContent = pad(now.getSeconds());
        elements.secondLine.style.display = "inline";
        delay = 1000 - now.getMilliseconds();
    } else {
        elements.secondLine.style.display = "none";
        delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    }

    clearTimeout(clockTimer);
    clockTimer = setTimeout(updateClock, delay);
}

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.showseconds) showSeconds = properties.showseconds.value;
        if (properties.use24hour) use24Hour = properties.use24hour.value;
        if (properties.showperiod) showPeriod = properties.showperiod.value;
        updateClock();
    }
};

updateClock();