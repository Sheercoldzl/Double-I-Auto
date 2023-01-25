import React from "react";

class AutomobileList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            autos: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({autos: data.autos})
        }
    }

    render() {
    return(
        <div className="container">
            <h1 className="header-title">List of Automobiles</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-head">VIN</th>
                        <th className="table-head">Color</th>
                        <th className="table-head">Year</th>
                        <th className="table-head">Model</th>
                        <th className="table-head">Make</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.autos.map(auto => {
                        return(
                            <tr key={auto.id}>
                                <td className="model-text">{ auto.vin }</td>
                                <td className="model-text">{ auto.color }</td>
                                <td className="model-text">{ auto.year }</td>
                                <td className="model-text">{ auto.model.name }</td>
                                <td className="model-text">{ auto.model.manufacturer.name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        )
    }
}

export default AutomobileList;
