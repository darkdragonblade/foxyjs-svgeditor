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
    console.log(transform);
    node.setAttribute("transform", transform.toString());
};
const rotate = (t, e, l, r) => {
    const i = DOMMatrix.fromMatrix(ct(t));
    i.multiplySelf(ut(t).inverse());
    i.translateSelf(l, r);
    i.rotateSelf(e);
    i.translateSelf(-l, -r);
    i.multiplySelf(ut(t));
    t.setAttribute("transform", i.toString());
};
const flipX = (t, e) => {
    const l = new DOMMatrix([-1, 0, 0, 1, 2 * e, 0]);
    const r = DOMMatrix.fromMatrix(ct(t));
    r.multiplySelf(ut(t).inverse());
    r.multiplySelf(l);
    r.multiplySelf(ut(t));
    t.setAttribute("transform", r.toString());
};
const flipY = (t, e) => {
    const l = new DOMMatrix([1, 0, 0, -1, 0, 2 * e]);
    const r = DOMMatrix.fromMatrix(ct(t));
    r.multiplySelf(ut(t).inverse());
    r.multiplySelf(l);
    r.multiplySelf(ut(t));
    t.setAttribute("transform", r.toString());
};
const skewX = () => { };
const skewY = () => { };
export { translate, scale, rotate, flipX, flipY, skewX, skewY, ct, ut };
