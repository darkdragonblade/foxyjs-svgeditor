import { Kt,Zi,ja,te,ut ,Te,$e,pt,Mt,Ae,Ie} from "../utils/common";
class LineTool{
    #stage;
    #K;
    #Q;
    #Xe;
    #Ze;
    #disabled = false;
    constructor(stage) {
        this.#stage = stage;
    }

    enable = ()=>{
        this.#stage.splineTool.mode = "edit";
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.workspaces.addEventListener('pointerdown', this.#Xe = aA=>{
            this.#be(aA);
        });
        this.#stage.splineTool.splineHud.addEventListener('nodeclick', this.#Ze = aA=>{
            this.#Qe(aA);
        });
    }

    disable = ()=>{
        this.enabled = false;
        this.#stage.workspaces.removeEventListener("pointerdown", this.#Xe);
        this.#stage.splineTool.splineHud.removeEventListener("nodeclick", this.#Ze);
        this.release();
    }

    release = () => {
        this.#stage.splineTool.mode = "edit";
        this.#stage.lineSegHud.hide();
        this.#stage.lineSegHud.hud.dispatchEvent(new CustomEvent('release'));
    }

    #be = ($event) =>{
        if (!this.#disabled) {
            const {clientX,clientY } = $event;
            this.#disabled = true;
            this.#Je(new DOMPoint(clientX,clientY));
        }
    }
    #Qe = (ay) => {
        let az = ay.detail;
        !this.#disabled && 'mid' !== az.position && 
        (
            this.#disabled = true,
            this.#Je(az)
        );
    }
    #Je = (ay) => {
       
        let az;
        let aA;
        let aB;
        let aC; 
        let aD; 
        let aE;
        let aG = this.#stage.currentContainer || this.#stage.currentWorkspace;

        const style = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
            "vector-effect": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-vector-effect')
        }

        // let aI = this.#K['getConfig']('bx-splinesettings:drawLineSplineAs', 'line,polyline,polygon');

        const aI = 'path';
        let aJ = null; 
        let aK = [];
        let aL = -0x1;
        let aM = !0x1; 
        let aN = []; 
        let aO = new DOMPoint();

        // this.#stage.splineTool.splineHud.mode = 'draw';
        if (ay instanceof DOMPoint) {
            this.#stage.lineSegHud.show(aG, ay);
        } else {
            let aV = ay;
            let aW = Te(aV.spline);
            let aJ = aV.spline;
            let aM = 'start' === aV.position;
            let aK = $e(aW);
            let aL = aV.subpathIndex;
            let aX = aK[aL];
            let aY = ut(aJ, true);
            let aZ = new DOMPoint(aX.at(aM ? 0x0 : -0x1).values.at(-0x2),aX.at(aM ? 0x0 : -0x1).values.at(-0x1)).matrixTransform(aY);
            this.#stage.lineSegHud.show(aJ, aZ);
        }
        this.#stage.workspaces.addEventListener('pointerup', az = b0=>{
            let b1 = new DOMPoint(b0.clientX,b0.clientY);
            null === aJ ? ay instanceof DOMPoint && Kt(ay, b1) >= 0x4 && aP() : Kt(aO, b1) < 0x4 ? aT() : aP(),
            aO = b1;
        });

        this.#stage.splineTool.splineHud.addEventListener('nodepointerdown', aA = b0=>{
            let b1 = b0.detail;
            b0.preventDefault(),
            b1.spline === aJ ? b1.subpathIndex === aL ? ('line' !== aJ.localName && ('start' === b1.position && !0x1 === aM || 'end' === b1.position && !0x0 === aM) && aS(),
            aT()) : (aQ(b1),
            aT()) : (aR(b1),
            aT());
        });

        this.#stage.splineTool.splineHud.addEventListener('nodepointerup', aB = b0=>{
            let b1 = b0.detail;
            b0.preventDefault(),
            null === aJ && (aR(b1),
            aT());
        });

        // this.#stage.undoManager.addEventListener('undoorredo', aC = ()=>{
        //     if (!0x1 === aJ?..isConnected) {
        //         let b0 = aN['find'](b1=>!0x0 === b1.isConnected);
        //         aJ = b0 || null;
        //     }
        //     if (null === aJ)
        //         aK = [],
        //         aL = 0x0,
        //         this.#stage.splineTool.splineHud.selectedNodes = [],
        //         aT();
        //     else {
        //         {
        //             let b1 = Te(aJ);
        //             aK = $e(b1),
        //             void 0x0 === aK[aL] && (aL = 0x0);
        //         }
        //         {
        //             let b2 = aK.flat().indexOf(aK[aL].at(aM ? 0x0 : -0x1))
        //               , b3 = ut(aJ, !0x0)
        //               , b4 = new DOMPoint(aK[aL].at(aM ? 0x0 : -0x1).values.at(-0x2),aK[aL].at(aM ? 0x0 : -0x1).values.at(-0x1)).matrixTransform(b3);
        //             this.#stage.splineTool.splineHud.selectedNodes = [{
        //                 'spline': aJ,
        //                 'index': b2
        //             }],
        //             this.#stage.lineSegHud.show(aJ, b4);
        //         }
        //     }
        // });

        this.#stage.board.addEventListener('keydown', aD = b0=>{
            let b1 = Ba.fromEvent(b0);
            b1.matches('Enter') ? aT() : b1.matches('Enter', 'Shift') ? (aK[aL]?.length > 0x0 && 'line' !== aJ.localname && aS(),
            aT()) : b1.matches('Escape') && (b0.preventDefault(),
            aT());
        });

        this.#stage.lineSegHud.hud.addEventListener('release', aE = ()=>{
            aT();
        });

        let aP = ()=>{
            this.#stage.undoManager.checkpoint('line', '#spline-tool.line'),
            
            null === aJ && (aK = [[{
                'type': 'M',
                'values': [this.#stage.lineSegHud.x1, this.#stage.lineSegHud.y1]
            }]],
            aL = 0x0,
            'line,polyline,polygon' === aI ? aJ = Zi('svg:line') : 'polyline,polygon' === aI ? aJ = Zi('svg:polyline') : 'path' === aI && (aJ = Zi('svg:path')),
            aG.append(aJ),
            ja(aJ, style)),
            ['R', 'U'].includes(aK[aL][0x1]?.type) && (aK[aL] = Re(aK[aL], !0x1)),
            !0x1 === aM ? aK[aL] = [...aK[aL], {
                'type': 'L',
                'values': [this.#stage.lineSegHud.x2, this.#stage.lineSegHud.y2]
            }] : !0x0 === aM && (aK[aL] = [{
                'type': 'M',
                'values': [this.#stage.lineSegHud.x2, this.#stage.lineSegHud.y2]
            }, {
                'type': 'L',
                'values': [this.#stage.lineSegHud.x1, this.#stage.lineSegHud.y1]
            }, ...aK[aL].slice(0x1)]);
            {
                let b0 = [].concat(...aK);
                if ('line' === aJ.localName) {
                    if (0x2 === b0.length)
                        aJ.setAttribute('x1', te(b0[0x0].values[0x0], this.#stage.geometryPrecision)),
                        aJ.setAttribute('y1', te(b0[0x0].values[0x1], this.#stage.geometryPrecision)),
                        aJ.setAttribute('x2', te(b0[0x1].values[0x0], this.#stage.geometryPrecision)),
                        aJ.setAttribute('y2', te(b0[0x1].values[0x1], this.#stage.geometryPrecision));
                    else {
                        let b1 = Zi('svg:polyline');
                        for (let b3 of aJ.attributes)
                            !0x1 === ['x1', 'y1', 'x2', 'y2'].includes(b3.name) && b1.setAttribute(b3.name, b3.value);
                        let b2 = b0.map(b4=>b4.values).flat().map(b4=>te(b4, this.#stage.geometryPrecision));
                        b1.setAttribute('points', b2.join('\x20'));
                        aJ.replaceWith(b1);
                        aN.push(aJ, b1);

                        const selectedElements = Array.from(this.#stage.selectedElements.keys());
                        this.#stage.selectedElements.clear();
                        selectedElements.forEach((b4) => {
                            this.#stage.selectedElements.set(b4 === aJ ? b1 : b4);
                        });

                        aJ = b1;
                    }
                } else {
                    if ('polyline' === aJ.localName) {
                        let b4 = b0.map(b5=>b5.values).flat().map(b5=>te(b5, this.#stage.geometryPrecision));
                        aJ.setAttribute('points', b4.join('\x20'));
                    } else
                        'path' === aJ.localName && Ae(aJ, b0, this.#stage.geometryPrecision);
                }
            }
            {
                let b5 = aK.flat().indexOf(aK[aL].at(aM ? 0x0 : -0x1));
                let b6 = ut(aJ, !0x0);
                let b7 = aK[aL];
                let b8 = new DOMPoint(b7.at(aM ? 0x0 : -0x1).values.at(-0x2),b7.at(aM ? 0x0 : -0x1).values.at(-0x1)).matrixTransform(b6);

                null === aJ.closest('defs') && void 0x0 === Array.from(this.#stage.selectedElements.keys()).find(b9=>b9 === aJ || b9.contains(aJ)) && this.#stage.selectedElements.set(aJ),
                this.#stage.lineSegHud.show(aJ, b8),
                this.#stage.splineTool.splineHud.selectedNodes = [{
                    'spline': aJ,
                    'index': b5
                }];
            }
        }
          , aQ = b0=>{
       
            this.#stage.undoManager.checkpoint('line', '#spline-tool.line');
            {
                let b1 = aK[aL]
                  , b2 = aK[b0.subpathIndex];
                aK = aK.filter(b3=>b3 !== b2),
                aL = aK.indexOf(b1),
                ['R', 'U'].includes(b2[0x1]?.type) && (b2 = Re(b2, !0x1)),
                (!0x0 === aM && 'start' === b0.position || !0x1 === aM && 'end' === b0.position) && (b2 = Ie(b2)),
                !0x1 === aM ? aK[aL] = [...b1, {
                    'type': 'L',
                    'values': [b2[0x0].values[0x0], b2[0x0].values[0x1]]
                }, ...b2.slice(0x1)] : !0x0 === aM && (aK[aL] = [...b2, {
                    'type': 'L',
                    'values': [b1[0x0].values[0x0], b1[0x0].values[0x1]]
                }, ...b1.slice(0x1)]);
            }
            {
                let b3 = [].concat(...aK);
                if ('path' === aJ.localName)
                    Ae(aJ, b3, this.#stage.geometryPrecision);
                else {
                    let b4 = b3.map(b5=>b5.values).flat().map(b5=>te(b5, this.#stage.geometryPrecision));
                    aJ.setAttribute('points', b4.join('\x20'));
                }
            }
            this.#stage.splineTool.splineHud.selectedNodes = [];
        }
          , aR = b0=>{
        
            this.#stage.undoManager.checkpoint('line', '#spline-tool.line');
            let b1 = aJ ? aJ.ownerSVGElement.querySelector('textPath[href="#' + CSS['escape'](aJ['id']) + '\x22]') : null
              , b2 = b0.spline
              , b3 = this.#stage.workspaces.querySelector('textPath[href="#' + CSS['escape'](b2['id']) + '\x22]')
              , b4 = $e(Te(b2))
              , b5 = pt(b2, aJ || aG, !0x0);
            null === aJ && (aK = [[{
                'type': 'M',
                'values': [this.#stage.lineSegHud.x1, this.#stage.lineSegHud.y1]
            }]],
            aL = 0x0,
            aJ = !aI.includes('polyline') || 'line' !== b2.localName && 'polyline' !== b2.localName ? Zi('svg:path') : Zi('svg:polyline'),
            aG.append(aJ),
            ja(aJ, style));
            {
                let b6 = b4[b0.subpathIndex];
                b4 = b4.filter(b7=>b7 !== b6),
                ['R', 'U'].includes(b6[0x1]?.type) && (b6 = Re(b6, !0x1)),
                'end' === b0.position && (b6 = Ie(b6)),
                b6 = Mt(b6, b5),
                aM && (aK[aL] = Ie(aK[aL])),
                aK[aL].push({
                    'type': 'L',
                    'values': [b6[0x0].values[0x0], b6[0x0].values[0x1]]
                }, ...b6.slice(0x1)),
                b3 && 'end' === b0.position && (aK[aL] = Ie(aK[aL]));
            }
            {
                let b7 = [].concat(...aK);
                if ('line' === aJ.localName || 'polyline' === aJ.localName) {
                    let b8 = Zi('svg:path');
                    for (let b9 of aJ.attributes)
                        !0x1 === ['x1', 'y1', 'x2', 'y2', 'points'].includes(b9.name) && b8.setAttribute(b9.name, b9.value);
                    Ae(b8, b7, this.#stage.geometryPrecision),
                    aJ.replaceWith(b8);
                    aN.push(aJ, b8);

                    const selectedElements = Array.from(this.#stage.selectedElements.keys());
                    this.#stage.selectedElements.clear();
                    selectedElements.forEach((bb) => {
                        this.#stage.selectedElements.set(bb === aJ ? b8 : bb);
                    });

                    aJ = b8;
                } else
                    'path' === aJ.localName && Ae(aJ, b7, this.#stage.geometryPrecision);
                if (0x0 === b4.length)
                    b2.remove();
                else {
                    let bb = [].concat(...b4);
                    Ae(b2, bb, this.#stage.geometryPrecision);
                }
                if (!b1 && b3 && !0x1 === b2.isConnected) {
                    let bj = this.#stage.generateUniqueID(aJ.localName + '-');
                    aJ.setAttribute('id', bj),
                    b3.setAttribute('href', '#' + bj),
                    b3.closest('text').removeAttribute('transform');
                }
            }
            {
                // let bk = [...this.#stage.selectedElements];
                let bk = Array.from(this.#stage.selectedElements.keys());
                !0x1 === b2.isConnected && (bk = bk.filter(bq=>bq !== b2));
                null === aJ.closest('defs') && void 0x0 === bk.find(bq=>bq === aJ || bq.contains(aJ)) && bk.push(aJ);
                // this.#stage.selectedElements = bk;
                bk.forEach(node=>{
                    this.#stage.selectedElements.set(node);
                })
                console.log(bk);
            }
        }
          , aS = ()=>{
         
            this.#stage.undoManager.checkpoint('line', '#spline-tool.line');
            {
                let b0 = aK[aL];
                b0.push({
                    'type': 'L',
                    'values': [b0[0x0].values[0x0], b0[0x0].values[0x1]]
                }, {
                    'type': 'Z',
                    'values': []
                });
            }
            {
                let b1 = [].concat(...aK);
                if ('polyline' === aJ.localName) {
                    if (aI.includes('polygon')) {
                        let b2 = Zi('svg:polygon');
                        for (let b3 of aJ.attributes)
                            b2.setAttribute(b3.name, b3.value);
                        aJ.replaceWith(b2);
                        aN.push(aJ, b2);

                        const selectedElements = Array.from(this.#stage.selectedElements.keys());
                        this.#stage.selectedElements.clear();
                        selectedElements.forEach((b4) => {
                            this.#stage.selectedElements.set(b4 === aJ ? b2 : b4);
                        });

                        aJ = b2;
                    } else {
                        let b4 = Zi('svg:path');
                        for (let b5 of aJ.attributes)
                            !0x1 === ['points'].includes(b5.name) && b4.setAttribute(b5.name, b5.value);
                        Ae(b4, b1, this.#stage.geometryPrecision),
                        aJ.replaceWith(b4);
                        aN.push(aJ, b4);

                        const selectedElements = Array.from(this.#stage.selectedElements.keys());
                        this.#stage.selectedElements.clear();
                        selectedElements.forEach((bb) => {
                            this.#stage.selectedElements.set(b6 === aJ ? b4 : b6);
                        });

                        aJ = b4;
                    }
                } else
                    'path' === aJ.localName && Ae(aJ, b1, this.#stage.geometryPrecision);
            }
            this.#stage.splineTool.splineHud.selectedNodes = [];
        }
          , aT = ()=>{
            this.#stage.workspaces.removeEventListener('pointerup', az);
            this.#stage.splineTool.splineHud.removeEventListener('nodepointerdown', aA);
            this.#stage.splineTool.splineHud.removeEventListener('nodepointerup', aB);
            this.#stage.board.removeEventListener('undoorredo', aC);
            this.#stage.board.removeEventListener('keydown', aD);
            this.#stage.lineSegHud.hud.removeEventListener('release', aE);
            this.#stage.splineTool.splineHud.mode = 'edit';
            this.#stage.lineSegHud.hide();
            this.#disabled = false;
        };
    }
}

export default LineTool;