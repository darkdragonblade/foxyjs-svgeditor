
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
} from "./types/graphManager";
import AlignManager from "./types/alignManager";
import ClipboardManager from './types/clipboardManager';
import Commands from "./types/commands";
import ElementsGeometryManager from "./types/elementsGeometryManager";
import ExportManager from "./types/exportManager";
import OrderManager from "./types/orderManager";
import GroupManager from "./types/groupManager";
import ImportManager from "./types/importManager";
import StyleManager from "./types/styleManager";
import TextManager from "./types/textManager";
import TransformManager from "./types/transformManager";
import UndoManager from "./types/undoManager";
import ZoomManager from "./types/zoomManager";
import CrosshairHud from "./tools/crosshairHud";

declare class Stage {
    alignManager: AlignManager;
    clipboardManager: ClipboardManager;
    commands: Commands;
    elementsGeometryManager: ElementsGeometryManager;
    exportManager: ExportManager;
    groupManager: GroupManager
    importManager: ImportManager;
    orderManager: OrderManager
    styleManager: StyleManager;
    textManager: TextManager;
    transformManager: TransformManager;
    undoManager: UndoManager;
    zoomManager: ZoomManager;
    crosshairHud: CrosshairHud;
    constructor(
        board: Element | HTMLElement,
        options?: {
            manualGuides?: boolean;
            showRulers?: boolean;
            smartGuides?: boolean;
            showGrid?: boolean;
            crosshair?: boolean
        }
    );
    scale: number;
    board: HTMLElement | Element;
    workspaces: HTMLElement | Element;
    currentContainer: HTMLElement | Element;
    currentTool: string;
    selectedObjectElements: any;
    selectedElements: any;
    svg: HTMLElement | Element;
    canvas: HTMLElement | Element;
    htmlPlugins: HTMLElement | Element;
    currentWorkspace: HTMLElement | Element;
    defs: HTMLElement | Element;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    resize: any;
    setSvgWidthHeight: Function;
    toggleTool(tool: string): void;
    scrollBy(x: number, y: number): void;
    isSelectableElement(svgEelement: SVGElement | HTMLElement | Element): boolean;
    add(svgEelement: SVGElement | HTMLElement | Element): void;
    uninstall(): void;
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