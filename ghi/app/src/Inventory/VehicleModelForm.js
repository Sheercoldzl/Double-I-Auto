import React from "react";

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            manufacturer: '',
            picture_url: '',
            manufacturers: [],
        };
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async submit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.manufacturers;

        const url = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            this.setState({
                name: '',
                manufacturer: '',
                picture_url: '',
            });
        }
    }
    inputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }
    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/";

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();

            this.setState({
                manufacturers: data.manufacturers,
            })
        };
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="header-title">Add a new model</h1>
                        <form onSubmit={this.submit} id="create-vehiclemodel-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.name} required name="name" placeholder="Name" type="text" className="form-control"/>
                                <label htmlFor="Name">Model Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.picture_url} required name="picture_url" placeholder="Image URL" type="url" className="form-control"/>
                                <label htmlFor="Picture_url">Image URL</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.inputChange} value={this.state.manufacturer} required name="manufacturer" className="form-select">
                                    <option value="">Choose a manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.href} value={manufacturer.id}>
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
}


export default VehicleModelForm;
