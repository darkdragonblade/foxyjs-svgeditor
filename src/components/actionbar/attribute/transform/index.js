import React from "react";
import "./index.css";
let ev;
class Transform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canFlip: false,
            canRotate: false,
        };
    }

    componentDidMount() {
        const stage = window.stage;
        stage.board.addEventListener(
            "selectedelementschange",
            (ev = () => {
                this.setState({
                    canFlip: stage.transformManager.canFlip(),
                    canRotate: stage.transformManager.canRotate(),
                });
            })
        );
    }

    componentWillUnmount() {
        const stage = window.stage;
        stage.board.removeEventListener("selectedelementschange", ev);
    }

    transform(type, deg) {
        const stage = window.stage;
        switch (type) {
            case "flipX":
                stage.transformManager.flipX();
                break;
            case "flipY":
                stage.transformManager.flipY();
                break;
            case "rotate":
                stage.transformManager.rotate(deg || 0);
                break;
            default:
        }
    }

    render() {
        return (
            <div className="transform">
                <h3>Transform</h3>
                <div className="items">
                    <div
                        className={`item ${!this.state.canFlip && "disabled"}`}
                        onClick={() => {
                            this.transform("flipX");
                        }}
                    >
                        <svg
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                            width="16"
                            height="16"
                        >
                            <path d="M 43.482 0.782 C 43.482 0.782 43.482 100.35 43.482 100.35 C 43.482 100.35 2.424 100.35 2.424 100.35 C 2.424 100.35 43.488 1.347 43.488 1.347"></path>
                            <path d="M 61.182 7.364 C 61.182 7.364 58.014 0.713 58.014 0.713 C 58.014 0.713 58.014 100.35 58.014 100.35 C 58.014 100.35 99.286 100.35 99.286 100.35 M 61.32 97.272 C 61.32 97.272 60.662 13.85 60.662 13.85 C 60.662 13.85 61.692 15.14 61.692 15.14 C 61.692 15.14 94.863 97.272 94.863 97.272"></path>
                        </svg>
                    </div>
                    <div
                        className={`item ${!this.state.canFlip && "disabled"}`}
                        onClick={() => {
                            this.transform("flipY");
                        }}
                    >
                        <svg
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                            width="16"
                            height="16"
                        >
                            <path d="M 100.105 43.728 C 100.105 43.728 1.605 43.728 1.605 43.728 C 1.605 43.728 1.605 2.669 1.605 2.669 C 1.605 2.669 99.546 43.734 99.546 43.734"></path>
                            <path d="M 92.014 61.428 C 92.014 61.428 98.48 58.259 98.48 58.259 C 98.48 58.259 1.605 58.259 1.605 58.259 C 1.605 58.259 1.605 99.532 1.605 99.532 M 4.599 61.566 C 4.599 61.566 85.708 60.908 85.708 60.908 C 85.708 60.908 84.454 61.938 84.454 61.938 C 84.454 61.938 4.599 95.109 4.599 95.109"></path>
                        </svg>
                    </div>
                    <div
                        className={`item ${!this.state.canRotate && "disabled"}`}
                        onClick={() => {
                            this.transform("rotate", 15);
                        }}
                    >
                        <svg
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                            width="16"
                            height="16"
                        >
                            <path
                                d="M 76.557 48.646 C 78.158 52.302 78.966 56.196 78.966 60.228 C 78.966 76.205 65.971 89.195 50 89.195 C 34.029 89.195 21.034 76.201 21.034 60.228 C 21.034 45.411 32.222 33.177 46.593 31.481 L 46.964 53.253 L 84.63 26.146 L 46.38 0.582 L 46.593 21.213 C 26.575 22.952 10.81 39.768 10.81 60.228 C 10.81 81.841 28.391 99.418 50 99.418 C 71.612 99.418 89.19 81.841 89.19 60.228 C 89.19 54.777 88.092 49.505 85.925 44.546 L 76.557 48.646 Z"
                                transform="matrix(0, 1, -1, 0, 100.000006, -0.00002)"
                            ></path>
                        </svg>
                    </div>
                    <div
                        className={`item ${!this.state.canRotate && "disabled"}`}
                        onClick={() => {
                            this.transform("rotate", -15);
                        }}
                    >
                        <svg
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                            width="16"
                            height="16"
                        >
                            <path
                                d="M 78.826 54.968 C 80.427 51.312 81.235 47.418 81.235 43.386 C 81.235 27.409 68.24 14.419 52.269 14.419 C 36.298 14.419 23.303 27.413 23.303 43.386 C 23.303 58.203 34.491 70.437 48.862 72.133 L 49.233 50.361 L 86.899 77.468 L 48.649 103.032 L 48.862 82.401 C 28.844 80.662 13.079 63.846 13.079 43.386 C 13.079 21.773 30.66 4.196 52.269 4.196 C 73.881 4.196 91.459 21.773 91.459 43.386 C 91.459 48.837 90.361 54.109 88.194 59.068 L 78.826 54.968 Z"
                                transform="matrix(0, 1, -1, 0, 103.321993, -1.215994)"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transform;
