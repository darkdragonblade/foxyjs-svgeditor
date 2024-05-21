Element.prototype.getMatrix ||
    (Element.prototype.getMatrix = function () {
        return new DOMMatrix(getComputedStyle(this).transform);
    });
Node.prototype.closest ||
    (Node.prototype.closest = function (t) {
        return this.parentNode ? this.parentNode.closest(t) : null;
    });
export { };
