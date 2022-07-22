import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView from './components/main-view/main-view';


import './index.scss';

//store
const store = createStore(moviesApp, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
devToolsEnhancer());

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);