import React, {useState} from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import Axios from "axios";


function StornoPage(props) {
    
    const [date, setDate] = useState(new Date());
    const [soldProductsOnDate, setSoldProductsOnDate] = useState([]);
    const [stornoCart, setStornoCart] = useState([]);
    
    const api = Axios.create({
        baseURL: "https://localhost:5001/api"
    })

    useEffect(() => {
        setDate(new Date());
    }, [setDate])


    const dateOnChange = (event) => {
        var dateString = event.target.value;
        var dateList = dateString.split("-");
        var newDate = new Date(dateList[0], dateList[1], dateList[2]);
        
        setDate(newDate);
    };

    const getSoldProductsOnDate = async () => {
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth()).padStart(2, '0');
            var yyyy = date.getFullYear();

            var today = yyyy + mm + dd;
        
        let data = await api.get("/stockchange/date", {
            params: {
                from: today,
                to: today
            }
        }).then(({data}) => data);
        setSoldProductsOnDate(data);
    }

    const addToCart = (product) => 
    {
        var inTheCart = false;

        const newItem = {productId: product.productId, productName: product.productName, productPrice: product.productPrice, quantity: 1};

        for (var i=0; i<stornoCart.length; i++)
        {
            if (stornoCart[i].productId === product.productId)
            {
                let newCart = [...stornoCart];
                newCart[i] = {...newCart[i], quantity: newCart[i].quantity+1}
                setStornoCart(newCart);

                inTheCart = true;
            }
        }

        if (!inTheCart)
        {
            setStornoCart(stornoCart.concat(newItem));
        }
    }

    return(
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "128 rem"}}>
            <div className="card">
                <div className="card-header">
                    <h4>Eladás dátuma</h4>
                </div>
                <div className="card-body">
                    <p>Válassz dátumot:</p>
                    <p><input type="date" onChange={dateOnChange}/></p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-dark" onClick={() => getSoldProductsOnDate()}>Küldés</button>
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
                        {soldProductsOnDate.map(soldProduct => <tr key={soldProduct.productId}>
                            <td>{soldProduct.productId}</td>
                            <td>{soldProduct.productName}</td>
                            <td>{soldProduct.productPrice} Ft</td>
                            <td>{soldProduct.quantity}</td>
                            <td>
                                <button className="btn btn-dark" onClick={() => addToCart(soldProduct)}>
                                    <i className="fa fa-cart-plus"></i>
                                </button>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Sztornózandó tételek</h4>
                </div>
                <div className="card-body">
                    sztornó tételek listája
                </div>
                <div className="card-footer">
                    <button className="btn btn-dark" onClick={() => console.log(soldProductsOnDate)}>Küldés</button>
                </div>
            </div>
        </div>
    );
}

export default StornoPage;