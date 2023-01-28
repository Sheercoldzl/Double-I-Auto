import React from "react";
import { NavLink } from "react-router-dom";

class ManufacturerList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            manufacturers: [],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers})
        }
    }

    render() {
    return(
        <div>
            <h1 className="header-title-manufacturer">Manufacturers</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {this.state.manufacturers.map(manufacturer => {
                                return(
                                        <div className="col" key={manufacturer.id}>
                                            <div className="card">
                                                <div className="card-body">
                                                <div className="imgButton">
                                                    <NavLink to={`/models/${manufacturer.name}`} className="btn btn-secondary">{manufacturer.name}</NavLink>
                                                    <div className="card-body">
                                                </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                );
                            })}
            </div>
        </div>
        )
    }
}

export default ManufacturerList;
