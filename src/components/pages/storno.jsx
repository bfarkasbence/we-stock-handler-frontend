import React, {useState} from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Axios from "axios";

function StornoPage(props) {
    
    const [date, setDate] = useState(new Date());
    

    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        setDate(today);
    }, [setDate])


    const dateOnChange = (event) => {
        setDate(event.target.value)
    };


    return(
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "128 rem"}}>
            <div className="card">
                <div className="card-header">
                    <h4>Sztornó</h4>
                </div>
                <div className="card-body">
                    <p>Válassz dátumot:</p>
                    <p><input type="date" onChange={dateOnChange} value={date}/></p>
                    <p><button className="btn btn-dark" onClick={() => console.log(date)}>Küldés</button></p>
                </div>
            </div>
        </div>
    );
}

export default StornoPage;