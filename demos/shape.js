import {
    Stage,
    SVGRect,
    SVGCircle,
    SVGEllipse,
    SVGRing,
    SVGText,
    SVGStar,
    SVGImage,
} from "foxyjs";
const container = document.querySelector("#container");
const stage = new Stage(container);

const rect = new SVGRect({
    x: 90,
    y: 90,
    width: 100,
    height: 100,
    fill: "red",
    stroke: "#000000",
    strokeWidth: 2,
});

const circle = new SVGCircle({
    cx: 180,
    cy: 180,
    r: 50,
    fill: "purple",
    stroke: "#000000",
    strokeWidth: 2,
});

const ellipse = new SVGEllipse({
    cx: 100,
    cy: 370,
    rx: 100,
    ry: 50,
    fill: "pink",
    stroke: "#000000",
    strokeWidth: 2,
});

const ring = new SVGRing({
    x: 339,
    y: 99,
    outerRx: 70,
    outerRy: 70,
    innerRx: 30,
    innerRy: 30,
    fill: "blue",
    stroke: "#000000",
    strokeWidth: 2,
});

const star = new SVGStar({
    x: 250,
    y: 250,
    rx: 50,
    ry: 50,
    fill: "yellow",
    stroke: "#000000",
    strokeWidth: 2,
});

const star2 = new SVGStar({
    x: 260,
    y: 350,
    rx: 50,
    ry: 50,
    arms: 12,
    depth: 0.8,
    fill: "yellow",
    stroke: "#000000",
    strokeWidth: 2,
});

const text = new SVGText({
    x: 300,
    y: 250,
    fontSize: "28px",
    fontFamily: "Arial",
    textContent: "hello foxyjs",
    fill: "#000000",
});

stage.addGraph(rect);
stage.addGraph(circle);
stage.addGraph(ellipse);
stage.addGraph(ring);
stage.addGraph(star);
stage.addGraph(star2);
stage.addGraph(text);
setTimeout(() => {
    const image = new SVGImage({
        x: 400,
        y: 400,
        width: 150,
        height: 150,
        href: "https://darkdragonblade.github.io/foxyjs-svgeditor/static/test.jpg",
    });
    stage.addGraph(image);
}, 100);
