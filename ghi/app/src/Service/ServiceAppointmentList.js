import React, { useState, useEffect } from "react";

function ServiceAppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentsData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setAppointments(data.appointments);
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const handleCancel = async (id) => {
    const url = `http://localhost:8080/api/appointments/${id}`;
    const fetchConfig = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(url, fetchConfig)
    if(response.ok){
        window.location.reload()
    }
}
const handleFinished = async (id) => {
    const url = `http://localhost:8080/api/appointments/${id}`;
    const fetchConfig = {
        method: "PUT",
        body : JSON.stringify({is_finished: true}),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(url, fetchConfig)
    if(response.ok){
        window.location.reload()
    }
}


  return(
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Vin</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
        {appointments.map((appointment, index) => {
            return (
                <tr key={index}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer_name }</td>
                    <td>{ appointment.date }</td>
                    <td>{ appointment.time }</td>
                    <td>{ appointment.technician.name}</td>
                    <td>{ appointment.reason}</td>
                    <td>
                        <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                        <button onClick={() => handleFinished(appointment.id)}>Finished</button>
                    </td>
                </tr>
            );
        })}
        </tbody>
    </table>
);
}
export default ServiceAppointmentList
