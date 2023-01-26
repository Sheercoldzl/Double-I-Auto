import React, { useState, useEffect } from "react";

function ServiceAppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [filterVin, setFilterVin] = useState("");

  const fetchAppointmentsData = async () => {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    const data = await response.json();
    setAppointments(data.appointments);
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, []);

  const handleChange = (e) =>{
    setFilterVin(e.target.value.toLowerCase())
  };

  const filteredVin = () => {
    return(
    appointments.filter((appointment) =>
    appointment.vin.toLowerCase().includes(filterVin))
    );
  }

  return(
    <>
    <h1>Appointments History</h1>
    <input onChange={handleChange} placeholder="VIN Number"/>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Vin</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
            </tr>
        </thead>
        <tbody>
            {filteredVin().map((appointment, index) => (
                <tr key={index}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer_name }</td>
                    <td>{ appointment.date }</td>
                    <td>{ appointment.time }</td>
                    <td>{ appointment.technician.name}</td>
                    <td>{ appointment.reason}</td>
                </tr>
            ))
            }
        </tbody>
    </table>
    </>
  );
}
export default ServiceAppointmentList

{/* <button class="btn btn-outline-success me-2" type="submit">Search</button> */}
