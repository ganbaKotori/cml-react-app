import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import firebase from "./firebase"

import { BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Teams from './components/Teams';
import Standings from './components/Standings';
//import Standings from './components/Standings/StandingsPanel';
import Quiz from "../src/components/Quiz"
import Spinner from "./Spinner"

import { createStore} from "redux";
import { Provider, connect} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './reducers';

import {setUser, setUserStats, clearUser} from "./actions"

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {

    state = {
        channels: null,
        channelRef: firebase.database().ref('users'),
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log(this.state.channels)
                this.addListeners(user);
                
                this.props.history.push("/");
            } else {
                this.props.history.push("/login");
                this.props.clearUser();
            }
        })

    }

    addListeners = user => {
        let loadedChannels;
        this.state.channelRef.child(user.uid).on('value', snap=>{
            loadedChannels = snap.val()
            console.log(loadedChannels);
            this.setState({channels: loadedChannels})
            //user.push(loadedChannels)
            var userObject = {
                first: user,
                second: loadedChannels
            }
            this.props.setUser(userObject);
            //this.props.setUserStats(loadedChannels)
        })
    }
    render(){
        return this.props.isLoading ? <Spinner /> : (
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/quiz" component={Quiz}/>
                    <Route path="/teams" component={Teams}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/standings" component={Standings}/>
                </Switch>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading

})

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser , clearUser, setUserStats})(Root));


ReactDOM.render(
    <Provider store={store}>
    <Router><RootWithAuth /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
