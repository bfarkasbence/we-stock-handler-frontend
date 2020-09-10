import React, {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function Login(){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameOnChange = (event) => {
        setUsername(event.target.value)
    };

    const passwordOnchange = (event) => {
        setPassword(event.target.value)
    };

    const login = () => {
        axios.post(`https://localhost:5001/api/login`,
            {
                username: username,
                password: password
            }
        ).then(resp => {
            console.log(resp.data);
            localStorage.setItem("token", resp.data.token);
        }).catch((e) => {
            console.log(e.message)
        })
    };

    return (
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "28rem"}}>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email cím/Felhasználó név</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" onChange={usernameOnChange} value={username}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Jelszó</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                    onChange={passwordOnchange} value={password}/>
                        </div>
                        <button className="btn btn-dark" onClick={login}>Bejelentkezés</button>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    <span>Ha még nem regisztráltál <a href="/registration">kattints ide!</a></span>
                </div>
            </div>
        </div>
    );
}

export default Login;