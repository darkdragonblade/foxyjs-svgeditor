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
            strokeWidth: 0,
            type: 1,
        };
    }

    colorChange(color) {
        const stage = window.stage;
        if (this.state.type === 1) {
            this.setState({
                fill: color,
            });
            stage.setStyle({
                fill: color,
            });
        } else {
            this.setState({
                stroke: color,
            });
            stage.setStyle({
                stroke: color,
            });
        }
    }

    sliderChange(strokeWidth) {
        const stage = window.stage;
        this.setState({
            strokeWidth
        });
        stage.setStyle({
            strokeWidth,
        });
    }

    typeChange(type) {
        this.setState({
            type
        });
        this.getStyle(type);
    }

    colorRgbToHex(orig) {
        var a;
        var isPercent;
        var rgb = orig
            .replace(/\s/g, "")
            .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
        var alpha = ((rgb && rgb[4]) || "").trim();
        var hex = rgb
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

    componentDidMount() {
        const stage = window.stage;
        stage.board.addEventListener(
            "selectedelementschange",
            (ev = () => {
                this.getStyle(this.state.type);
            })
        );
    }

    componentWillUnmount() {
        const stage = window.stage;
        stage.board.removeEventListener("selectedelementschange", ev);
    }

    render() {
        return (
            <div className="color">
                <h3>Color</h3>
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
                        className="picker"
                        color={this.state.color}
                        onChange={(ev) => {
                            this.colorChange(ev);
                        }}
                    />
                </div>
                <h3>Stroke Width</h3>
                <div className="item">
                    <Slider className="slider" value={this.state.strokeWidth} onChange={(ev) => {
                        this.sliderChange(ev)
                    }} />
                </div>
            </div>
        );
    }
}

export default Color;
