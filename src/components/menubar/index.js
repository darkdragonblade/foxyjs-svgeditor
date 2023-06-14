import React from "react";
import './index.css';
class Menubar extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="menubar">
                <div className="item">File</div>
                <div className="item">Edit</div>
                <div className="item">View</div>
                <div className="item">Help</div>
            </div>
        );
    }
}

export default Menubar