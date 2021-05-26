import logo from './logo.svg';
import React from 'react'
import './App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './components/weather.component';

const API_KEY='47e74f86fe0f0e884264c800c47df611'


class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
       city:undefined,
       country:undefined,
       icon:undefined,
       main:undefined,
       celsius:undefined,
       temp_max:undefined,
       temp_min:undefined,
       description:"",
       error:false
    }
    this.getWeather()

    this.weathericon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
  
  calCelsius(temp){
    let cell=Math.floor(temp-273.15)
    return cell;
  }

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId>=200&&rangeId<=232:
        this.setState({icon:this.weathericon.Thunderstorm})
        break;
      case rangeId>=300&&rangeId<=321:
        this.setState({icon:this.weathericon.Drizzle})
        break;
      case rangeId>=500&&rangeId<=531:
        this.setState({icon:this.weathericon.Rain})
        break;
      case rangeId>=600&&rangeId<=622:
        this.setState({icon:this.weathericon.Snow})
        break;
      case rangeId>=700&&rangeId<=781:
        this.setState({icon:this.weathericon.Atmosphere})
        break;
      case rangeId===800:
        this.setState({icon:this.weathericon.Clear})
        break; 
      case rangeId>=801&&rangeId<=804:
        this.setState({icon:this.weathericon.Clouds})
        break;   
      default:
        this.setState({icon:this.weathericon.Clouds})
    }
  }

  getWeather=async() =>{
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`)

    const response = await api_call.json();
    console.log(response);

    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description
    })
    this.get_WeatherIcon(this.weathericon,response.weather[0].id)
  }


  render() {
    return (
      <div className="App">
        <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsius} temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} weathericon={this.state.icon}/> 
      </div>

    )
  }
}

export default App

