import React, {useState, useEffect } from 'react';

function VehicleModelForm() {
    const [manufacturers, setManufacturers] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        manufacturer_id: '',
        picture_url: '',
    })

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
            if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
            }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8100/api/models/';
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
                manufacturer_id: '',
                picture_url: '',
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
                        <h1 className="header-title">Add a New Model</h1>
                        <form onSubmit={handleSubmit} id="create-vehiclemodel-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} required name="name" placeholder="Name of Model" type="text" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.picture_url} required name="picture_url" placeholder="Picture Url" type="url" id="picture_url" className="form-control"/>
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                                    <option value="">Choose a Manufacturer</option>
                                    { manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-secondary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


export default VehicleModelForm;
