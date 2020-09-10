import React, {useState} from "react";
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from "react";

function AttendancePage() {

    const[consultants, setConsultants] = useState([]);
    const[attendance, setAttendance] = useState([]);

    useEffect(() => {
        Axios.get("https://localhost:5001/api/consultant")
        .then(response => {setConsultants(response.data)});
    }, [setConsultants])

    const addToAttendance = (consultant) => {
        setAttendance(attendance.concat(consultant));
        
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
        for (var i=0; i<attendance.length; i++)
        {
            if (attendance[i].id === consultant.id)
            {
                let newAttendance = [...attendance];
                newAttendance.splice(i, 1);
                setAttendance(newAttendance);
            }
        }
    }

    const saveAttendance = async () => {
        let attendanceString = JSON.stringify(attendance);
        let url = "https://localhost:5001/api/attendance"

        fetch(url, {method: 'POST',
        body: attendanceString,
        headers:{ 'Content-Type': 'application/json'}})
        .then((response) => {
            console.log(response);

            setAttendance([]);
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
                        <tbody>
                        {attendance.map(consultant =>
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
                    <div className="card-footer">
                        <button className="btn btn-dark" onClick={() => saveAttendance()}>Mentés</button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h4>Tanácsadók</h4>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
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