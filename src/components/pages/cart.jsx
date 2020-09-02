import React, {Component} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

const api = Axios.create({
    baseURL: "https://localhost:5001/api/product"
})

const stockChangeApi = Axios.create({
    baseURL: "https://localhost:5001/api/stockchange"
})

class CartPage extends Component {

    state = {
        products: [],
        cart: [],
        sumPrice: 0,
        
    }
    
    constructor() {
        super();
        this.getProducts();
        
    }

    getProducts = async () => {
        let data = await api.get("/").then(({data}) => data);
        this.setState({products: data})        
    }

    addToCart(product)
    {
        var inTheCart = false;

        const newItem = {productId: product.id, productName: product.name, productPrice: product.price, quantity: 1};
        this.setState({sumPrice: this.state.sumPrice + product.price});
    
        for (var i=0; i<this.state.cart.length; i++)
        {
            if (this.state.cart[i].productId === product.id)
            {
                let newCart = [...this.state.cart];
                newCart[i] = {...newCart[i], quantity: newCart[i].quantity+1}
                this.setState({cart: newCart});
                
                inTheCart = true;
            }
        }

        if (!inTheCart)
        {
            this.setState({ cart: this.state.cart.concat(newItem)});
        }
        
    }

    changeCartQuantity(item, change)
    {   
        for (var i=0; i<this.state.cart.length; i++)
        {
            if (this.state.cart[i].productId === item.productId)
            {
                let newCart = [...this.state.cart];
                newCart[i] = {...newCart[i], quantity: (newCart[i].quantity+change)}
                this.setState({cart: newCart});
                this.setState({sumPrice: this.state.sumPrice + (change * item.productPrice)});
            }
        }

        this.setState({sumPrice: this.state.sumPrice + (change * item.productPrice)});
    }

    render(){
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
                                    {this.state.products.map(product => <tr key={product.id}>
                                            <td>{product.productCode}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price} Ft</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <div className="btn-group btn-group-xs" role="group">
                                                    <button className="btn btn-default" onClick={() => this.addToCart(product)}>
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
                                        {this.state.cart.map(item => 
                                        <tr key={item.productId}>
                                            <td>{item.productName}</td>
                                            <td>{item.productPrice} Ft</td>
                                            <td>{item.quantity}</td>
                                            <td><div className="btn-group btn-group-xs" role="group">
                                            <button className="btn btn-default" onClick={() => this.changeCartQuantity(item, 1)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            <button className="btn btn-default" onClick={() => this.changeCartQuantity(item, -1)}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div></td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                Összesen {this.state.sumPrice} Ft
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartPage;