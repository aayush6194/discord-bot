const fetch = require('node-fetch');
const getWeatherData = async ({ latitude, longitude}) => {
    let apiKey = "07e7d6fd136768e058e6652e0a1bfc17";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&us&appid=${apiKey}&units=imperial`;

   const temp = await fetch(url).then((response) => response.json()).then((response) => {
        if (response) {
            let { temp } = response.main || 0;
            let { temp_max } = response.main || 0;
            let { temp_min } = response.main || 0;
            let { speed } = response.wind || 0;
            let { name } = response;

            const temps = {
                temp: Math.ceil(temp),
                temp_max: Math.ceil(temp_max),
                temp_min: Math.floor(temp_min),
                speed: Math.ceil(speed),
                icon: response.weather.length > 0? response.weather[0].icon : "",
                description: response.weather.length > 0? response.weather[0].description : "",
                name,
            }
            return(temps)
        }
    }).catch(e => console.log( e));
    return temp;
}

module.exports = getWeatherData