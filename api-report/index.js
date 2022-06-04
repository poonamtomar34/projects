let weather = (function () {

    // I don't like writing document.querySelector again & again
    let $ = selector => document.querySelector(selector);
    const searchbox = $(`.search-box`);

    // later we'll manipulate these values
    const api = {
        key: "e9fca73f1be298d87e28473e7c015d77",
        base: "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/"
    }

    async function getWeather (query) {
        try {
            const result = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            const data = await result.json();

            return displayResults(data);
        }catch (error) {
            console.log(error);
            $(`.alert`).textContent = `🛑 Couldn't find "${searchbox.value}"`;
        }
    };

    function displayResults(weather) {
        //console.log(weather);

        $(`.city`).textContent = `${weather.name}, ${weather.sys.country}`;

        $(`.date`).textContent = datetime();

        $(`.temp`).innerHTML = `${parseInt(weather.main.temp)}<span>°c</span>`;

        $(`.weather`).textContent = weather.weather[0].main; 

        $(`.hi-low`).textContent = `${parseInt(weather.main.temp_min)}°c / ${parseInt(weather.main.temp_max)}°c`;
    };

    function datetime () {
        let now, year, months, days, date;
        now = new Date();
        year = now.getFullYear();
        date = now.getDate();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();

        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        day = now.getDay();
            
        return `${days[day]} ${date} ${months[month]} ${year}`;
    };

    const event = function () {
        searchbox.addEventListener('keypress', setQuery);
    };
    
    function setQuery(evt) {
        if (evt.keyCode == 13 || event.which === 13) {
            getWeather(searchbox.value);
        
            // alert is blank after the event
            $(`.alert`).textContent = ``;
        }
    }

    return {
        init: function () {
            console.log('App started...');

            // focus on the search box
            searchbox.focus();

            //  fire the eventListener
            event();
        }
    };

}) ();

weather.init();