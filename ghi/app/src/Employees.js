import React from "react";

class EmployeesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salespersons: [],
            technicians: [],
            employees: [],
        };
    }


    async componentDidMount() {
        const salesUrl = 'http://localhost:8090/api/employees/';
        const techUrl = 'http://localhost:8080/api/technician/';

        const salesResponse = await fetch(salesUrl);
        const techResponse = await fetch(techUrl);

        if (salesResponse.ok && techResponse.ok) {
            const salesData = await salesResponse.json();
            const techData = await techResponse.json();
            const employeesData = salesData.salespersons.concat(techData.technicians)
            this.setState({
                salespersons: salesData.salespersons,
                technicians: techData.technicians,
                employees: employeesData,
            })
        }
    }


    render() {
        return (
            <div className="container">
            <h1 className="header-title">List of Employees</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-head">Name</th>
                        <th className="table-head">Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.map(employee => {
                        return(
                            <tr key={employee.id}>
                                <td className="model-text">{ employee.name }</td>
                                <td className="model-text">{ employee.employee_id }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        )
    }
}

export default EmployeesList;
