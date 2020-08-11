import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent';
import './App.css';
import { Provider } from 'react-redux';
import {AppStore} from './redux/AppStore';

const store = AppStore();

class App extends Component{

	render(){

		return (
			<Provider store={store}>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</Provider>
			
		);
	}
}

export default App;
