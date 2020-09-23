import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function ProductsToFillUp() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get("https://localhost:5001/api/product/fillup")
            .then(response => {setProducts(response.data);
            });}, [setProducts])


    return (
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
            <div className="card">
                <div className="card-header">
                    <h4>Kiszállítandó tételek</h4>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Kód</th>
                                <th scope="col">Termék neve</th>
                                <th scope="col">Karton kód</th>
                                <th scope="col">Szükséges mennyiség</th>
                                <th scope="col">Kiküldendő mennyiség</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => <tr key={product.id}>
                                <td>{product.productCode}</td>
                                <td>{product.name}</td>
                                <td>{product.cartonCode}</td>
                                <td>{product.requiredQuantity}</td>
                                <td>{product.sendQuantity}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductsToFillUp;