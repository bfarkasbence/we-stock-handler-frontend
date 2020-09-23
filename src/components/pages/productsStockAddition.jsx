import React from "react";

function ProductsStockAdditionPage() {

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
                            <tr>
                                <td>A11</td>
                                <td>Dummy termék</td>
                                <td>8</td>
                                <td>8</td>
                                <td>
                                    <div className="btn-group btn-group-xs">
                                        <button className="btn btn-default">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                        <button className="btn btn-default">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
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