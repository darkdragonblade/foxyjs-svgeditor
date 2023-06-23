import React from "react";
import './index.css';
import Align from "./align";
import Transform from "./transform";
import Color from "./color";
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
                <Align />
                <Transform />
                <Color />
            </div>
        );
    }
}

export default Attribute