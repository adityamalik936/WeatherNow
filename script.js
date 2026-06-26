document.addEventListener("DOMContentLoaded",() =>{
const cityInput  = document.getElementById("city-input");
const  getWeatherBtn = document.getElementById("get-weather-btn");
const  weatherInfo = document.getElementById("weather-info");
const  cityNameDisplay = document.getElementById("city-name");
const  temperatureDisplay = document.getElementById("temperature");
const   descriptionDisplay= document.getElementById("description");
const  errorMessage = document.getElementById("error-message")

let API_KEY = "9afbf300d09b840294e07c1b9089ccb3";

getWeatherBtn.addEventListener('click',async() =>{
  const city = cityInput.value.trim()

  if(!city)return

  // when you connect api then that server sometime show error so to deal with that we use try catch method
// we use AWAIT because it hold javascript until server response came
  try {
    const weatherdata = await fetchWeatherData(city)
    displayWeatherData(weatherdata)
    
  } catch (error) {
    showError()
  }
})

async function fetchWeatherData(city){           /* gets the data*/
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
 const response =  await fetch(url)
 console.log(response)

 if(!response.ok){
  throw new Error("city not found");
 }
 const data = await response.json()
 return data
 
}


function displayWeatherData(data){          /*display*/
console.log(data)
const {name, main, weather} = data
cityNameDisplay.textContent = name
temperatureDisplay.textContent = `Temperature : ${main.temp}`
descriptionDisplay.textContent = `Weather : ${weather[0].description}`
// unlock display

weatherInfo.classList.remove("hidden")
errorMessage.classList.add("hidden")
}


function showError(){
  weatherInfo.classList.remove("hidden")
  errorMessage.classList.add("hidden")
}

})

