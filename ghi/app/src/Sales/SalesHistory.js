import React from "react";

class SalesHistory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            salesperson: '',
            sales: [],
            salespersons: [],
        };
        this.filterChange = this.filterChange.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    filterChange(event) {
        const value = event.target.value;

        this.setState({ salesperson: value })
        this.refresh()
    }

    async refresh() {
        const salesUrl = 'http://localhost:8090/api/sales/'
        const salespersonUrl = 'http://localhost:8090/api/employees/'

        const salesResponse = await fetch(salesUrl);
        const salespersonResponse = await fetch(salespersonUrl);

        if (salesResponse.ok && salespersonResponse.ok) {
            const salesData = await salesResponse.json();
            const salespersonData = await salespersonResponse.json();
            if (this.state.salesperson === '') {
                this.setState({
                    sales: salesData.sales,
                    salespersons: salespersonData.salespersons,
                })
            }
            else {
            let filteredSales = salesData.sales.filter(sale => sale.salesperson.employee_id === Number(this.state.salesperson))

            this.setState({
                sales: filteredSales,
                salespersons: salespersonData.salespersons,
                })
            }
        };
    }

    async componentDidMount() {
        this.refresh()
    }

    render() {
    return(
        <div className="container">
            <h1 className="header-title">History of sales</h1>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <select onChange={this.filterChange} value={this.state.salesperson} required name="salesperson" className="form-select">
                            <option value="">All</option>
                            {this.state.salespersons.map(salesperson => {
                                return (
                                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                        {salesperson.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-head">Sales person</th>
                        <th className="table-head">Customer</th>
                        <th className="table-head">VIN</th>
                        <th className="table-head">Sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales.map(sale => {
                        return(
                            <tr key={sale.id}>
                                <td className="model-text">{ sale.salesperson.name }</td>
                                <td className="model-text">{ sale.customer.name }</td>
                                <td className="model-text">{ sale.automobile.vin }</td>
                                <td className="model-text">{ sale.price }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        )
    }
}

export default SalesHistory;
