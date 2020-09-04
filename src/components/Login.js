import React from "react";
import "./Login.css";
import { auth } from "../firebase.js";

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
  }

  componentDidMount() {
    document.getElementById('loading').outerHTML =""
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
    this.setState({errormessage: "Loading..."});
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
    this.setState({errormessage: "Loading..."});
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


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="login-container">
        <h1>Welcome</h1>
        <h2>{this.state.useremail}</h2>
        <h4>{this.state.errormessage}</h4>
        <form>
          <label htmlFor="email">Email</label> <br />
          <input name="email" onChange={this.handleChange} value={this.state.email} className="email-form" type="email" required />
          <br />
          <label htmlFor="password">Password</label> <br />
          <input name="password" onChange={this.handleChange} value={this.state.password} className="password-form" type="password" min="6" required /> <br />
          <div className="button-wrapper">
            {this.state.hide.login && ( <button type="submit" onClick={this.login}>Login</button>)}
            {this.state.hide.signup && ( <button type="submit" onClick={this.signup}>Sign Up</button>)} 
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
