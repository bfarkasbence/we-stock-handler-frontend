import React, {useState} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router";


function AddProductPage(props) {
    
    const api = Axios.create({
        baseURL: "https://localhost:5001/api/product"
    })

    const [productCode, setProductCode] = useState("");
    const [name, setName] = useState("");
    const [cartonCode, setCartonCode] = useState(0);
    const [price, setPrice] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState(0);

    const history = useHistory();

    const productCodeOnChange = (event) => {
        setProductCode(event.target.value)  
    };

    const nameOnChange = (event) => {
        setName(event.target.value)
    };

    const cartonCodeOnChange = (event) => {
        setCartonCode(event.target.value)
    };

    const priceOnChange = (event) => {
        setPrice(event.target.value)
    };

    const fromDateOnChange = (event) => {
        setFromDate(event.target.value)
    };

    const toDateOnChange = (event) => {
        setToDate(event.target.value)
    };

   const requiredQuantityOnChange = (event) => {
        setRequiredQuantity(event.target.value)
    };

   const createProduct = async () => {
        
       try {
        let response = await api.post("/", {
            "ProductCode": productCode,
            "Name": name,
            "CartonCode": parseInt(cartonCode),
            "Price": parseInt(price),
            "RequiredQuatity": parseInt(requiredQuantity),
            "Quantity": 0,
            "FromDate":fromDate.toString(),
            "ToDate": toDate.toString()
        })
        history.goBack();
        console.log(response);
       } catch (error) {
           console.log(error);
       }
    };

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
                                <input type="text" className="form-control" id="productCode" onChange={productCodeOnChange} value={productCode}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Név</label>
                                <input type="text" className="form-control" id="name" onChange={nameOnChange} value={name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cartonCode">Karton kód</label>
                                <input type="number" className="form-control" id="cartonCode" onChange={cartonCodeOnChange} value={cartonCode}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Ár</label>
                                <input type="number" className="form-control" id="price" onChange={priceOnChange} value={price}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fromDate">Dátumtól</label>
                                <input type="date" className="form-control" id="fromDate"  onChange={fromDateOnChange} value={fromDate}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="toDate">Dátumig</label>
                                <input type="date" className="form-control" id="toDate" onChange={toDateOnChange} value={toDate}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="requiredQuantity">Szükséges mennyiség</label>
                                <input type="number" className="form-control" id="requiredQuantity" onChange={requiredQuantityOnChange} value={requiredQuantity}/>
                            </div>
                            <button className="btn btn btn-dark" onClick={() => createProduct()}>Mentés</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    

}

export default AddProductPage;