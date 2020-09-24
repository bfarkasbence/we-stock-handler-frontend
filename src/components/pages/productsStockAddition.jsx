import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function ProductsStockAdditionPage() {

    const [recievedProducts, setRecievedProducts] = useState([]);

    useEffect(() => {
        Axios.get("https://localhost:5001/api/btbsentproducts/sent")
        .then(response => {setRecievedProducts(response.data); console.log(response.data)});
        
    }, [setRecievedProducts])

    const changeQuantity = (item, change) => 
    {
        for (var i=0; i<recievedProducts.length; i++)
        {
            if (recievedProducts[i].productId === item.productId)
            {
                let newRecievedProducts = [...recievedProducts];

                if (newRecievedProducts[i].recievedQuantity+change < 0)
                {
                    newRecievedProducts[i] = {...newRecievedProducts[i], recievedQuantity: (0)}
                }
                else
                {
                    newRecievedProducts[i] = {...newRecievedProducts[i], recievedQuantity: (newRecievedProducts[i].recievedQuantity+change)}
                }
                setRecievedProducts(newRecievedProducts);
                
            }
        }
    }

    return (
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
            <div className="card">
                <div className="card-header">
                    <h4>Áruátvétel</h4>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Kód</th>
                                <th scope="col">Termék neve</th>
                                <th scope="col">Kiküldött mennyiség</th>
                                <th scope="col">Átvett mennyiség</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {recievedProducts.map(product =>
                            <tr key={product.productId}>
                                <td>{product.productCode}</td>
                                <td>{product.productName}</td>
                                <td>{product.sentQuantity}</td>
                                <td>{product.recievedQuantity}</td>
                                <td>
                                    <div className="btn-group btn-group-xs">
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
                    <button className="btn btn-dark">Mentés</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsStockAdditionPage;