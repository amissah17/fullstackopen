import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ nat_data }) => {
  const [weather, setWeather] = useState([])
  const { name: { common }, capital, area, languages, flags: { svg, alt }, latlng} = nat_data;
    
  useEffect(() => {
   
  const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current_weather=true&windspeed_unit=ms&timezone=GMT`
   const fetchWeather = async ()=> {
  await  axios.get(weatherAPI)
     .then(resp => {setWeather([].concat(resp.data))})
     .catch(res => {})
   } 

   if(weather.length < 1) {
    fetchWeather()
   }
      console.log(weather)
  }, [])
  
 

    console.log(weather)

    let lanG = [];
    for (let langs in languages) {
      lanG.push(languages[langs])
    }
    
    return (
      <>
        <h1>{common}</h1>
        <p>Capital {capital}<br />
          Area {area}
        </p>
        <h3>Languages</h3>
        <ul>{lanG.map((language) => <li key={language}>{language}</li>)}</ul>
        <img src={svg} alt={alt} width={120} height={70} />
        <h3>Weather in {capital}</h3>
        {weather.length == 1 ? <div><p>temperature {weather[0].current_weather.temperature} Celsius</p>
        <p>windspeed {weather[0].current_weather.windspeed} m/s</p></div>: ''}
      </>
    )
  

}


export default Country;