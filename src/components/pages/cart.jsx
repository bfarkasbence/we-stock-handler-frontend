import React from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import { useState } from "react";
import { useEffect } from "react";


function CartPage() {

    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [sumPrice,setSumPrice] = useState(0);
    
    useEffect(() => {
        Axios.get("https://localhost:5001/api/product").then(response => {setProducts(response.data)});
    }, [setProducts])

    const api = Axios.create({
        baseURL: "https://localhost:5001/api/product"
    })
    

    const getProducts = async () => {
        let data = await api.get("/").then(({data}) => data);
        setProducts(data);       
    }

    const addToCart = (product) =>
    {
        var inTheCart = false;

        const newItem = {productId: product.id, productName: product.name, productPrice: product.price, quantity: 1};

        setSumPrice(sumPrice + product.price);
    
        for (var i=0; i<cart.length; i++)
        {
            if (cart[i].productId === product.id)
            {
                let newCart = [...cart];
                newCart[i] = {...newCart[i], quantity: newCart[i].quantity+1}
                setCart(newCart);
                
                inTheCart = true;
            }
        }

        if (!inTheCart)
        {
            setCart(cart.concat(newItem));
        }
        
    }

    const changeCartQuantity = (item, change) =>
    {   
        for (var i=0; i<cart.length; i++)
        {
            if (cart[i].productId === item.productId)
            {
                let newCart = [...cart];

                if (newCart[i].quantity+change === 0)
                {
                    newCart.splice(i, 1);
                }
                else
                {
                    newCart[i] = {...newCart[i], quantity: (newCart[i].quantity+change)}
                }
                setCart(newCart);
                setSumPrice(sumPrice+(change*item.productPrice));
                
            }
        }

        setSumPrice(sumPrice+(change*item.productPrice));
    }


   const buyCart = async () =>  
    {
        let cartString = JSON.stringify(cart);
        let url = "https://localhost:5001/api/stockchange/cart"

        fetch(url, { method: 'POST',
            body: cartString,
            headers:{ 'Content-Type': 'application/json' } })
        .then((response) => {
            console.log(response);
            
            setCart([]);
            setSumPrice(0);
            getProducts();

        })
        .catch((e) =>{console.log(e.message);
        })
    }

    
    return (
        <div className="container"style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
            <div className="row">
                <div className="col-sm">
                    <div className="card">
                        <div className="card-header">
                            <h4>Termékek</h4>
                        </div>
                        <div className="card-body">                        
                            <table className="table table-striped table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Kód</th>
                                        <th scope="col">Termék neve</th>
                                        <th scope="col">Ár</th>
                                        <th scope="col">Készlet</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products.map(product => <tr key={product.id}>
                                        <td>{product.productCode}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} Ft</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <div className="btn-group btn-group-xs" role="group">
                                                <button className="btn btn-default" onClick={() => addToCart(product)}>
                                                    <i className="fa fa-cart-plus"></i>
                                                </button>
                                            </div>
                                    </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="card">
                        <div className="card-header">
                            <h4>Kosár</h4>
                        </div>
                        <div className="card-body">
                        
                            <table className="table table-borderless table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Termék neve</th>
                                        <th scope="col">Ár</th>
                                        <th scope="col">Db</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => 
                                    <tr key={item.productId}>
                                        <td>{item.productName}</td>
                                        <td>{item.productPrice} Ft</td>
                                        <td>{item.quantity}</td>
                                        <td><div className="btn-group btn-group-xs" role="group">
                                        <button className="btn btn-default" onClick={() => changeCartQuantity(item, 1)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                        <button className="btn btn-default" onClick={() => changeCartQuantity(item, -1)}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div></td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            Összesen {sumPrice} Ft
                            <button className="btn btn-dark" onClick={() => buyCart()}>Elküld</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CartPage;