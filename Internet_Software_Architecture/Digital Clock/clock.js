const currentTime = () => {
    const el = document.querySelector("h1"); // fixed typo in querySelector method

    let date = new Date(); // fixed typo in Date constructor

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = hh < 10 ? `0${hh}` : hh; // fixed typo in template literal syntax
    mm = mm < 10 ? `0${mm}` : mm; // fixed typo in template literal syntax
    ss = ss < 10 ? `0${ss}` : ss; // fixed typo in template literal syntax

    let time = `${hh}:${mm}:${ss}`; // fixed template literal syntax

    el.innerText = time;
};

currentTime();
setInterval(currentTime, 1000);
