import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
import FormComponent from './components/FormComponent';
import { Header } from './components/Header';
import WeatherComponent from './components/WeatherComponent';
import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/FormComponent" component={FormComponent} />
                    <Route path="/WeatherComponent" component={WeatherComponent} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}