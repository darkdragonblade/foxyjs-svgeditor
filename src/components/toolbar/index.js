import React from "react";
import "./index.css";
class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentTool: "" };
    }

    toggleTool(type) {
        window.stage.toggleTool(type);
    }

    componentDidMount() {
        const stage = window.stage;
        stage.toggleTool("transform-tool");
        this.setState({
            currentTool: stage.currentTool,
        });

        stage.board.addEventListener("currenttoolchange", () => {
            this.setState({
                currentTool: stage.currentTool,
            });
        });
    }

    render() {
        return (
            <div className="toolbar">
                <div
                    className={`item ${this.state.currentTool === "transform-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("transform-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 6L43 25L24 27L13.9948 44L8 6Z"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "pan-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("pan-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.2227 37.471L6.54955 26.9844C5.13168 25.0466 5.51902 22.3315 7.42219 20.8675C9.18287 19.5132 11.675 19.675 13.2457 21.2457L16 24V7.25C16 5.45507 17.4551 4 19.25 4C21.0449 4 22.5 5.45508 22.5 7.25V6.25C22.5 4.45507 23.9551 3 25.75 3C27.5449 3 29 4.45508 29 6.25V7.25C29 5.45507 30.4551 4 32.25 4C34.0449 4 35.5 5.45508 35.5 7.25V11.25C35.5 9.45507 36.9551 8 38.75 8C40.5449 8 42 9.45507 42 11.25V30.3077C42 33.0387 41.1618 35.7251 39.6196 37.979C37.0557 41.7263 32.7851 44 28.2446 44H27.0901C22.0053 44 17.2254 41.5747 14.2227 37.471Z"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "rect-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("rect-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M42 8H6C4.89543 8 4 8.89543 4 10V38C4 39.1046 4.89543 40 6 40H42C43.1046 40 44 39.1046 44 38V10C44 8.89543 43.1046 8 42 8Z"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "ellipse-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("ellipse-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse
                            cx="24"
                            cy="24"
                            rx="14"
                            ry="20"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "triangle-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("triangle-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.2692 6.98965C23.0395 5.65908 24.9605 5.65908 25.7309 6.98965L44.262 38.9979C45.0339 40.3313 44.0718 42 42.5311 42H5.4689C3.92823 42 2.96611 40.3313 3.73804 38.9979L22.2692 6.98965Z"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "star-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("star-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "text-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("text-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="6"
                            y="6"
                            width="36"
                            height="36"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 19V16H32V19"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 34H26"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24 18L24 34"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "freehand-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("freehand-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#icon-def928152696ccc)">
                            <path
                                d="M30.9995 8.99902L38.9995 16.999"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.99953 31.999L35.9994 4L43.9995 11.999L15.9995 39.999L5.99951 41.999L7.99953 31.999Z"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M30.9995 8.99902L38.9995 16.999"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.99951 31.999L15.9995 38.999"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.9995 34.999L34.9995 12.999"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="icon-def928152696ccc">
                                <rect width="48" height="48" fill="currentColor" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div
                    className={`item ${this.state.currentTool === "pen-tool" && "active"
                        }`}
                    onClick={() => {
                        this.toggleTool("pen-tool");
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M40 35C40 25.7953 32.8366 10 24 10C15.1634 10 8 25.7953 8 35"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="4"
                            y="35"
                            width="8"
                            height="8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="4"
                            y="6"
                            width="8"
                            height="8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="36"
                            y="35"
                            width="8"
                            height="8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="36"
                            y="6"
                            width="8"
                            height="8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 10H36"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

            </div>
        );
    }
}

export default Toolbar;
