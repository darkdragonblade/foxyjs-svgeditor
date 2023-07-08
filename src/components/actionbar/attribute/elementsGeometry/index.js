import React from "react";
import "./index.css";

let ev;
let event;
class Align extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            isSelected: true,
            rotation: 0,
            width: 0,
            x: 0,
            y: 0,
        };
    }

    align = (type) => {
        const stage = window.stage;
        stage.alignManager.align(type);
    };

    init = () => {
        const stage = window.stage;
        this.setState(stage.elementsGeometryManager.get());
    };

    blur = (event, type) => {
        const stage = window.stage;
        switch (type) {
            case "x":
                stage.elementsGeometryManager.coordsX(event.target.value);
                break;
            case "y":
                stage.elementsGeometryManager.coordsY(event.target.value);
                break;
            case "width":
                stage.elementsGeometryManager.width(event.target.value);
                break;
            case "height":
                stage.elementsGeometryManager.height(event.target.value);
                break;
            default:
        }
    };

    handleChange = (event, type) => {
        switch (type) {
            case "x":
                this.setState({ x: event.target.value });
                break;
            case "y":
                this.setState({ y: event.target.value });
                break;
            case "width":
                this.setState({ width: event.target.value });
                break;
            case "height":
                this.setState({ height: event.target.value });
                break;
            default:
        }
    };

    componentDidMount() {
        this.init();
        const stage = window.stage;
        stage.board.addEventListener(
            "selectedelementschange",
            (ev = () => {
                this.init();
            })
        );

        stage.board.addEventListener(
            "workspacemutation",
            (event = () => {
                this.init();
            })
        );
    }

    componentWillUnmount() {
        const stage = window.stage;
        stage.board.removeEventListener("selectedelementschange", ev);
        stage.board.removeEventListener("workspacemutation", event);
    }

    render() {
        return (
            <div className="elementsGeometry">
                <h5>ElementsGeometry</h5>
                <div className="main flex">
                    <div className="half">
                        <div>x</div>
                        <input
                            onBlur={(ev) => {
                                this.blur(ev, 'x');
                            }}
                            onChange={(ev) => {
                                this.handleChange(ev, 'x');
                            }}
                            disabled={!this.state.isSelected || false}
                            value={this.state.x}
                        />
                    </div>
                    <div className="half">
                        <div>y</div>
                        <input
                            onBlur={(ev) => {
                                this.blur(ev, 'y');
                            }}
                            onChange={(ev) => {
                                this.handleChange(ev, 'y');
                            }}
                            disabled={!this.state.isSelected || false}
                            value={this.state.y}
                        />
                    </div>
                </div>
                <div className="main flex">
                    <div className="half">
                        <div>width</div>
                        <input
                            onBlur={(ev) => {
                                this.blur(ev, 'width');
                            }}
                            onChange={(ev) => {
                                this.handleChange(ev, 'width');
                            }}
                            disabled={!this.state.isSelected || false}
                            value={this.state.width}
                        />
                    </div>
                    <div className="half">
                        <div>height</div>
                        <input
                            onBlur={(ev) => {
                                this.blur(ev, 'height');
                            }}
                            onChange={(ev) => {
                                this.handleChange(ev, 'height');
                            }}
                            disabled={!this.state.isSelected || false}
                            value={this.state.height}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Align;
