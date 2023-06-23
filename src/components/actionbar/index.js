import React from "react";
import './index.css';
import History from "./history";
import Text from "./text";
import Attribute from "./attribute";

class Actionbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 1
        }
    }

    componentDidMount() {

    }

    changeType(type) {
        this.setState({
            type
        });
    }

    render() {
        return (
            <div className="actionbar">
                <div className="tab">
                    <div onClick={() => {
                        this.changeType(1);
                    }} className={`item ${this.state.type === 1 && 'active'}`}>Attribute</div>
                    <div onClick={() => {
                        this.changeType(2);
                    }} className={`item ${this.state.type === 2 && 'active'}`}>Text</div>
                    <div onClick={() => {
                        this.changeType(3);
                    }} className={`item ${this.state.type === 3 && 'active'}`}>History</div>
                </div>
                {this.state.type === 1 && <Attribute />}
                {this.state.type === 2 && <Text />}
                {this.state.type === 3 && <History />}
            </div>
        );
    }
}

export default Actionbar