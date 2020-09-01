import React, {Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

class Login extends Component{
    state = {
        username: "",
        password: "",
    };

    usernameOnChange = (event) => {
        this.setState({username: event.target.value});
    };

    passwordOnchange = (event) => {
        this.setState({password: event.target.value});
    };

    login = () => {
        axios.post(`https://localhost:5001/api/login`,
            {
                username: this.state.username,
                password: this.state.password
            }
        ).then(resp => {
            console.log(resp.data);
            localStorage.setItem("token", resp.data.token);
            this.setState({redirect: true});
        }).catch((e) => {
            console.log(e.message)
        })
    };

    render() {
        return (
            <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "28rem"}}>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email cím/Felhasználó név</label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" onChange={this.usernameOnChange} value={this.state.username}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Jelszó</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <button className="btn btn-dark" onClick={this.login}>Bejelentkezés</button>
                        </form>
                    </div>
                    <div className="card-footer text-muted">
                        <span>Ha még nem regisztráltál <a href="/registration">kattints ide!</a></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;