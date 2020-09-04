import React from 'react';
import Blog from './components/Blog.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from './components/Login.js';
import ErrorPage from './components/errorpage.js';
import {auth} from './firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      route: "/",
      uid: null,
      email: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("you logged in");
        this.setState({ page: this.getBlog, route: "/", uid: user.uid, email: user.email });
      } else {
        console.log("you dumb not login!!!");
        this.setState({ page: this.getLoginPage, route: "/login" });
        if (window.location.pathname !== "/login") {
          window.location.pathname = "/login";
        }
      }
    });
  }

  signout() {
    auth.signOut().then(() => {
      console.log("the user is signed out");
    });
  }

  getBlog = () => {
    return <Blog uid={this.state.uid} email={this.state.email} />;
  };

  getLoginPage = () => {
    return <LoginPage />;
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={this.state.route} component={this.state.page} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

