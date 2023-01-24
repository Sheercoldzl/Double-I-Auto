import React from "react";

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_id: '',
        };
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    async submit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8090/api/employees/'
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
                employee_id: '',
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
                        <h1 className="header-title">Add a new sales rep</h1>
                        <form onSubmit={this.submit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.name} required name="name" placeholder="Name" type="text" className="form-control"/>
                                <label htmlFor="Name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.employee_id} required name="employee_id" placeholder="Employee ID" type="text" className="form-control"/>
                                <label htmlFor="Employee_id">Employee ID</label>
                            </div>
                            <button className="btn btn-secondary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default SalesPersonForm;
