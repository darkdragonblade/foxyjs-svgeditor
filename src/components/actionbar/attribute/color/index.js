import React from "react";
import "./index.css";
import { HexColorPicker } from "react-colorful";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
let ev;
class Color extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fill: "#000000",
            stroke: "#000000",
            color: "#000000",
            strokeWidth: 0,
            type: 1,
            selectedObjectElementsLength: 0,
        };
    }

    colorChange(color) {
        const stage = window.stage;


        if (this.state.type === 1) {
            this.setState({
                fill: color,
            });
            stage.styleManager.set('fill', color);
        } else {
            this.setState({
                stroke: color,
            });
            stage.styleManager.set('stroke', color);
        }
    }

    sliderChange(strokeWidth) {
        const stage = window.stage;
        this.setState({
            strokeWidth
        });
        stage.styleManager.set('stroke-width', strokeWidth);
    }

    typeChange(type) {
        this.setState({
            type
        });
        this.getStyle(type);
    }

    colorRgbToHex(orig) {
        let a;
        const rgb = orig
            .replace(/\s/g, "")
            .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
        const alpha = ((rgb && rgb[4]) || "").trim();
        let hex = rgb
            ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
            (rgb[2] | (1 << 8)).toString(16).slice(1) +
            (rgb[3] | (1 << 8)).toString(16).slice(1)
            : orig;

        if (alpha !== "") {
            a = alpha;
        } else {
            a = '01';
        }
        hex = hex + a;
        return hex;
    }

    getStyle(type) {
        const stage = window.stage;
        const nodes = Array.from(stage.selectedObjectElements.keys());
        if (!nodes?.[0]) return;
        const aD = document.createNodeIterator(nodes[0], NodeFilter.SHOW_ELEMENT);
        let aE = null;
        for (; (aE = aD.nextNode());) {
            if (aE.localName !== "g") {
                const strokeWidth = getComputedStyle(aE).strokeWidth;
                if (type === 1) {
                    const color = this.colorRgbToHex(getComputedStyle(aE).fill);
                    this.setState({
                        color,
                    });
                } else {
                    const color = this.colorRgbToHex(getComputedStyle(aE).stroke);
                    this.setState({
                        color,
                    });
                }
                this.setState({
                    strokeWidth: parseFloat(strokeWidth),
                });
                break;
            }
        }
    }

    init() {
        const stage = window.stage;
        this.setState({
            selectedObjectElementsLength: stage.selectedObjectElements.size
        })
        this.getStyle(this.state.type);
    }

    componentDidMount() {
        this.init();
        const stage = window.stage;
        stage.board.addEventListener(
            "selectedelementschange",
            (ev = () => {
                this.init();
            })
        );

        try {
            window.addEventListener('eyeDropChange', (e) => {
                const color = e.detail.sRGBHex;
                this.setState({
                    color,
                });
                this.colorChange(color);
            });
        } catch (error) { }

    }

    componentWillUnmount() {
        const stage = window.stage;
        stage.board.removeEventListener("selectedelementschange", ev);

        try {
            window.removeEventListener('eyeDropChange');

        } catch (error) { }
    }

    render() {
        return (
            <div className="color">
                <h5>Color</h5>
                <div className="tabs">
                    <div className={`tab-item ${this.state.type === 1 && 'active'}`} onClick={() => {
                        this.typeChange(1);
                    }}>Fill</div>
                    <div className={`tab-item ${this.state.type === 2 && 'active'}`} onClick={() => {
                        this.typeChange(2);
                    }}>Stroke</div>
                </div>

                <div className="item">
                    <HexColorPicker
                        className={`picker ${this.state.selectedObjectElementsLength === 0 && 'disabled'}`}
                        color={this.state.color}
                        onChange={(ev) => {
                            this.colorChange(ev);
                        }}
                    />
                </div>
                <h5>Stroke Width</h5>
                <div className="item">
                    <Slider className={`slider ${this.state.selectedObjectElementsLength === 0 && 'disabled'}`} value={this.state.strokeWidth} onChange={(ev) => {
                        this.sliderChange(ev)
                    }} />
                </div>
            </div>
        );
    }
}

export default Color;
