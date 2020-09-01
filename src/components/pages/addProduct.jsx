import React, {Component} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const api = Axios.create({
    baseURL: "https://localhost:5001/api/product"
})



class AddProductPage extends Component {
    
    state = {
        productCode: "",
        name: "",
        cartonCode: 0,
        price: 0,
        fromDate: "",
        toDate: "",
        requiredQuantity: 0,
        quantity: 0  
    };

    productCodeOnChange = (event) => {
        this.setState({productCode: event.target.value})
    };

    nameOnChange = (event) => {
        this.setState({name: event.target.value})
    };

    cartonCodeOnChange = (event) => {
        this.setState({cartonCode: event.target.value})
    };

    priceOnChange = (event) => {
        this.setState({price: event.target.value})
    };

    fromDateOnChange = (event) => {
        this.setState({fromDate: event.target.value})
        console.log(this.state.fromDate)
    };

    toDateOnChange = (event) => {
        this.setState({toDate: event.target.value})
    };

    requiredQuantityOnChange = (event) => {
        this.setState({requiredQuantity: event.target.value})
    };

    createProduct = async () => {
        let response = await api.post("/", {
            "ProductCode": this.state.productCode,
            "Name": this.state.name,
            "CartonCode": parseInt(this.state.cartonCode),
            "Price": parseInt(this.state.price),
            "RequiredQuatity": parseInt(this.state.requiredQuantity),
            "Quantity": 0,
            "FromDate":this.state.fromDate.toString(),
            "ToDate": this.state.toDate.toString()
        }).then((response) => {
            console.log(response);
        }).catch((e)=>{
            console.log(e.message);
        })
    };

    render(){
        return(
            <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "128 rem"}}>
                <div className="card">
                    <div className="card-header">
                        <h4>Új termék</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="productCode">Kód</label>
                                <input type="text" className="form-control" id="productCode" onChange={this.productCodeOnChange} value={this.state.productCode}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Név</label>
                                <input type="text" className="form-control" id="name" onChange={this.nameOnChange} value={this.state.name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cartonCode">Karton kód</label>
                                <input type="number" className="form-control" id="cartonCode" onChange={this.cartonCodeOnChange} value={this.state.cartonCode}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Ár</label>
                                <input type="number" className="form-control" id="price" onChange={this.priceOnChange} value={this.state.price}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fromDate">Dátumtól</label>
                                <input type="date" className="form-control" id="fromDate"  onChange={this.fromDateOnChange} value={this.state.fromDate}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="toDate">Dátumig</label>
                                <input type="date" className="form-control" id="toDate" onChange={this.toDateOnChange} value={this.state.toDate}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="requiredQuantity">Szükséges mennyiség</label>
                                <input type="number" className="form-control" id="requiredQuantity" onChange={this.requiredQuantityOnChange} value={this.state.requiredQuantity}/>
                            </div>
                            <button class="btn btn btn-dark" onClick={() => this.createProduct()}>Mentés</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

}

export default AddProductPage;