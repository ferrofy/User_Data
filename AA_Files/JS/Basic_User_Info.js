let startTime;
let timerInterval;

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimeSpent, 1000);
}

function updateTimeSpent() {
    const currentTime = new Date().getTime();
    const timeSpent = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('timeSpent').innerText = `Time Invested - ${timeSpent} sec`;
}

function stopTimer() {
    clearInterval(timerInterval);
    sessionStorage.removeItem('startTime');
}

window.onload = function() {
    if (sessionStorage.getItem('startTime')) {
        startTime = parseInt(sessionStorage.getItem('startTime'));
    } else {
        startTime = new Date().getTime();
        sessionStorage.setItem('startTime', startTime);
    }
    startTimer();
    getIpAddress();
    getUserInfo();
}

window.onbeforeunload = function() {
    stopTimer();
}

function getIpAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipAddress').innerText = `IP Address: ${data.ip}`;
        })
        .catch(error => {
            document.getElementById('ipAddress').innerText = 'IP Address: Unavailable';
        });
}

function getUserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Unavailable";
    if (userAgent.includes("Chrome")) {
        browserName = "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browserName = "Safari";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        browserName = "Internet Explorer";
    } else if (userAgent.includes("Edg")) {
        browserName = "Microsoft Edge";
    }

    const osArray = [
        { name: "Windows", regex: /Win/ },
        { name: "MacOS", regex: /Mac/ },
        { name: "Linux", regex: /Linux/ },
        { name: "Android", regex: /Android/ },
        { name: "iOS", regex: /iPhone|iPad/ }
    ];

    let osName = "Unavailable";
    for (let os of osArray) {
        if (os.regex.test(navigator.userAgent)) {
            osName = os.name;
            break;
        }
    }

    document.getElementById('browserInfo').innerText = `Browser Info: ${browserName}`;
    document.getElementById('osInfo').innerText = `OS Info: ${osName}`;
}
