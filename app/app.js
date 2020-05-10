//Weather UI Elements
const locationW = document.querySelector('#w-location')
const description = document.querySelector('#w-desc')
const wstring = document.querySelector('#w-string')
const icon = document.querySelector('#w-icon')

const humidity = document.querySelector('#w-humidity')
const pressure = document.querySelector('#w-pressure')
const feelsLike = document.querySelector('#w-feels-like')
const wind = document.querySelector('#w-wind')

//HTML Elements
const saveBtn = document.querySelector('#w-change-btn')
const flags = document.querySelectorAll('.flags img')
const settingsBtn = document.querySelector('#settings')
const closeBtn = document.querySelector('#close')


//Default Setting
getWeatherDefault()

//New Location
saveBtn.addEventListener('click', saveSettings)
flags.forEach(img => {
    img.addEventListener('click', setLang)
});





function saveSettings(){
    const lang = document.querySelector('.active').id
    const inputCity = document.querySelector('#city')
    console.log(inputCity)
    if(inputCity.value === ''){
        switch(lang){
            case 'en':
                inputCity.value = `Please add a location!`
                break
            case 'hu':
                inputCity.value = `Kerem adjon meg egy helyet!`
                break
            case 'de':
                inputCity.value = `Bitte geben Sie einen Ort ein!`
                break 
        }          
        inputCity.style.background = 'red'
        inputCity.style.color = 'white'
        inputCity.style.fontWeight = 'bold'
        setTimeout(function(){
            inputCity.value=""
            inputCity.style.background = 'white'
            inputCity.style.color = 'black'
            inputCity.style.fontWeight = 'normal'
        }, 2000)
    }else{
    getNewWeather()
    }
}




function setLang(){
    
    console.log(event.target)
    document.querySelector('.active').className = "none"
    event.target.className = "active"
    const lang = document.querySelector('.active').id
    switch(lang){
        case 'en':
        saveBtn.textContent = "Save changes"
        settingsBtn.textContent = "-->Change Settings"
        closeBtn.textContent = "Close"
        break
        case 'hu':
        saveBtn.textContent = "Mentes"
        settingsBtn.textContent = "-->Beallitasok"
        closeBtn.textContent = "Bezaras"
        break
        case 'de':
        saveBtn.textContent = "Speichern"
        settingsBtn.textContent = "-->Einstellungen"
        closeBtn.textContent = "Schliesen"
        break
    }
    

}

async function getNewWeather(){
    
    const inputCity = document.querySelector('#city')
    const lang = document.querySelector('.active').id
    const city = document.querySelector('#city').value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d427ae79bf8f5a26954295a12ca5c14&lang=${lang}`
    
    const response = await fetch(url)
    if(response.status !== 200){
        switch(lang){
            case 'en':
                inputCity.value = `Please add an existing location!`
                break
            case 'hu':
                inputCity.value = `Kerem adjon meg egy letezo helyet!`
                break
            case 'de':
                inputCity.value = `Bitte geben Sie einen existierenden Ort ein!`
                break 
        }          
        inputCity.style.background = 'red'
        inputCity.style.color = 'white'
        inputCity.style.fontWeight = 'bold'
        setTimeout(function(){
            inputCity.value=""
            inputCity.style.background = 'white'
            inputCity.style.color = 'black'
            inputCity.style.fontWeight = 'normal'
        }, 2000)

    }else{
        const responseData = await response.json()
    
        console.log(responseData)
            const wTemp = responseData.main
            //console.log(obj)
            //console.log(obj[3])

            locationW.innerHTML = `${responseData.name}, ${responseData.sys.country}`
            description.innerHTML = responseData.weather[0].description
            wstring.innerHTML = `${Math.floor(wTemp.temp - 273.15)} ℃ , ${Math.floor(wTemp.temp * 9 / 5 - 459.67)} °F`
            icon.src = `https://openweathermap.org/img/wn/${responseData.weather[0].icon}.png`
            switch(lang){
                case 'en':
                    humidity.innerHTML = `Relative Humidity: ${wTemp.humidity}% `
                    pressure.innerHTML = `Pressure: ${wTemp.pressure} hpa`
                    feelsLike.innerHTML = `Feels Like: ${Math.floor(wTemp.feels_like - 273.15)} ℃`
                    wind.innerHTML = ` Wind Speed: ${Math.floor(responseData.main.speed * 3.6)} km/h`
                    break
                case 'hu':
                    humidity.innerHTML = `Paratartalom: ${wTemp.humidity}% `
                    pressure.innerHTML = `Nyomas: ${wTemp.pressure} hpa`
                    feelsLike.innerHTML = `Valos Erzet: ${Math.floor(wTemp.feels_like - 273.15)} ℃`
                    wind.innerHTML = ` Szel Sebesseg: ${Math.floor(responseData.main.speed * 3.6)} km/h` 
                    break
                case 'de':
                    humidity.innerHTML = `Luftfeuchtigkeit: ${wTemp.humidity}% `
                    pressure.innerHTML = `Druck: ${wTemp.pressure} hpa`
                    feelsLike.innerHTML = `Wirkliches Gefühl: ${Math.floor(wTemp.feels_like - 273.15)} ℃`
                    wind.innerHTML = `Wind Geschwindigkeit: ${Math.floor(responseData.main.speed * 3.6)} km/h`  
                    break  
            }
        
    }  
 }


function getWeatherDefault () {
    
    const lang = document.querySelector('.active').id
    const city = "Vienna"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d427ae79bf8f5a26954295a12ca5c14&lang=${lang}`
    //console.log(url)
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        const obj = Object.values(data)
        const wTemp = obj[3]
        //console.log(obj)
        //console.log(obj[3])

        locationW.innerHTML = `${obj[11]}, ${obj[8].country}`
        description.innerHTML = obj[1][0].description
        wstring.innerHTML = `${Math.floor(wTemp.temp - 273.15)} ℃ , ${Math.floor(wTemp.temp * 9 / 5 - 459.67)} °F`
        icon.src = `https://openweathermap.org/img/wn/${obj[1][0].icon}.png`
        humidity.innerHTML = `Relative Humidity: ${wTemp.humidity}% `
        pressure.innerHTML = `Pressure: ${wTemp.pressure} hpa`
        feelsLike.innerHTML = `Feels Like: ${Math.floor(wTemp.feels_like - 273.15)} ℃`
        wind.innerHTML = ` Wind Speed: ${Math.floor(obj[5].speed * 3.6)} km/h`

    })
}

document.querySelector('#city').addEventListener('keyup', async function() {
    const city = document.querySelector('#city').value
    console.log(city)
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d427ae79bf8f5a26954295a12ca5c14`
    
    const response = await fetch(url)
    if(response.status === 200){
        saveBtn.setAttribute('data-dismiss', 'modal')
    } else if( city === '' || response.status !== 200){
        saveBtn.setAttribute('data-dismiss', 'none')
    }
})
