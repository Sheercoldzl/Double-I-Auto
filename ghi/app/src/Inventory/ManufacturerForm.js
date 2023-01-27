import React, {useState, useEffect } from 'react';

function ManufacturerForm() {
    const [formData, setFormData] = useState({
        name: '',
    })

      const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/manufacturers/';
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
                name: '',
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

    {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="header-title">Add a new manufacturer</h1>
                        <form onSubmit={handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} required name="name" placeholder="Name" type="text" className="form-control"/>
                                <label htmlFor="Name">Name</label>
                            </div>
                            <button className="btn btn-secondary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManufacturerForm;
