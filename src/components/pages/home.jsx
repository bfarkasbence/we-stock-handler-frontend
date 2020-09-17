import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Axios from "axios";

function HomePage(props) {

    const [attendance, setAttendance] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);
    

    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + mm + dd;
        
        Axios.get("https://localhost:5001/api/attendance/date", {params: {
            from: today,
            to: today
        }}).then(response => {setAttendance(response.data)});

    }, [setAttendance])

    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + mm + dd;
        
        Axios.get("https://localhost:5001/api/stockchange/date", {params: {
            from: today,
            to: today
        }}).then(response => {setSoldProducts(response.data)})
    }, [setSoldProducts])

    return(
    <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "128 rem"}}>
        <div className="card">
            <div className="card-header">
                <h4>Jelenlét</h4>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-hover">
                    <tbody>
                        {attendance.map(consultant => <tr key={consultant.id}>
                            <td>{consultant.consultantId}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <h4>Napi egyenleg</h4>
            </div>
            <div className="card-body">
                Eladás: xxxxx Ft
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <h4>Napi fogyás</h4>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Termék neve</th>
                            <th scope="col">Darabszám</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soldProducts.map(product => <tr key={product.id}>
                            <td>{product.productId}</td>
                            <td>{product.quantity}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}
export default HomePage;