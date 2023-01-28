import React, {useState, useEffect } from 'react';

function AutomobileForm() {
    const [models, setModel] = useState([])

    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
    })

    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
            if (response.ok) {
            const data = await response.json();
            setModel(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8100/api/automobiles/';
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
            color: '',
            year: '',
            vin: '',
            model_id: '',
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
                        <h1 className="header-title">Add a New Automobile</h1>
                        <form onSubmit={handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.color} required name="color" placeholder="Color" type="text" className="form-control"/>
                                <label htmlFor="Color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.year} required name="year" placeholder="Year" type="text" className="form-control"/>
                                <label htmlFor="Year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.vin} required name="vin" placeholder="VIN #" type="text" className="form-control"/>
                                <label htmlFor="Vin">VIN</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.model_id} required name="model_id" className="form-select">
                                    <option value="">Choose a Model</option>
                                    { models.map(model => {
                                        return (
                                            <option key={model.href} value={model.id}>
                                                {model.name}
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


export default AutomobileForm;
