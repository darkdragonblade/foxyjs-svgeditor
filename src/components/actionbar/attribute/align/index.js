import React from "react";
import './index.css';

let ev;
class Align extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canAlign: false
        }
    }

    align = (type) => {
        const stage = window.stage;
        stage.alignManager.align(type);
    }

    init() {
        const stage = window.stage;
        this.setState({
            canAlign: stage.selectedObjectElements.size > 0x0,
        });
    }

    componentDidMount() {
        this.init();
        const stage = window.stage;
        stage.board.addEventListener('selectedelementschange', ev = () => {
            this.init();
        });
    }

    componentWillUnmount() {
        const stage = window.stage;
        stage.board.removeEventListener('selectedelementschange', ev);
    }

    render() {
        return (
            <div className="align">
                <h5>Alignment</h5>
                <div className="items">
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('move-top-inside');
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17" y="14.5" width="14" height="28" fill="#333333" stroke="#333333" strokeWidth="1" strokeLinejoin="miter" /><path d="M42 6.5H6" stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" /></svg>
                    </div>
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('move-left-inside');
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14.5" y="17" width="28" height="14" fill="#333333" stroke="#333333" strokeWidth="1" strokeLinejoin="miter" /><path d="M6.5 6V42" stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" /></svg>
                    </div>
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('move-bottom-inside');
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17" y="6" width="14" height="28" fill="#333333" stroke="#333333" strokeWidth="1" strokeLinejoin="miter" /><path d="M42 42H6" stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" /></svg>
                    </div>
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('move-right-inside');
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="17" width="28" height="14" fill="#333333" stroke="#333333" strokeWidth="1" strokeLinejoin="miter" /><path d="M42 6V42" stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" /></svg>
                    </div>
                </div>
                <div className="items">
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('vertical-center');
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="17" width="34" height="14" fill="#333333" stroke="#333333" strokeWidth="1" strokeLinejoin="miter" /><path d="M24 6V42" stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" /></svg>
                    </div>
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('horizontal-center');
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17" y="7" width="14" height="34" fill="#333333" stroke="#333333" strokeWidth="1" strokeLinejoin="miter" /><path d="M42 24H6" stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" /></svg>
                    </div>
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('vertical-stretch');
                    }}>
                        <svg preserveAspectRatio="none" viewBox="0 0 100 100" width="16" height="16">
                            <path d="M 18.667 19.024 C 18.853 40.093 18.918 60.977 18.86 81.676 C 39.545 81.676 60.229 81.676 80.915 81.676 C 80.915 60.793 80.915 39.907 80.915 19.024 C 60.165 19.024 39.416 19.024 18.667 19.024 Z"></path>
                            <path d="M 18.1 88.011 C 18.306 90.033 18.363 92.031 18.306 94.011 C 39.511 94.011 60.696 94.011 81.9 94.011 C 81.9 92.013 81.9 90.009 81.9 88.011 C 60.621 88.011 39.379 88.011 18.1 88.011 Z" ></path>
                            <path d="M 18.303 18.268 L 81.707 18.268 L 81.707 81.672 L 18.303 81.672 Z M 25.272 75.036 L 74.739 75.036 L 74.739 25.569 L 25.272 25.569 Z" ></path>
                            <path d="M 18.1 5.99 C 18.306 8.012 18.363 10.01 18.306 11.99 C 39.511 11.99 60.696 11.99 81.9 11.99 C 81.9 9.992 81.9 7.988 81.9 5.99 C 60.621 5.99 39.379 5.99 18.1 5.99 Z" ></path>
                        </svg>
                    </div>
                    <div className={`item ${!this.state.canAlign && 'disabled'}`} onClick={() => {
                        this.align('horizontal-stretch');
                    }}>
                        <svg preserveAspectRatio="none" viewBox="0 0 100 100" width="16" height="16">
                            <path d="M 18.667 19.024 C 18.853 40.093 18.918 60.977 18.86 81.676 C 39.545 81.676 60.229 81.676 80.915 81.676 C 80.915 60.793 80.915 39.907 80.915 19.024 C 60.165 19.024 39.416 19.024 18.667 19.024 Z" transform="matrix(0, 1, -1, 0, 100.14101, 0.559003)"></path>
                            <path d="M 59.001 47 C 59.208 49.022 59.265 51.02 59.208 53 C 80.526 53 101.825 53 123.143 53 C 123.143 51.002 123.143 48.998 123.143 47 C 101.75 47 80.394 47 59.001 47 Z" transform="matrix(0, 1, -1, 0, 141.071996, -41.071996)" ></path>
                            <path d="M 18.303 18.268 L 81.707 18.268 L 81.707 81.672 L 18.303 81.672 Z M 25.272 75.036 L 74.739 75.036 L 74.739 25.569 L 25.272 25.569 Z" ></path>
                            <path d="M -23.143 47 C -22.936 49.022 -22.879 51.02 -22.936 53 C -1.618 53 19.681 53 40.999 53 C 40.999 51.002 40.999 48.998 40.999 47 C 19.606 47 -1.75 47 -23.143 47 Z" transform="matrix(0, 1, -1, 0, 58.928001, 41.072)" ></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default Align