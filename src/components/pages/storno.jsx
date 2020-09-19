import React, {useState} from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Axios from "axios";

function StornoPage(props) {


    return(
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "128 rem"}}>
            <div className="card">
                <div className="card-header">
                    <h4>Sztornó</h4>
                </div>
            </div>
        </div>
    );
}

export default StornoPage;