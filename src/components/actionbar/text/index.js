import React from "react";
import "./index.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
let ev;
class Font extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            fontFamily: '',
            disFontFamily: true,
            fontSize: 13,
            disFontSize: true,
            isBold: true,
            disBold: true,
            isItalic: true,
            disItalic: true,
            isUnderline: true,
            disUnderline: true,
            isLineThrough: true,
            disLineThrough: true,
            isOverline: true,
            disOverline: true,
            anchor: '',
            disAnchor: true,
            letterSpacing: 0,
            disLetterSpacing: true,
            wordSpacing: 0,
            disWordSpacing: true,
            lineSpacing: 0,
            disLineSpacing: true,
        };
    }

    bold = () => {
        const stage = window.stage;
        stage.textManager.bold();
        this.queryTextInfo();
    }

    italic = () => {
        const stage = window.stage;
        stage.textManager.italic();
        this.queryTextInfo();
    }

    underline = () => {
        const stage = window.stage;
        stage.textManager.underline();
        this.queryTextInfo();
    }

    lineThrough = () => {
        const stage = window.stage;
        stage.textManager.lineThrough();
        this.queryTextInfo();
    }

    overline = () => {
        const stage = window.stage;
        stage.textManager.overline();
        this.queryTextInfo();
    }

    anchor = (anchor) => {
        const stage = window.stage;
        stage.textManager.anchor(anchor);
        this.queryTextInfo();
    }

    letterSpacing = (value) => {
        const stage = window.stage;
        stage.textManager.letterSpacing(value);
        this.queryTextInfo();
    }

    wordSpacing = (value) => {
        const stage = window.stage;
        stage.textManager.wordSpacing(value);
        this.queryTextInfo();
    }

    lineSpacing = (value) => {
        const stage = window.stage;
        stage.textManager.lineSpacing(value);
        this.queryTextInfo();
    }

    fontSize = (value) => {
        const stage = window.stage;
        stage.textManager.fontSize(value);
        this.queryTextInfo();
    }

    queryTextInfo = async () => {
        const stage = window.stage;
        this.setState(await stage.textManager.queryTextInfo());
    }

    fontFamily(f) {
        const stage = window.stage;
        Array.from(stage.selectedObjectElements.keys()).forEach((node) => {
            if (node.localName === "text") {
                node.style.fontFamily = f.family;
            } else {
                node.querySelectorAll("text").forEach((node) => {
                    node.style.fontFamily = f.family;
                });
            }
        });

        this.setState({
            fontFamily: f.family
        });
    }


    changeType(type) {
        this.setState({
            type,
        });
    }

    async queryLocalFonts() {
        const res = await window.queryLocalFonts();
        const fs = [];
        const options = [];
        res.forEach((f) => {
            if (!fs.includes(f.family)) {
                fs.push(f.family);
                options.push(f);
                f.value = f.family;
                f.label = f.family;
            }
        });
        this.setState({
            options,
        });
    }

    async componentDidMount() {
        this.queryLocalFonts();
        this.queryTextInfo();
        const stage = window.stage;
        stage.board.addEventListener(
            "selectedelementschange",
            (ev = () => {
                this.queryTextInfo();
            })
        );
    }

    componentWillUnmount() {
        const stage = window.stage;
        stage.board.removeEventListener("selectedelementschange", ev);
    }

    render() {
        return (
            <div className="font">
                {/* <h5>Family</h5>
                <div className="items">
                    <Select
                        className={`select ${!this.state.isSelectedText && "disabled"}`}
                        value={this.state.fontFamily}
                        options={this.state.options}
                        onChange={(ev) => {
                            this.fontFamily(ev);
                        }}
                    />
                </div> */}
                <h5>Face</h5>
                <div className="items">
                    <div className={`item ${this.state.disBold && "disabled"} ${this.state.isBold && 'active'}`} onClick={() => {
                        this.bold();
                    }}>
                        Bold
                    </div>
                    <div className={`item ${this.state.disItalic && "disabled"} ${this.state.isItalic && 'active'}`} onClick={() => {
                        this.italic();
                    }}>
                        Italic
                    </div>
                </div>
                <h5>size</h5>
                <div
                    className={`slider-wrapper ${this.state.disFontSize && "disabled"
                        }`}
                >
                    <Slider
                        className="slider"
                        min={13}
                        max={100}
                        value={this.state.fontSize}
                        onChange={(value) => {
                            this.fontSize(value);
                        }}
                    />
                </div>
                <h5>decoration</h5>
                <div className="items">
                    <div className={`item ${this.state.disUnderline && "disabled"} ${this.state.isUnderline && "active"}`} onClick={() => {
                        this.underline();
                    }}>
                        Underline
                    </div>
                    <div className={`item ${this.state.disLineThrough && "disabled"} ${this.state.isLineThrough && "active"}`} onClick={() => {
                        this.lineThrough();
                    }}>
                        Line-Through
                    </div>
                    <div className={`item ${this.state.disOverline && "disabled"} ${this.state.isOverline && "active"}`} onClick={() => {
                        this.overline();
                    }}>
                        Overline
                    </div>
                </div>
                <h5>Anchor</h5>
                <div className="items">
                    <div className={`item ${this.state.disAnchor && "disabled"} ${this.state.anchor === 'start' && "active"}`} onClick={() => {
                        this.anchor('start');
                    }}>
                        Start
                    </div>
                    <div className={`item ${this.state.disAnchor && "disabled"} ${this.state.anchor === 'middle' && "active"}`} onClick={() => {
                        this.anchor('middle');
                    }}>
                        Middle
                    </div>
                    <div className={`item ${this.state.disAnchor && "disabled"} ${this.state.anchor === 'end' && "active"}`} onClick={() => {
                        this.anchor('end');
                    }}>
                        End
                    </div>
                </div>
                <h5>Letter</h5>
                <div className="slider-wrapper">
                    <Slider
                        min={-10}
                        max={10}
                        value={this.state.letterSpacing}
                        onChange={(ev) => {
                            this.letterSpacing(ev);
                        }}
                        className={`slider ${this.state.disLetterSpacing && "disabled"}`}
                    />
                </div>
                <h5>Word</h5>
                <div className="slider-wrapper">
                    <Slider
                        min={-100}
                        max={100}
                        value={this.state.wordSpacing}
                        onChange={(ev) => {
                            this.wordSpacing(ev);
                        }}
                        className={`slider ${this.state.disWordSpacing && "disabled"}`}
                    />
                </div>
                <h5>Line</h5>
                <div className="slider-wrapper">
                    <Slider
                        min={-10}
                        max={10}
                        value={this.state.lineSpacing}
                        onChange={(ev) => {
                            this.lineSpacing(ev);
                        }}
                        className={`slider ${this.state.disLineSpacing && "disabled"}`}
                    />
                </div>
            </div >
        );
    }
}

export default Font;
