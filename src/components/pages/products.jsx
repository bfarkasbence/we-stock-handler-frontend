import React, {Component} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

const api = Axios.create({
    baseURL: "https://localhost:5001/api/product"
})

class ProductsPage extends Component {

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

    addOneToProduct = async (id) => {
        let data = await api.put(`/${id}/?Quantity=1`)
        
        this.getProducts();
    }

    subtractOnFromProduct = async (id) => {
        let data = await api.put(`/${id}/?Quantity=-1`)
        
        this.getProducts();
    }


    render(){
        return (
            <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
                <div className="card">
                    <div className="card-header">
                        <h4>Termékek</h4> <a class="btn btn-default" href='/add-product'>+</a>
                    </div>
                    <div className="card-body">                        
                        <table class="table table-striped table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Kód</th>
                                    <th scope="col">Termék neve</th>
                                    <th scope="col">Karton kód</th>
                                    <th scope="col">Eladási ár</th>
                                    <th scope="col">Időszak</th>
                                    <th scope="col">Szükséges készlet</th>
                                    <th scope="col">Készlet</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map(product => <tr key={product.id}>
                                    <td>{product.productCode}</td>
                                    <td>{product.name}</td>
                                    <td>{product.cartonCode}</td>
                                    <td>{product.price} Ft</td>
                                    <td>{product.fromDate}-{product.toDate}</td>
                                    <td>{product.requiredQuatity}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div class="btn-group btn-group-xs" role="group">
                                            <button class="btn btn-default" onClick={() => this.addOneToProduct(product.id)}>
                                                <i class="fa fa-plus"></i>
                                            </button>    
                                            <button class="btn btn-default" onClick={() => this.subtractOnFromProduct(product.id)}>
                                                <i class="fa fa-minus"></i>
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
}

export default ProductsPage;