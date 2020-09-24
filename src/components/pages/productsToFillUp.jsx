import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function ProductsToFillUp() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get("https://localhost:5001/api/product/fillup")
            .then(response => {setProducts(response.data);
            });}, [setProducts])


    const changeQuantity = (item, change) =>
    {
        for (var i=0; i<products.length; i++)
        {
            if (products[i].id === item.id)
            {
                let newProducts = [...products];

                if (newProducts[i].sendQuantity+change < 0)
                {
                    newProducts[i] = {...newProducts[i], sendQuantity: (0)}
                }
                else
                {
                    newProducts[i] = {...newProducts[i], sendQuantity: (newProducts[i].sendQuantity+change)}
                }
                setProducts(newProducts);
                
            }
        }
    }

    const sendProducts = async () =>
    {
        let stringToSendProducts = JSON.stringify(products);
        let url = "https://localhost:5001/api/btbstentproducts"

        fetch(url, { method: 'POST',
            body: stringToSendProducts,
            headers: { 'Content-Type': 'application/json'}})
        .then((response) => {
            console.log(response);
            setProducts([]);
        })
        .catch((e) => console.log(e.message));
    }
    

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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => <tr key={product.id}>
                                <td>{product.productCode}</td>
                                <td>{product.name}</td>
                                <td>{product.cartonCode}</td>
                                <td>{product.requiredQuantity}</td>
                                <td>{product.sendQuantity}</td>
                                <td>
                                    <div className="btn-group btn-group-xs" role="group">
                                        <button className="btn btn-default" onClick={() => changeQuantity(product, 1)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                        <button className="btn btn-default" onClick={() => changeQuantity(product, -1)}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    <button className="btn btn-dark" onClick={() => sendProducts()}>Küldés</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsToFillUp;