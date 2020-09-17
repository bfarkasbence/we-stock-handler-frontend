import React, {useState} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from "react";

function AttendancePage() {

    const[consultants, setConsultants] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const[newAttendance, setNewAttendance] = useState([]);

    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + mm + dd;
        
        Axios.get("https://localhost:5001/api/attendance/date", {params: {
            from: today,
            to: today
        }}).then(response => {setAttendance(response.data)});

    }, [setAttendance])

    useEffect(() => {
        Axios.get("https://localhost:5001/api/consultant")
        .then(response => {setConsultants(response.data)});
    }, [setConsultants])

    const addToAttendance = (consultant) => {
        setNewAttendance(newAttendance.concat(consultant));
        
        for (var i=0; i<consultants.length; i++)
        {
            if (consultants[i].id === consultant.id)
            {
                let newConsultants = [...consultants];
                newConsultants.splice(i, 1);
                setConsultants(newConsultants);
            }
        }
    }

    const removeFromAttendance = (consultant) => {
        setConsultants(consultants.concat(consultant));
        for (var i=0; i<newAttendance.length; i++)
        {
            if (newAttendance[i].id === consultant.id)
            {
                let addAttendance = [...newAttendance];
                addAttendance.splice(i, 1);
                setNewAttendance(addAttendance);
            }
        }
    }

    const saveAttendance = async () => {
        let attendanceString = JSON.stringify(newAttendance);
        let url = "https://localhost:5001/api/attendance"

        fetch(url, {method: 'POST',
        body: attendanceString,
        headers:{ 'Content-Type': 'application/json'}})
        .then((response) => {
            console.log(response);

            setNewAttendance([]);
            setConsultants([]);
        })
        .catch((e) =>{console.log(e.message);
        })

    }

    return(
        <div className="container" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%", width: "100%"}}>
            <div className="card">
                <div className="card-header">
                        <h4>Jelenlét</h4>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Tanácsadószám</th>
                                <th scope="col">Név</th>
                            </tr>
                        </thead>
                        <tbody>
                        {attendance.map(consultant =>
                            <tr key={consultant.id}>
                                <td>{consultant.consultantId}</td>
                                <td>{consultant.consultantName}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Új jelenlét</h4>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <tbody>
                        {newAttendance.map(consultant =>
                            <tr key={consultant.id}>
                                <td>{consultant.consultantId}</td>
                                <td>{consultant.name}</td>
                                <td>
                                    <button className="btn btn-default" onClick={() => removeFromAttendance(consultant)}>-</button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                        <button className="btn btn-dark" onClick={() => saveAttendance()}>Mentés</button>
                    </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Tanácsadók</h4>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Tanácsadószám</th>
                                <th scope="col">Név</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultants.map(consultant => 
                                <tr key={consultant.id}>
                                    <td>{consultant.consultantId}</td> 
                                    <td>{consultant.name}</td>
                                    <td>
                                        <button className="btn btn-default" onClick={() => addToAttendance(consultant)}>+</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AttendancePage;