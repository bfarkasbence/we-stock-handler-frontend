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
        products: []
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
        console.log(product.id);
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
                                <table class="table table-striped table-bordered table-hover">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Kód</th>
                                            <th scope="col">Termék neve</th>
                                            <th scope="col">Eladási ár</th>
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
                                                <div class="btn-group btn-group-xs" role="group">
                                                    <button class="btn btn-default" onClick={() => this.addToCart(product)}>
                                                        <i class="fa fa-plus"></i>
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
                            <div className="card-boday">


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartPage;