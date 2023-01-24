import React from "react";

class AudiList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            models: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            let audiModels = data.models.filter(model => model.manufacturer.name === "Audi")
            this.setState({models: audiModels})
        }
    }

    render() {
    return(
        <div className="container">
            <h1 className="header-title">Audi</h1>
            <div className="extra container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-head">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.models.map(model => {
                        return(
                            <tr key={model.id}>
                                <td className="model-text">{ model.name }</td>
                                <td>
                                    <img alt="" className="photo" width="340" height="230" src={model.picture_url}></img>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}

export default AudiList;
