import React, {useState, useEffect } from 'react';


function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])
    const [formData, setFormData] = useState({
        vin: '',
        customer_name: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
    })
    const fetchData = async () => {
      const url = 'http://localhost:8080/api/technicians/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);


    const handleSubmit = async (event) => {
      event.preventDefault();
      const url = 'http://localhost:8080/api/appointments/';
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        setFormData({
            vin: '',
            customer_name: '',
            date: '',
            time: '',
            technician: '',
            reason: '',
        });
      }
    }
    const handleFormChange = (e) => {
      const value = e.target.value;
      const inputName = e.target.name;
      setFormData({
        ...formData,
        [inputName]: value
      });
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Make Appointment</h1>
            <form onSubmit={handleSubmit} id="create-app-form">
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                    <label htmlFor="customer_name">Customer Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                    <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                    <label htmlFor="time">Time</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">Reason</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                    <option value="">Choose Technician</option>
                    {technicians.map(technician => {
                        return (
                        <option key={technician.id} value={technician.id}>{technician.name}</option>
                        )
                    })}
                    </select>
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default AppointmentForm;
