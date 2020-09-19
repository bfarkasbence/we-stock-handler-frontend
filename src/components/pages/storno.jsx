import React, {useState} from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Axios from "axios";


function StornoPage(props) {
    
    const [date, setDate] = useState(new Date());
    const [soldProductsOnDate, setSoldProductsOnDate] = useState([]);
    

    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        setDate(today);
    }, [setDate])

    useEffect(() => {
        Axios.get("https://localhost:5001/api/stockchange").then(response => {setSoldProductsOnDate(response.data)});
    }, [setSoldProductsOnDate])


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
                    <p><button className="btn btn-dark" onClick={() => console.log(soldProductsOnDate)}>Küldés</button></p>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Eladott termékek</h4>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Kód</th>
                                <th scope="col">Termék neve</th>
                                <th scope="col">Eladási ár</th>
                                <th scope="col">Darab</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {soldProductsOnDate.map(soldProduct => <tr key={soldProduct.id}>
                            <td>{soldProduct.productId}</td>
                            <td>{soldProduct.productName}</td>
                            <td>{soldProduct.price}</td>
                            <td>{soldProduct.quantity}</td>
                            <td>
                                <button className="btn btn-dark">
                                    <i className="fa fa-cart-plus"></i>
                                </button>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StornoPage;