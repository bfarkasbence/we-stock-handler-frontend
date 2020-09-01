import React, {Component} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

const api = Axios.create({
    baseURL: "https://localhost:5001/api/product"
})

const stockChangeApi = Axios.create({
    baseURL: "https://localhost:5001/api/stockchange"
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

    changeStock = async (product, change) => {
        var d = new Date();
        var dateString = d.getFullYear().toString() + "-" +
        (d.getMonth()+1).toString().padStart(2, '0') + "-" +
        d.getDate().toString().padStart(2, '0') + "T" + 
        d.getHours().toString().padStart(2, '0') + ":" +
        d.getMinutes().toString().padStart(2, '0') + ":" +
        d.getSeconds().toString().padStart(2, '0')
        let response = await stockChangeApi.post("/", {
          "DateTime": dateString,
          "ProductId": product.id,
          "Quantity": change,
          "StockChangeType": "btb"  
        }).then((response) => {
            console.log(response);
        }).catch((e)=>{
            console.log(e.message)
        });
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
                                    <td>{product.fromDate} - {product.toDate}</td>
                                    <td>{product.requiredQuatity}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div class="btn-group btn-group-xs" role="group">
                                            <button class="btn btn-default" onClick={() => this.changeStock(product, 1)}>
                                                <i class="fa fa-plus"></i>
                                            </button>
                                            <button class="btn btn-default" onClick={() => this.changeStock(product, -1)}>
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