import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import  api from './api.json';
import './App.css';


export default class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      url: `http://api.openweathermap.org/data/2.5/weather?q=auckland&appid=${api.key}&units=metric`
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public timeConverter(UNIXtimestamp: any){
    const a = new Date(UNIXtimestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hr = a.getHours();
    const m = "0" + a.getMinutes();
    const s = "0" + a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hr + ':' + m.substr(-2) + ':' + s.substr(-2);
    return time;
  }

  public getData(){
    const url = this.state.url;
    fetch(url).then((res) => {
      return res.json();
    }).then((data: any) => {
      this.setState({
        city : data.name,
        conditions: data.weather[0].main,
        country: data.sys.country,
        date: this.timeConverter(data.dt),
        errorMsg:'', 
        humidity: data.main.humidity,
        icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
        pressure: data.main.pressure + " hPA",
        temperature: data.main.temp,
        windAng: data.wind.deg,
        windSpeed: data.wind.speed,         
      });
    }).catch((error) => {
      this.setState({
        errorMsg: 'Please, enter a valid city or country name.'
      });
    });
  }


  public componentDidMount(){
    this.getData();
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api.key}&units=metric`
      }, () => {
        this.getData();
      });
    });
  }

  public handleChange(e: any) {
    this.setState({
      inputValue: e.target.value
    });
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    this.setState({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${api.key}&units=metric`,
    }, () => {
      this.getData();
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
        <div className="container my-5">
          <div className="row card" style={{backgroundColor: '#ffcc99'}}>
            <div className="col-md-6 push-md-3 col-xl-4 push-xl-4 card-body">
              <div className="d-flex justify-content-between">
                <div className="d-inline-block">
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
                  <h2 className="big-font">{this.state.temperature}<span className="units">&deg; C</span></h2>
                </div>
                <div className="col-4 col-md-5">
                  <div className="small-font">
                    <p>Humidity: {this.state.humidity}%</p>
                    <p>Wind: {this.state.windSpeed} mph {this.state.windAng}°</p>
                    <p>Pressure: {this.state.pressure}</p>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className="form-inline mt-4 justify-content-around">
                <input value={this.state.inputValue}
                onChange={this.handleChange}
                className="form-control mb-4 mb-sm-0" type="text" placeholder="City, Country"/>
                <button type="submit" className="btn btn-primary" style={{backgroundColor: '#4d4d4d'}}>Submit</button>
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