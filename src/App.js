import React from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Chat from './Components/Chat';
import Character from './Components/Character'
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./Components/PrivateRoute"
import CharacterList from './Components/CharacterList';
import ChatRoomList from './Components/ChatRoomList';


class App extends React.Component{ 
  
  render(){
    return (
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={CharacterList} />
              <Route path="/character" component={Character} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/chat" component={Chat}/>
              <Route path ="/chat_list" component={ChatRoomList}/>
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
