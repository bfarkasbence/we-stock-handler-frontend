import React, {useState} from "react";
import axios from "axios";

function Registration() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const usernameOnChange = (event) => {
        setUsername(event.target.value)
    };

    const passwordOnChange = (event) => {
        setPassword(event.target.value)
    };

    const emailOnChange = (event) => {
        setEmail(event.target.value)
    };

    const registration = async () => {

        try{
            let response = await axios.post("https://localhost:5001/api/account", {
                username : username,
                password: password,
                email: email
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        
    };


    return(
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "28rem"}}>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email cím</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" onChange={emailOnChange} value={email}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Felhasználónév</label>
                            <input type="text" className="form-control" id="exampleInputUsername" onChange={usernameOnChange} value={username}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Jelszó</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={passwordOnChange} value={password}/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Elolvastam a <a href="/#">használati feltételeket</a>!</label>
                        </div>
                        <button type="button" className="btn btn-dark" onClick={registration}>Regisztráció</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Registration;