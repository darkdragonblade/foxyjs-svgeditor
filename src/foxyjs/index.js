import {
    SVGImage,
    SVGForeignObject,
    SVGPath,
    SVGText,
    SVGRect,
    SVGCircle,
    SVGEllipse,
    SVGRing,
    SVGPie,
    SVGCrescent,
    SVGTriangle,
    SVGNGon,
    SVGStar,
    SVGCog,
    SVGCross,
    SVGSpiral,
    SVGLine,
    SVGPolyline,
    SVGPolygon,
} from "./support/graphManager";
import {
    S,
    w,
    os,
    vc,
    ut,
    ct,
    Zi,
    pt,
    ci,
    Yi,
    b,
    lt,
    di,
    hi,
    Dc,
    On,
    Wi,
    Ti,
    $i,
    sleep,
    fs,
    ks
} from "./utils/common";
import bc from "./utils/bs";
import "./dependencies/node-extensions";
import "./dependencies/path-data";
import RubberBand from "./tools/rubberBand";
import TransformTool from "./tools/transformTool";
import TransformSelect from "./tools/transformSelect";
import Layout from "./support/layout";
import TextTool from "./tools/textTool";
import TextHud from "./tools/textHud";
import PanTool from "./tools/panTool";
import FreehandHud from "./tools/freehandHud";
import FreehandTool from "./tools/freehandTool";
import LineTool from './tools/lineTool';
import SplineTool from "./tools/splineTool";
import CubicBezierSegHud from "./tools/cubicBezierSegHud";
import PenTool from "./tools/penTool";
import VektorTool from "./tools/vektor";
import ViewTool from "./tools/viewTool";
import HoverManager from "./support/hoverManager";
import ClipboardManager from "./support/clipboardManager";
import RulerManager from "./support/rulerManager";
import CrosshairHud from "./tools/crosshairHud";
import SnapManager from "./support/snapManager";
import SmartManager from "./support/smartManager";
import GridManager from "./support/gridManager";
import ManualManager from "./support/manualManager";
import RectTool from "./tools/rectTool";
import EllipseTool from "./tools/ellipseTool";
import OtherShapeTool from "./tools/otherShapeTool";
import PathTool from "./tools/pathTool";
import UndoManager from "./support/undoManager";
import ZoomManager from "./support/zoomManager";
import AlignManager from "./support/alignManager";
import GroupManager from "./support/groupManager";
import TransformManager from "./support/transformManager";
import OrderManager from "./support/orderManager";
import TextManager from "./support/textManager";
import ShapeManager from "./support/shapeManager";
import Commands from "./support/commands";
import StyleManager from "./support/styleManager";
import GridGeometryManager from "./support/gridGeometryManager";
import ElementsGeometryManager from "./support/elementsGeometryManager";
import ImportManager from "./support/importManager";
import ExportManager from "./support/exportManager";
class Stage {
    version = "1.2.50";
    #scale = 1;
    #geometryPrecision = 3;
    get geometryPrecision() {
        return this.#geometryPrecision;
    }
    #transformPrecision = 6;
    get transformPrecision() {
        return this.#transformPrecision;
    }
    get scale() {
        return this.#scale;
    }
    #board;
    get board() {
        return this.#board;
    }
    #workspaces;
    get workspaces() {
        return this.#workspaces;
    }
    #currentContainer;
    get currentContainer() {
        return this.#currentContainer;
    }
    set currentContainer(val) {
        this.#currentContainer = val;
        this.board.dispatchEvent(new CustomEvent("currentcontainerchange"));
    }
    #currentTool;
    set currentTool(val) {
        this.#currentTool = val;
        this.board.dispatchEvent(new CustomEvent("currenttoolchange"));
    }
    get currentTool() {
        return this.#currentTool;
    }
    #selectedObjectElements = new Map();
    get selectedObjectElements() {
        return this.#selectedObjectElements;
    }
    #selectedElements = new Map();
    selectedElements = {
        set: (e) => {
            if (!this.#selectedElements.has(e)) {
                this.#selectedElements.set(e, e);
                S.includes(e.localName) && this.#selectedObjectElements.set(e, e);
            }
            this.board.dispatchEvent(new CustomEvent("selectedelementschange"));
        },
        sets: (e) => {
            e.forEach((e) => {
                if ("none" !== getComputedStyle(e).pointerEvents) {
                    this.#selectedElements.set(e, e);
                    S.includes(e.localName) && this.#selectedObjectElements.set(e, e);
                }
            });
            this.board.dispatchEvent(new CustomEvent("selectedelementschange"));
        },
        get: (e) => {
            if (e) return this.#selectedElements.get(e);
            else return this.#selectedElements;
        },
        has: (e) => {
            return this.#selectedElements.has(e);
        },
        delete: (e) => {
            if (!this.#selectedElements.has(e)) return;
            this.#selectedElements.delete(e);
            this.#selectedObjectElements.delete(e);
            this.board.dispatchEvent(new CustomEvent("selectedelementschange"));
        },
        clear: (dispatchEvent = true) => {
            if (this.#selectedElements.size === 0) return;
            this.#selectedElements.clear();
            this.#selectedObjectElements.clear();
            dispatchEvent &&
                this.board.dispatchEvent(new CustomEvent("selectedelementschange"));
        },
        keys: () => {
            return this.#selectedElements.keys();
        },
        length: () => {
            return this.#selectedElements.size;
        },
        get size() {
            return this.length();
        },
    };
    #selectedTextRange;
    get selectedTextRange() {
        return this.#selectedTextRange;
    }
    set selectedTextRange(e) {
        this.#setSelectedTextRange(e);
    }
    #svg;
    get svg() {
        return this.#svg;
    }
    #canvas;
    get canvas() {
        return this.#canvas;
    }
    #htmlPlugins
    get htmlPlugins() {
        return this.#htmlPlugins;
    }
    #currentWorkspace;
    get currentWorkspace() {
        return this.#currentWorkspace;
    }
    #defs;
    get defs() {
        return this.#defs;
    }
    #transformTool;
    get transformTool() {
        return this.#transformTool;
    }
    #transformSelect;
    get transformSelect() {
        return this.#transformSelect;
    }
    #rubberBand;
    get rubberBand() {
        return this.#rubberBand;
    }
    #hoverManager;
    get hoverManager() {
        return this.#hoverManager;
    }
    #zoomManager;
    get zoomManager() {
        return this.#zoomManager;
    }
    #panTool;
    get panTool() {
        return this.#panTool;
    }
    #rectTool;
    get rectTool() {
        return this.#rectTool;
    }
    #ellipseTool;
    get ellipseTool() {
        return this.#ellipseTool;
    }
    #otherShapeTool;
    get otherShapeTool() {
        return this.#otherShapeTool;
    }
    #pathTool;
    get pathTool() {
        return this.#pathTool;
    }
    #undoManager;
    get undoManager() {
        return this.#undoManager;
    }
    #viewTool;
    get viewTool() {
        return this.#viewTool;
    }
    #freehandHud;
    get freehandHud() {
        return this.#freehandHud;
    }
    #freehandTool;
    get freehandTool() {
        return this.#freehandTool;
    }
    #lineTool;
    get lineTool() {
        return this.#lineTool;
    }
    #splineTool;
    get splineTool() {
        return this.#splineTool;
    }
    #cubicBezierSegHud;
    get cubicBezierSegHud() {
        return this.#cubicBezierSegHud;
    }
    #penTool;
    get penTool() {
        return this.#penTool;
    }
    #vektorTool;
    get VektorTool() {
        return this.#vektorTool;
    }
    #crosshairHud;
    get crosshairHud() {
        return this.#crosshairHud;
    }
    #textHud;
    get textHud() {
        return this.#textHud;
    }
    #textTool;
    get textTool() {
        return this.#textTool;
    }
    #clipboardManager;
    get clipboardManager() {
        return this.#clipboardManager;
    }
    #manualManager;
    get manualManager() {
        return this.#manualManager;
    }
    #smartManager;
    get smartManager() {
        return this.#smartManager;
    }
    #gridManager;
    get gridManager() {
        return this.#gridManager;
    }
    #rulerManager;
    get rulerManager() {
        return this.#rulerManager;
    }
    #snapManager;
    get snapManager() {
        return this.#snapManager;
    }
    #alignManager;
    get alignManager() {
        return this.#alignManager;
    }
    #groupManager;
    get groupManager() {
        return this.#groupManager;
    }
    #transformManager;
    get transformManager() {
        return this.#transformManager;
    }
    #orderManager;
    get orderManager() {
        return this.#orderManager;
    }
    #textManager;
    get textManager() {
        return this.#textManager;
    }
    #shapeManager;
    get shapeManager() {
        return this.#shapeManager;
    }
    #commands;
    get commands() {
        return this.#commands;
    }
    #styleManager;
    get styleManager() {
        return this.#styleManager;
    }
    #gridGeometryManager;
    get gridGeometryManager() {
        return this.#gridGeometryManager;
    }
    #elementsGeometryManager;
    get elementsGeometryManager() {
        return this.#elementsGeometryManager;
    }
    #importManager;
    get importManager() {
        return this.#importManager;
    }
    #exportManager;
    get exportManager() {
        return this.#exportManager;
    }
    #pointerClickCount = 0;
    get pointerClickCount() {
        return this.#pointerClickCount;
    }
    #pointerClientPoint = new DOMPoint(0, 0);
    get pointerClientPoint() {
        return this.#pointerClientPoint;
    }
    #modkeys = { shift: false, ctrl: false, alt: false };
    get modkeys() {
        return this.#modkeys;
    }
    set modkeys(val) {
        this.#modkeys = val;
        this.#board.dispatchEvent(new CustomEvent("modkeyschange"));
    }
    shiftKey = false;
    ctrlKey = false;
    altKey = false;
    #keyMap = {
        shiftKey: 'shiftKey',
        ctrlKey: 'ctrlKey',
        altKey: 'altKey'
    };
    #textInputMode = false;
    get textInputMode() {
        return this.#textInputMode;
    }
    #PM = [];
    timer;
    constructor(
        board,
        options = {
            manualGuides: false,
            showRulers: false,
            smartGuides: false,
            showGrid: false,
            crosshair: false,
        }
    ) {
        if (!board) throw new Error("set container please.");
        this.#board = board;
        board.style.setProperty("user-select", "none");
        board.style.setProperty("position", "relative");
        board.style.setProperty("background", "var(--fx-board-background)");
        this.#svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.#svg.setAttribute("foxyjs", this.version);
        this.#svg.innerHTML = Layout.stage({
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 20,
            f: 20,
        });
        board.append(this.#svg);
        this.#workspaces = document.querySelector("#workspaces");
        this.#currentWorkspace = document.querySelector('[uid="foxy-workspace"]');
        this.#canvas = document.querySelector('[uid="canvas"]');
        this.#htmlPlugins = document.querySelector('[uid="htmlPlugins"]');
        this.#defs = this.svg.querySelector("defs");
        this.#currentContainer = this.currentWorkspace;
        this.#clipboardManager = new ClipboardManager(this);
        this.#undoManager = new UndoManager(this);
        this.#rulerManager = new RulerManager(this);
        this.#crosshairHud = new CrosshairHud(this);
        this.#manualManager = new ManualManager(this);
        this.#smartManager = new SmartManager(this);
        this.#gridManager = new GridManager(this);
        this.#styleManager = new StyleManager(this);
        this.#gridGeometryManager = new GridGeometryManager(this);
        this.#elementsGeometryManager = new ElementsGeometryManager(this);
        this.#importManager = new ImportManager(this);
        this.#exportManager = new ExportManager(this);
        this.resize = ks(this.setSvgWidthHeight, 20, this);
        this.resize();
        window.addEventListener("pointerdown", this.#pointerdown, !0);
        window.addEventListener("pointermove", this.#pointermove);
        window.addEventListener("pointerup", this.#pointerup);
        window.addEventListener("resize", this.resize);
        options.smartGuides && this.#smartManager.enable();
        options.manualGuides && this.#manualManager.enable();
        options.showGrid && this.#gridManager.enable();
        options.showRulers && this.#rulerManager.enable();
        options.crosshair && this.#crosshairHud.enable();
        this.#snapManager = new SnapManager(this);
        this.#zoomManager = new ZoomManager(this);
        this.#zoomManager.enable();
        this.#hoverManager = new HoverManager(this);
        this.#transformSelect = new TransformSelect(this);
        this.#transformTool = new TransformTool(this);
        this.#rubberBand = new RubberBand();
        this.#panTool = new PanTool(this);
        this.#rectTool = new RectTool(this);
        this.#ellipseTool = new EllipseTool(this);
        this.#otherShapeTool = new OtherShapeTool(this);
        this.#pathTool = new PathTool(this);
        this.#textTool = new TextTool(this);
        this.#textHud = new TextHud(this);
        this.#viewTool = new ViewTool(this);
        this.#alignManager = new AlignManager(this);
        this.#groupManager = new GroupManager(this);
        this.#transformManager = new TransformManager(this);
        this.#orderManager = new OrderManager(this);
        this.#textManager = new TextManager(this);
        this.#shapeManager = new ShapeManager(this);
        this.#commands = new Commands(this);
        this.#splineTool = new SplineTool(this);
        this.#lineTool = new LineTool(this);
        this.#freehandHud = new FreehandHud(this);
        this.#freehandTool = new FreehandTool(this);
        this.#cubicBezierSegHud = new CubicBezierSegHud(this);
        this.#penTool = new PenTool(this);
        this.#vektorTool = new VektorTool(this);
        this.#createdObserver();
    }
    toggleTool = (toolType) => {
        if (!toolType || this.currentTool === toolType) return;
        this.#transformSelect.disable();
        this.#transformTool.disable();
        this.#hoverManager.disable();
        this.#textTool.disable();
        this.#panTool.disable();
        this.#rectTool.disable();
        this.#ellipseTool.disable();
        this.#otherShapeTool.disable();
        this.#pathTool.disable();
        this.#textHud.disable();
        this.#freehandTool.disable();
        this.#splineTool.disable();
        this.#lineTool.disable();
        this.#penTool.disable();
        this.#vektorTool.disable();
        switch (toolType) {
            case "transform-tool":
                this.#transformSelect.enable();
                this.#transformTool.enable();
                this.#hoverManager.enable();
                this.#hoverManager.context = "transform";
                break;
            case "edit-tool":
                this.#hoverManager.context = "edit";
                break;
            case "pan-tool":
                this.#panTool.enable();
                break;
            case "freehand-tool":
                this.#freehandTool.enable();
                this.#splineTool.enable();
                break;
            case "line-tool":
                this.#lineTool.enable();
                break;
            case "pen-tool":
                this.#penTool.enable();
                this.#splineTool.enable();
                break;
            case "rect-tool":
                this.#rectTool.enable();
                break;
            case "ellipse-tool":
                this.#ellipseTool.enable();
                break;
            case "text-tool":
                this.#textTool.enable();
                this.#textHud.enable();
                this.#hoverManager.enable();
                this.#hoverManager.context = "edit-text";
                break;
            case "line-tool":
                break;
            case "triangle-tool":
                this.#otherShapeTool.useType("triangle");
                this.#otherShapeTool.enable();
                break;
            case "n-gon-tool":
                this.#otherShapeTool.useType("n-gon");
                this.#otherShapeTool.enable();
                break;
            case "star-tool":
                this.#otherShapeTool.useType("star");
                this.#otherShapeTool.enable();
                break;
            case "cross-tool":
                this.#otherShapeTool.useType("cross");
                this.#otherShapeTool.enable();
                break;
            case "frame-tool":
                this.#otherShapeTool.useType("frame");
                this.#otherShapeTool.enable();
                break;
            case "ring-tool":
                this.#otherShapeTool.useType("ring");
                this.#otherShapeTool.enable();
                break;
            case "pie-tool":
                this.#otherShapeTool.useType("pie");
                this.#otherShapeTool.enable();
                break;
            case "crescent-tool":
                this.#otherShapeTool.useType("crescent");
                this.#otherShapeTool.enable();
                break;
            case "cog-tool":
                this.#otherShapeTool.useType("cog");
                this.#otherShapeTool.enable();
                break;
            case "spiral-tool":
                this.#otherShapeTool.useType("spiral");
                this.#otherShapeTool.enable();
                break;
            case "arrow-tool":
                this.#otherShapeTool.useType("arrow");
                this.#otherShapeTool.enable();
                break;
            case "path-tool":
                this.#pathTool.enable();
                break;
            case "vektor-tool":
                this.#vektorTool.enable();
                break;
            case "view-tool":
                this.#viewTool.enable();
                break;
            default:
        }
        this.currentTool = toolType;
    };
    setSvgWidthHeight = () => {
        const width = this.#board.clientWidth || window.innerWidth;
        const height = this.#board.clientHeight || window.innerHeight;
        this.#svg.setAttribute("width", width.toString());
        this.#svg.setAttribute("height", height.toString());
        this.#svg.setAttribute("viewBox", `0  0 ${width} ${height}`);
    }
    #createdObserver = () => {
        new MutationObserver((e) => this.#workspacemutation(e)).observe(
            this.workspaces,
            {
                attributeOldValue: false,
                attributes: true,
                characterData: true,
                characterDataOldValue: false,
                childList: true,
                subtree: true,
            }
        );
        new MutationObserver(() => this.#zoomChange()).observe(this.canvas, {
            attributes: true,
            attributeFilter: ["transform"],
        });
        this.#textInputModeChange();
    };
    #workspacemutation = (e) => {
        this.board.dispatchEvent(
            new CustomEvent("workspacemutation", { detail: e })
        );
        const t = "disabled";
        let r = !1;
        let a = !1;
        let o = !1;
        let s = !1;
        for (let t of e)
            if (t.target === this.workspaces) "childList" === t.type && (r = !0);
            else {
                if ("defs" === t.target.localName) {
                    if (t.removedNodes.length > 0) {
                        "view" === t.removedNodes[0].localName && (o = !0);
                        for (let e of t.removedNodes)
                            if (e.hasAttribute?.("data-bx-fonts")) {
                                a = !0;
                                break;
                            }
                    } else {
                        if (t.addedNodes.length > 0) {
                            "view" === t.addedNodes[0].localName && (o = !0);
                            for (let e of t.addedNodes)
                                if (e.hasAttribute?.("data-bx-fonts")) {
                                    a = !0;
                                    break;
                                }
                        }
                    }
                }
            }
        if (r) {
            this.board.dispatchEvent(new CustomEvent("currentworkspacechange"));
        }
    };
    #textInputModeChange = () => {
        this.#textHud.hud.addEventListener("textinputmodestart", () => {
            this.#textInputMode = true;
        });
        this.#textHud.hud.addEventListener("textinputmodeend", () => {
            this.#textInputMode = false;
        });
    };
    #zoomChange = () => {
        this.#scale = this.canvas.getMatrix().a;
        this.board.dispatchEvent(new CustomEvent("zoomchange"));
    };
    #setSelectedTextRange = (range) => {
        (null === this.#selectedTextRange && null === range) ||
            (this.#selectedTextRange &&
                range &&
                this.#selectedTextRange.startContainer === range.startContainer &&
                this.#selectedTextRange.endContainer === range.endContainer &&
                this.#selectedTextRange.startOffset === range.startOffset &&
                this.#selectedTextRange.endOffset === range.endOffset) ||
            ((this.#selectedTextRange = range),
                this.#board.dispatchEvent(new CustomEvent("selectedtextrangechange")));
    };
    setKeys = (shiftKey, ctrlKey, altKey) => {
        this.shiftKey = shiftKey;
        this.ctrlKey = ctrlKey;
        this.altKey = altKey;
    };
    #pointerdown = (event) => {
        const { shiftKey, ctrlKey, altKey, clientX, clientY } = event;
        // this.modkeys.shift = shiftKey;

        this.setKeys(shiftKey, ctrlKey, altKey);

        this.#pointerClientPoint = new DOMPoint(clientX, clientY);
        {
            let t = 1;
            let r = null;
            for (this.#PM.push(event); this.#PM.length > 8;) {
                this.#PM.shift();
            }
            for (let e of this.#PM) {
                if (r) {
                    if ("pen" === e.pointerType || "touch" === e.pointerType) {
                        const n = "touch" === e.pointerType ? 9 : 3;
                        Math.sqrt(
                            Math.pow(e.clientX - r.clientX, 2) +
                            Math.pow(e.clientY - r.clientY, 2)
                        ) < n && e.timeStamp - r.timeStamp < 600
                            ? (t += 1)
                            : (t = 1);
                    } else
                        e.clientX === r.clientX &&
                            e.clientY === r.clientY &&
                            e.timeStamp - r.timeStamp < 600
                            ? (t += 1)
                            : (t = 1);
                }
                r = e;
            }
            this.#pointerClickCount = t;
        }
    };
    #pointermove = ($event) => {
        const { shiftKey, ctrlKey, altKey, clientX, clientY } = $event;
        this.setKeys(shiftKey, ctrlKey, altKey);
        this.#pointerClientPoint = new DOMPoint(clientX, clientY);
    };
    #pointerup = ($event) => {
        const { shiftKey, ctrlKey, altKey, clientX, clientY } = $event;
        this.setKeys(shiftKey, ctrlKey, altKey);
        this.#pointerClientPoint = new DOMPoint(clientX, clientY);
    };
    getHitWorkspaceElements = (a, o) => {
        const s = [];
        for (let [e, r] of vc) {
            let t = document.elementFromPoint(a + e, o + r);
            if (t) {
                if ("tspan" === t.localName || "textPath" === t.localName)
                    t = t.closest("text");
                else {
                    if ("a" === t.localName) {
                        let e = t.closest("text");
                        e && (t = e);
                    }
                }
                !s.includes(t) && this.currentWorkspace.contains(t) && s.push(t);
            }
        }
        return os(s);
    };
    scrollBy = (x = 0, y = 0) => {
        const r = new DOMMatrix();
        r.translateSelf(x, y);
        r.multiplySelf(ct(this.canvas));
        this.canvas.setAttribute("transform", r.toString());
    };
    insertBitmap = async (href, t = "boardCenter") => {
        const { width, height } = await On(href);
        const o = Zi("svg:image");
        o.setAttribute("href", href);
        o.setAttribute("width", width);
        o.setAttribute("height", height);
        let s;
        let n = this.currentContainer || this.currentWorkspace;
        let i = ut(n).inverse();
        if ("boardCenter" === t) {
            let e = this.board.getBoundingClientRect();
            s = new DOMPoint(e.left + e.width / 2, e.top + e.height / 2);
        } else "pointer" === t && (s = this.pointerClientPoint);
        let l = s.matrixTransform(i);
        n.append(o);
        let h = Wi(o);
        o.setAttribute("x", (l["x"] - h.width / 2).toString());
        o.setAttribute("y", (l["y"] - h.height / 2).toString());
        this.selectedElements.clear();
        this.selectedElements.set(o);
    };
    insertArtwork = (t, a = "boardCenter") => {

        let o = this.currentContainer || this.currentWorkspace;
        let n = [];
        let e = this.extractArtwork();
        Dc(t, e);
        for (let e of t.style)
            "shape-rendering" === e &&
                o.style.setProperty(e, t.style.getPropertyValue(e));
        for (let a of [...t.children])
            if ("defs" === a.localName) {
                for (let t of [...a.children])
                    if ("style" === t.localName && t.hasAttribute("data-bx-fonts")) {
                        let e = t.getAttribute("data-bx-fonts");
                    } else {
                    }
            } else {
                if (b.includes(a.localName)) {
                    let e = pt(o, this.currentWorkspace);
                    let t = ct(a);
                    let r = new DOMMatrix();
                    r.multiplySelf(e.inverse());
                    r.multiplySelf(t);
                    r = lt(r, 6);
                    r.isIdentity
                        ? a.removeAttribute("transform")
                        : a.setAttribute("transform", r.toString());
                    o.append(a);
                    n.push(a);
                } else o.append(a);
            }
        if ("original" !== a) {
            let e = n.map((e) => Yi(e));
            e = e.filter((e) => e.width > 0 || e.height > 0);
            let t,
                r = ci(e);
            if ("boardCenter" === a) {
                let e = this.board.getBoundingClientRect();
                t = new DOMPoint(e.left + e.width / 2, e.top + e.height / 2);
            } else
                t =
                    "belowOriginal" === a
                        ? new DOMPoint(r.x + r.width / 2 + 15, r.y + r.height / 2 + 15)
                        : this.pointerClientPoint;
            let o = t.x - (r.x + r.width / 2);
            let s = t.y - (r.y + r.height / 2);
            for (let a of n) {
                let e = ut(a);
                let t = e.inverse();
                let r = ct(a);
                r.multiplySelf(t);
                r.translateSelf(o, s);
                r.multiplySelf(e);
                r = lt(r, this.transformPrecision);
                a.setAttribute("transform", r.toString());
            }
        }
        this.selectedElements.clear();
        n.forEach((e) => {
            this.selectedElements.set(e);
        });
    };
    extractArtwork = () => {
        const o = Zi("svg:svg");
        const r = this.#currentWorkspace;
        for (let { name: e, value: t } of r.attributes)
            "data-bx-workspace" !== e &&
                ("data-bx-transform" === e
                    ? o.setAttribute("transform", t)
                    : o.setAttribute(e, t));
        for (let e of r.childNodes) o.append(e.cloneNode(!0));
        if ("symbol" === this.currentWorkspace.getAttribute("data-bx-workspace")) {
            let r = this.currentWorkspace;
            let a = o.querySelector("symbol#" + CSS.escape(r["id"]));
            for (let { name: e, value: t } of a.attributes)
                !1 === r.hasAttribute(e) && a.removeAttribute(e);
            for (let { name: e, value: t } of r.attributes)
                "data-bx-workspace" !== e && a.setAttribute(e, t);
            a.innerHTML = r.innerHTML;
        }
        if ("pattern" === this.currentWorkspace.getAttribute("data-bx-workspace")) {
            let r = this.currentWorkspace;
            let a = o.querySelector("pattern#" + CSS.escape(r["id"]));
            for (let { name: e, value: t } of a.attributes)
                !1 === r.hasAttribute(e) && a.removeAttribute(e);
            for (let { name: e, value: t } of r.attributes)
                "data-bx-workspace" !== e && a.setAttribute(e, t);
            a.innerHTML = r.innerHTML;
        }
        if ("marker" === this.currentWorkspace.getAttribute("data-bx-workspace")) {
            let r = this.currentWorkspace;
            let a = o.querySelector("marker#" + CSS.escape(r["id"]));
            for (let { name: e, value: t } of a.attributes)
                !1 === r.hasAttribute(e) && a.removeAttribute(e);
            for (let { name: e, value: t } of r.attributes)
                "data-bx-workspace" !== e && a.setAttribute(e, t);
            a.innerHTML = r.innerHTML;
        }
        return o;
    };
    extractArtworkWithSelectedElements = (e = [0, 0, 0, 0]) => {
        return this.extractArtworkWithElements(
            Array.from(this.#selectedElements.keys()),
            e
        );
    };
    extractArtworkWithElements = (a, e = [0, 0, 0, 0]) => {
        a = os(a);
        let r = this.#qi(a);
        let o = [];
        for (let t of r) {
            let e = this.currentWorkspace.querySelector("#" + CSS.escape(t));
            e || (e = this.currentWorkspace.querySelector("#" + CSS.escape(t)));
            e && o.push(e);
        }
        o = o.filter((t) => {
            for (let e of a) if (e.contains(t) || e === t) return !1;
            for (let e of o) if (e.contains(t) && e !== t) return !1;
            return !0;
        });
        const s = Zi("svg:svg");
        const t = Zi("svg:defs");
        s.append(t);
        for (let e of o)
            e.closest("defs") ? t.append(e.cloneNode(!0)) : s.append(e.cloneNode(!0));
        for (let r of a) {
            let e = r.cloneNode(!0);
            let t = pt(r, this.currentWorkspace);
            t = lt(t, this.transformPrecision);
            t.isIdentity
                ? e.removeAttribute("transform")
                : e.setAttribute("transform", t.toString());
            s.append(e);
        }
        for (let e of this.#workspaces.querySelectorAll("style"))
            t.append(e.cloneNode(!0));
        0 === t.childElementCount && t.remove();
        let n = a.map((e) => Yi(e));
        let i = ci(n);
        i = di(i, ut(this.currentWorkspace).inverse());
        i = hi(i, 3);
        let [l, h, c, p] = e;
        let d = i.x - p;
        let u = i.y - l;
        let g = i.width + p + h;
        let m = i.height + l + c;
        s.setAttribute("viewBox", d + " " + u + " " + g + " " + m);
        s.setAttribute("width", g.toString());
        s.setAttribute("height", m.toString());
        return s;
    };
    #qi(e) {
        e = os(e);
        let r = new Set();
        for (let t of e) for (let e of this.#Xi(t)) r.add(e);
        return [...r];
    }
    #Xi(e) {
        let o = new Set();
        const s = [
            "fill",
            "stroke",
            "filter",
            "clip-path",
            "mask",
            "marker-mid",
            "marker-start",
            "marker-end",
        ];
        let n = (e) => {
            let t = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT);
            let r = null;
            for (; (r = t.nextNode());) {
                let a = getComputedStyle(r);
                for (let e of s) {
                    let t = a.getPropertyValue(e);
                    let r = new Set();
                    if ("filter" === e) {
                        if ("none" !== t) {
                        }
                    } else {
                        if (t?.startsWith('url("#')) {
                            let e = t.substring(6, t.length - 2);
                            r.add(e);
                        }
                    }
                    for (let t of r)
                        if (!1 === o.has(t)) {
                            o.add(t);
                            let e = this.currentWorkspace.querySelector("#" + CSS.escape(t));
                            e ||
                                (e = this.currentWorkspace.querySelector("#" + CSS.escape(t)));
                            e && n(e);
                        }
                }
                if ("#" === r.href?.baseVal?.[0]) {
                    let t = r.href.baseVal.substring(1, r.href.baseVal.length);
                    if (!1 === o.has(t)) {
                        o.add(t);
                        let e = this.currentWorkspace.querySelector("#" + CSS.escape(t));
                        e || (e = this.currentWorkspace.querySelector("#" + CSS.escape(t)));
                        e && n(e);
                    }
                }
            }
        };
        n(e);
        return [...o];
    }
    isSelectableElement = (el) => {
        return (
            !1 !== b.includes(el.localName) &&
            el.parentElement !== this.#workspaces &&
            !1 !== this.currentWorkspace.contains(el) &&
            !el.closest("defs") &&
            (!el.closest("text") || "text" === el.localName)
        );
    };
    add = (el) => {
        const container = this.#currentContainer || this.#currentWorkspace;
        container.append(el);
    };
    generateUniqueID = (r, a = null, e = 0) => {
        for (let t = e; t < Infinity; t += 1) {
            let e = r + t;
            if (!this.#workspaces.querySelector("#" + CSS.escape(e))) {
                if (!a) return e;
                if (!a.querySelector("#" + CSS.escape(e))) return e;
            }
        }
    };
    maybeCreateGridForCurrentWorkspace = () => {
        let defs = this.workspaces.querySelector("defs");
        if (!defs) {
            defs = fs`<defs></defs>`;
            this.workspaces.append(defs);
        }
        let foxyGrid = defs.querySelector("foxy-grid");
        if (!foxyGrid) {
            foxyGrid = fs`<foxy-grid x="0" y="0" width="100" height="100"></foxy-grid>`;
            defs.append(foxyGrid);
        }
        return foxyGrid;
    };
    reload = () => {
        this.undoManager.clear();
    }
    uninstall = () => {
        this.#board.innerHTML = "";
        window.removeEventListener("pointerdown", this.#pointerdown, true);
        window.removeEventListener("pointermove", this.#pointermove);
        window.removeEventListener("pointerup", this.#pointerup);
        window.removeEventListener("resize", this.resize);
    }
}
export {
    Stage,
    SVGImage,
    SVGForeignObject,
    SVGPath,
    SVGText,
    SVGRect,
    SVGCircle,
    SVGEllipse,
    SVGRing,
    SVGPie,
    SVGCrescent,
    SVGTriangle,
    SVGNGon,
    SVGStar,
    SVGCog,
    SVGCross,
    SVGSpiral,
    SVGLine,
    SVGPolyline,
    SVGPolygon,
};
