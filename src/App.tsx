import * as React from 'react';
import './App.css';
import FirstComponent from './components/FirstComponent';
// import Loader from 'react-loader-spinner';

// const API_KEY = 'c35d1edac34a5659302384defe6a3c6d';

export default class App extends React.Component<{}> {
  public getWeather = async () =>{ 
     // const apiCall = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=${API_KEY}&units=metric'); 
     // const data = await apiCall.json();
  }

  public render() {
    return (
      <div className="container-fluid">
      <div className="centreText">
        {/* React components must have a wrapper node/element */}
        <FirstComponent />

      </div>
    </div>
    );
  }
}