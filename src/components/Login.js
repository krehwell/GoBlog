import React from "react";
import "./Login.css";
import { auth } from "../firebase.js";
import FormControl from '@material-ui/core/FormControl'
import UiForm from './common/uiForm.js';
import UiButton from './common/uiButton';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      useremail: "",
      hide: {
        login: null,
        logout: null,
        signup: null,
      },
      errormessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.number = 0;
  }

  componentDidMount() {
    document.getElementById('loading').outerHTML = ""
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          useremail: user.email,
          hide: {
            login: false,
            signup: false,
            logout: true,
          },
        });
        window.location.pathname = '/';
      } else {
        console.log("the user not login");
        this.setState({
          useremail: "",
          hide: {
            login: true,
            signup: true,
            logout: false,
          },
        });
      }
    });
  }

  login(e) {
    e.preventDefault();
    this.setState({ errormessage: "Loading..." });
    console.log("hitting the login button");
    let email = this.state.email;
    let password = this.state.password;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ errormessage: "" });
        console.log("the user is loooogeeed in fucker");
      })
      .catch((err) => {
        console.log("Login err: " + err);
        this.setState({ errormessage: err.message });
      });
  }

  signup(e) {
    e.preventDefault();
    this.setState({ errormessage: "Loading..." });
    let email = this.state.email;
    let password = this.state.password;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log("Success SignUp"))
      .catch((err) => {
        console.log("error in signup: " + err);
        this.setState({ errormessage: err.message });
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="login-container">
        <h1>t(·̿Ĺ̯·̿ ̿)</h1>
        <h2>{this.state.useremail}</h2>
        <h4 style={{ color: "red" }}>{this.state.errormessage}</h4>

        <FormControl>
          <UiForm handleChange={this.handleChange} name="email" />
          <UiForm handleChange={this.handleChange} name="password" type="password" />
          <UiButton function={this.login} name="login" />
          <UiButton function={this.signup} name="signup" />
        </FormControl>
      </div>
    );
  }
}

export default LoginPage;
