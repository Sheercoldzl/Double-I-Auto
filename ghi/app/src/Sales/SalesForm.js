import React from "react";

class SalesForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobile: '',
            salesperson: '',
            customer: '',
            price: '',
            automobiles: [],
            salespersons: [],
            customers: []
        };
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }

    async delete() {

        const url = `http://localhost:8100/api/automobiles/${this.state.automobile}/`
        const fetchConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        await fetch(url, fetchConfig)
        let filteredAutos = this.state.automobiles.filter(auto => auto.vin !== this.state.automobile)
        this.setState({
            automobiles: filteredAutos
        })

    }
    async submit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.automobiles;
        delete data.salespersons;
        delete data.customers;

        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            this.setState({
                automobile: '',
                salesperson: '',
                customer: '',
                price: '',
            });
        }
        this.delete()
    }
    inputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value })
    }
    async componentDidMount() {
        const autoUrl = "http://localhost:8100/api/automobiles/";
        const salespersonUrl = "http://localhost:8090/api/employees/";
        const customerUrl = "http://localhost:8090/api/customers/";

        const autoResponse = await fetch(autoUrl)
        const salespersonResponse = await fetch(salespersonUrl)
        const customerResponse = await fetch(customerUrl)

        if (autoResponse.ok && salespersonResponse.ok && customerResponse.ok) {
            const autoData = await autoResponse.json();
            const salespersonData = await salespersonResponse.json();
            const customerData = await customerResponse.json();

            this.setState({
                automobiles: autoData.autos,
                salespersons: salespersonData.salespersons,
                customers: customerData.customers,
            })
        };
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 className="header-title">Record a new sale</h1>
                        <form onSubmit={this.submit} id="create-sale-form">
                            <div className="mb-3">
                                <select onChange={this.inputChange} value={this.state.automobile} required name="automobile" className="form-select">
                                    <option value="">Choose an automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.vin}>
                                                {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.inputChange} value={this.state.salesperson} required name="salesperson" className="form-select">
                                    <option value="">Choose a salesperson</option>
                                    {this.state.salespersons.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.employee_id}>
                                                {salesperson.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.inputChange} value={this.state.customer} required name="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.phone_number}>
                                                {customer.phone_number}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.inputChange} value={this.state.price} required name="price" placeholder="Price" type="text" className="form-control"/>
                                <label htmlFor="Price">Price</label>
                            </div>
                            <button onClick={() => this.delete()}className="btn btn-secondary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesForm;
