import React from "react";

class SalesList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sales: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({sales: data.sales})
        }
    }

    render() {
    return(
        <div className="container">
            <h1 className="header-title">List of Sales</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-head">Automobile VIN</th>
                        <th className="table-head">Sales Rep</th>
                        <th className="table-head">Customer</th>
                        <th className="table-head">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales.map(sale => {
                        return(
                            <tr key={sale.id}>
                                <td className="model-text">{ sale.automobile.vin }</td>
                                <td className="model-text">{ sale.salesperson.employee_id }</td>
                                <td className="model-text">{ sale.customer.name }</td>
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

export default SalesList;
