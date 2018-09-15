import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment';
import * as React from 'react';
import api from './api.json';
import './App.css';


export default class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      url: `https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=${api.key}&units=metric`
    }
    this.getWeather = this.getWeather.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }


  public getWeather(){
    const url = this.state.url;
    fetch(url).then((res) => {
      return res.json();
    }).then((data: any) => {
      this.setState({
        city : data.name,
        conditions: data.weather[0].main,
        country: data.sys.country,
        date: moment.unix(data.dt).format('dddd, MMMM Do, YYYY h:mm:ss A'),
        errorMsg:'', 
        humidity: data.main.humidity,
        icon: "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
        pressure: data.main.pressure + " hPA",
        temperature: data.main.temp,
        windAng: data.wind.deg,
        windSpeed: (data.wind.speed * 3.6).toFixed(1),         
      });
    }).catch((error) => {
      this.setState({
        errorMsg: 'Please, enter a valid city or country name.'
      });
    });
  }


  public componentDidMount(){
    this.getWeather();
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api.key}&units=metric`
      }, () => {
        this.getWeather();
      });
    });
  }

  public changeHandler(e: any) {
    this.setState({
      inputValue: e.target.value
    });
  }

  public submitHandler(e: any) {
    e.preventDefault();
    this.setState({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${api.key}&units=metric`,
    }, () => {
      this.getWeather();
    });
  }
  
  public render(): React.ReactElement<{}> {

    return (
      <div className="App">
        <AppBar position="static" style={{backgroundColor: '#4d4d4d'}}>
          <Toolbar>
              <IconButton  aria-label="Menu" color="inherit" style={{color: '#ff9933'}}>
                  <MenuIcon aria-haspopup="true"/>
              </IconButton>
              <Typography variant="display2" color="inherit">
                  <h1 style={{fontSize: '75%', paddingLeft: '40px', color: '#ff9933'}}>WeatherApp</h1>
              </Typography>
          </Toolbar>
        </AppBar>
        <p style={{paddingTop: '40px'}}>Please note: The time zone is NZST based and does not represent the current time, instead it represents the time that the data was last updated, the time is calculated by converting a UNIX value from the JSON file that was provided by the API</p>
        <p>Also, some cities share the same name across different countries so make sure to be specific, e.g. Perth, AU and Perth, GB</p>
        <div className="container my-5">
          <div className="row card" style={{backgroundColor: '#4d4d4d'}}>
            <div className="col-md-6 push-md-3 col-xl-4 push-xl-4 card-body">
              <div className="d-flex justify-content-between">
                <div className="d-inline-block" style={{color: '#ff9933'}}>
                  <h3>{this.state.city}, {this.state.country}</h3>
                  <p>{this.state.date}</p>
                  <p>{this.state.conditions}</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4 col-md-3">
                  <img className="img-fluid"
                  src= {this.state.icon}/>
                </div>
                <div className="col-4 col-md-4">
                  <h2 className="big-font" style={{color: '#ff9933'}}>{this.state.temperature}<span className="units" >&deg; C</span></h2>
                </div>
                <div className="col-4 col-md-5">
                  <div className="small-font" style={{color: '#ff9933'}}>
                    <p>Humidity: {this.state.humidity}%</p>
                    <p>Wind: {this.state.windSpeed} kph {this.state.windAng}°</p>
                    <p>Pressure: {this.state.pressure}</p>
                  </div>
                </div>
              </div>
              <form onSubmit={this.submitHandler} className="form-inline mt-4 justify-content-around">
                <input value={this.state.inputValue}
                onChange={this.changeHandler}
                className="form-control mb-4 mb-sm-0" type="text" placeholder="City, Country"/>
                <button type="submit" className="btn btn-primary" style={{color: 'White', font: 'Helvetica'}}>Submit</button>
              </form>
              <p className="text-danger text-center mt-2">{this.state.errorMsg}</p>
            </div>
          </div>
        </div>
        <p>Powered by OpenWeatherMap API ©</p>
      </div>
    );
  }
}