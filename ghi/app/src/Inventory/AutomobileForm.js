import React from "react";

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            year: '',
            vin: '',
            model: '',
            models: [],
        };
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async submit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.models;

        const url = 'http://localhost:8100/api/automobiles/'
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
                color: '',
                year: '',
                vin: '',
                model: '',
            });
        }
    }
    inputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }
    async componentDidMount() {
        const url = "http://localhost:8100/api/models/";

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();

            this.setState({
                models: data.models,
            })
        };
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="header-title">Add a new automobile</h1>
                        <form onSubmit={this.submit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.color} required name="color" placeholder="Color" type="text" className="form-control"/>
                                <label htmlFor="Color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.year} required name="year" placeholder="Year" type="text" className="form-control"/>
                                <label htmlFor="Year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.vin} required name="vin" placeholder="VIN #" type="text" className="form-control"/>
                                <label htmlFor="Vin">VIN</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.inputChange} value={this.state.model} required name="model" className="form-select">
                                    <option value="">Choose a model</option>
                                    {this.state.models.map(model => {
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
}


export default AutomobileForm;
