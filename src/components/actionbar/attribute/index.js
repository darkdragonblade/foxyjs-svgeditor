import React from "react";
import './index.css';
import Align from "./align";
import Transform from "./transform";
import ElementsGeometry from './elementsGeometry';
class Attribute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 3
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="attribute">
                <ElementsGeometry />
                <Align />
                <Transform />
            </div>
        );
    }
}

export default Attribute