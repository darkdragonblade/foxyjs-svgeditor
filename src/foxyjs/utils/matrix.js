import { ut, ct } from "./common";
const translate = (node, x, y) => {
    const transform = DOMMatrix.fromMatrix(ct(node));
    transform.multiplySelf(ut(node).inverse());
    transform.translateSelf(x, y);
    transform.multiplySelf(ut(node));
    node.setAttribute("transform", transform.toString());
};
const scale = (node, scaleX, scaleY, x, y) => {
    const transform = DOMMatrix.fromMatrix(ct(node));
    transform.multiplySelf(ut(node).inverse());
    transform.translateSelf(x, y);
    transform.scaleSelf(scaleX, scaleY);
    transform.translateSelf(-x, -y);
    transform.multiplySelf(ut(node));
    node.setAttribute("transform", transform.toString());
};
const rotate = (node, angle, x, y) => {
    const transform = DOMMatrix.fromMatrix(ct(t));
    transform.multiplySelf(ut(node).inverse());
    transform.translateSelf(x, y);
    transform.rotateSelf(angle);
    transform.translateSelf(-x, -y);
    transform.multiplySelf(ut(node));
    node.setAttribute("transform", transform.toString());
};
const flipX = (node, val) => {
    const l = new DOMMatrix([-1, 0, 0, 1, 2 * val, 0]);
    const transform = DOMMatrix.fromMatrix(ct(node));
    transform.multiplySelf(ut(node).inverse());
    transform.multiplySelf(l);
    transform.multiplySelf(ut(node));
    node.setAttribute("transform", transform.toString());
};
const flipY = (node, val) => {
    const l = new DOMMatrix([1, 0, 0, -1, 0, 2 * val]);
    const transform = DOMMatrix.fromMatrix(ct(node));
    transform.multiplySelf(ut(node).inverse());
    transform.multiplySelf(l);
    transform.multiplySelf(ut(node));
    node.setAttribute("transform", transform.toString());
};
const skewX = () => { };
const skewY = () => { };
export { translate, scale, rotate, flipX, flipY, skewX, skewY, ct, ut };
