import React from "react";

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture_url: '',
        };
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async submit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8100/api/manufacturers/'
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
                picture_url: '',
            });
        }
    }
    inputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="header-title">Add a new manufacturer</h1>
                        <form onSubmit={this.submit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.name} required name="name" placeholder="Name" type="text" className="form-control"/>
                                <label htmlFor="Name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.picture_url} required name="picture_url" placeholder="Picture Url" type="url" className="form-control"/>
                                <label htmlFor="Picture_Url">Picture url</label>
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
