import React from "react";
import './index.css';
class Zoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = { scale: 100 };
    }

    componentDidMount() {
        window.stage.board.addEventListener('zoomchange', () => {
            this.setState({
                scale: Math.ceil(window.stage.scale * 100)
            })
        });
    }

    zoomIn() {
        window.stage.zoomManager.zoomIn();
    }

    zoomOut() {
        window.stage.zoomManager.zoomOut();
    }

    render() {
        return (
            <div className="zoom">
                <div class="zoom-out" style={{ cursor: 'pointer' }} onClick={() => {
                    this.zoomOut();
                }} >
                    <svg width="17" height="17" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 24L38.5 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div class="scale">{this.state.scale}%</div>
                <div class="zoom-in" style={{ cursor: 'pointer' }} onClick={() => {
                    this.zoomIn();
                }}>
                    <svg width="17" height="17" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0605 10L24.0239 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 24L38 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
            </div>
        );
    }
}

export default Zoom