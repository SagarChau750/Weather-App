const apikey = `6ebd081aa9d7f4f9b2ca166a52e5af00`;
const weatherData = document.getElementById("weather-data");

const cityInput = document.getElementById("input-data");

const formEl = document.querySelector("form");

formEl.addEventListener("submit" , (event)=>{
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);

});

 async function getWeatherData(cityValue){
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
              }

       
        const data = await response.json();

       console.log("the data:" ,data);

        const temperature = Math.round(data.main.temp);
        const temperatureInCelsius = Math.round(temperature - 273.15);

        
       // console.log(temperature);
        const description = data.weather[0].description;
       // console.log(description);
        const icon = data.weather[0].icon;
       // console.log(icon);
        const details = [
            `Feels like: ${Math.round(temperature - 273.15)} °C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`,
        ];
        details.forEach((detail) => {
            console.log(detail);
        });
        document.getElementsByClassName("icon")[0].innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        document.getElementsByClassName("temperature")[0].innerHTML = temperatureInCelsius +"°C";
        
        document.getElementsByClassName("description")[0].innerHTML = description;
        document.getElementsByClassName("details")[0].innerHTML = details.map(detail => `<div>${detail}</div>`).join("");



    } 
    catch (error) {
        document.querySelector(".icon").innerHTML = ""
        document.querySelector(".temperature").textContent= "";
        document.querySelector(
            ".description").textContent = "Try Again";

            document.querySelector(".details").innerHTML = ""
        
    }
}