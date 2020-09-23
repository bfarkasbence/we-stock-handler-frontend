import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function ProductsToFillUp() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get("https://localhost:5001/api/products/fillup")
            .then(response => {setProducts(response.data);
            console.log(response.data)});

    }, [setProducts])


    return (
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
            <div className="card">
                <div className="card-header">
                    <h4>Kiszállítandó tételek</h4>
                </div>
                <div className="card-body">
                    <p>itt a listájuk</p>
                </div>
            </div>
        </div>
    )
}

export default ProductsToFillUp;