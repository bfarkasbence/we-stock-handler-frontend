import React, {useState} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from "react";




function ProductsPage() {

    const [products,setProducts] = useState([]);

    useEffect(() => {
        Axios.get("https://localhost:5001/api/product").then(response => {setProducts(response.data)});
    }, [setProducts])
    
    const api = Axios.create({
        baseURL: "https://localhost:5001/api/product"
    })
    
    const stockChangeApi = Axios.create({
        baseURL: "https://localhost:5001/api/stockchange"
    })
    
    const getProducts = async () => {
        let data = await api.get("/").then(({data}) => data);
        setProducts(data);
    }

    const changeStock = async (product, change) => {
        var d = new Date();
        var dateString = d.getFullYear().toString() + "-" +
        (d.getMonth()+1).toString().padStart(2, '0') + "-" +
        d.getDate().toString().padStart(2, '0') + "T" + 
        d.getHours().toString().padStart(2, '0') + ":" +
        d.getMinutes().toString().padStart(2, '0') + ":" +
        d.getSeconds().toString().padStart(2, '0')
        
        try {
            let response = await stockChangeApi.post("/", {
                "DateTime": dateString,
                "ProductId": product.id,
                "Quantity": change,
                "StockChangeType": "btb"  
              })
            console.log(response)
        } catch (error) {
            console.log(error);
        }
        getProducts();    
    }

        return (
            <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
                <div className="card">
                    <div className="card-header">
                        <h4>Termékek</h4>
                        <a className="btn btn-dark" href='/add-product'>+</a>
                    </div>
                    <div className="card-body">                        
                        <table className="table table-striped table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Kód</th>
                                    <th scope="col">Termék neve</th>
                                    <th scope="col">Karton kód</th>
                                    <th scope="col">Eladási ár</th>
                                    <th scope="col">Szükséges készlet</th>
                                    <th scope="col">Készlet</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map(product => <tr key={product.id}>
                                    <td>{product.productCode}</td>
                                    <td>{product.name}</td>
                                    <td>{product.cartonCode}</td>
                                    <td>{product.price} Ft</td>
                                    <td>{product.requiredQuantity}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div className="btn-group btn-group-xs" role="group">
                                            <button className="btn btn-default" onClick={() => changeStock(product, 1)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            <button className="btn btn-default" onClick={() => changeStock(product, -1)}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        </td>
                                </tr>)}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        )
    
}

export default ProductsPage;