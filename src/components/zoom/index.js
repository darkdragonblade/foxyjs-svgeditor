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

    render() {
        return (
            <div className="zoom">
                <svg width="14" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" /><path d="M21 15L21 27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.0156 21.0156L27 21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M33.2216 33.2217L41.7069 41.707" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div style={{ marginLeft: '6px' }}>{this.state.scale}%</div>
            </div>
        );
    }
}

export default Zoom