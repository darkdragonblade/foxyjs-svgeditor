import {
    sleep,
    ut,
    Kt,
    Ri,
    Ni,
    pt,
    Zi,
    Bi,
    Gi,
    Ii,
    _i,
    fs,
    ji,
    ti,
    Qd,
    Xd,
    Qt,
    ks,
    Cs,
} from "../utils/common";
class TextHud {
    #stage;
    get inputMode() {
        return this.#hud.getAttribute("inputmode");
    }
    #hud = document.querySelector("#text-hud");
    get hud() {
        return this.#hud;
    }
    get enabled() {
        return this.hud.hasAttribute("enabled");
    }
    set enabled(t) {
        t
            ? this.hud.setAttribute("enabled", "")
            : this.hud.removeAttribute("enabled");
    }
    #htmlInputObject;
    #htmlInput;
    #caretLine;
    #selectionRects;
    Qs;
    tn;
    qe;
    We;
    l = false;
    C;
    T;
    Qe;
    et;
    constructor(stage) {
        this.#stage = stage;
        this.Qs = ks(this.Js, 200, this);
        this.en = Cs(this.en, 300, this, !0x0);
        this.tn = null;
        this.#hud.setAttribute("tabIndex", "1");
        this.#hud.innerHTML = `
          <g uid="overlays">
            <line uid="caret-line"></line>
            <g uid="selection-rects"></g>
          </g>
        
          <foreignObject uid="html-input-object" width="200" height="16">
            <p uid="html-input" tabindex="0"></p>
          </foreignObject>`;

        // this['commands'] = {
        //     'selectAll': {
        //         'enabled': () => null !== this.#stage.selectedTextRange,
        //         'exec': () => this.sn(es(this.#stage.selectedTextRange.startContainer, 'text'))
        //     },
        //     'deselectAll': {
        //         'enabled': () => null !== this.#stage.selectedTextRange,
        //         'exec': () => {
        //             let az = this.#stage.selectedTextRange.cloneRange();
        //             az.collapse(!0x0);
        //             this.#stage.selectedTextRange = az;
        //         }
        //     }
        // };

        let ay = !0x1;

        this.#htmlInputObject = document.querySelector('[uid="html-input-object"]');
        this.#htmlInput = document.querySelector('[uid="html-input"]');
        this.#caretLine = document.querySelector('[uid="caret-line"]');
        this.#selectionRects = document.querySelector('[uid="selection-rects"]');

        this.#hud.addEventListener("focus", () => this.#htmlInput["focus"]());
        this.#htmlInput.addEventListener("focus", () => {
            this.#hud.dispatchEvent(
                new CustomEvent("textinputmodestart", { bubbles: !0, composed: !0 })
            );
            this.#htmlInput.setAttribute("contenteditable", "plaintext-only");
            this.#hud.setAttribute("inputmode", "");
            this.nn();
        });

        this.#htmlInput.addEventListener("blur", () => {
            this.#hud.dispatchEvent(
                new CustomEvent("textinputmodeend", { bubbles: !0, composed: !0 })
            );
            this.#htmlInput.removeAttribute("contenteditable");
            this.#hud.removeAttribute("inputmode");
        });


        this.#htmlInput.addEventListener("input", (t) => {
            this.an(t);
        });

        this.#htmlInput.addEventListener("keydown", async (t) => {
            ay = !0;
            if (!ay) {
                await sleep(1);
            }
            this.ln(t);
            if (t.ctrlKey && t.code === "KeyA")
                this.sn(this.#stage.selectedTextRange.startContainer.closest("text"));
        });
        this.#htmlInput.addEventListener("keyup", (t) => {
            ay = !1;
            this.ln(t);
        });

    }
    enable = () => {
        this.enabled = true;
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.qe = (t) => {
                this.Xe(t);
            })
        );
        this.#stage.board.addEventListener(
            "selectedtextrangechange",
            (this.We = () => {
                this.Ye();
            })
        );

        0x1 === this.#stage.selectedElements.size && 'text' === Array.from(this.#stage.selectedElements.keys())[0].localName && this.sn(Array.from(this.#stage.selectedElements.keys())[0]);
    }
    disable = () => {
        this.enabled = false;
        this.l && this.M();
        this.#stage.workspaces.removeEventListener("pointerdown", this.qe);
        this.#stage.board.removeEventListener("selectedtextrangechange", this.We);
    }
    forceUpdate = () => {
        this.l && this.Js();
    }
    P = () => {
        this.#hud.style.display = "block";
        this.l = !0;
        this.#htmlInputObject.append(this.#htmlInput);
        this.#htmlInput.focus();
        this.rn();
        this.nn();
        this.Js();
        this.#stage.board.addEventListener(
            "selectedelementschange",
            (this.C = () => {
                this.S();
            })
        );
        this.#stage.board.addEventListener(
            "workspacemutation",
            (this.T = () => {
                this.Qs();
            })
        );
        this.#stage.board.addEventListener(
            "undo",
            (this.Qe = () => {
                this.Je();
            })
        );
        this.#stage.board.addEventListener(
            "redo",
            (this.et = () => {
                this.Je();
            })
        );

    }
    M = () => {
        this.#htmlInput.remove();
        this.#hud.style.display = "none";
        this.l = !1;
        this.#stage.board.focus();
        this.#stage.selectedTextRange = null;
        this.#stage.board.removeEventListener("selectedelementschange", this["C"]);
        this.#stage.board.removeEventListener("workspacemutation", this["T"]);
        this.#stage.board.removeEventListener("undo", this["Qe"]);
        this.#stage.board.removeEventListener("redo", this["et"]);
    }
    S = () => {
        let ay = this.#stage;
        if (ay.selectedTextRange) {
            let az = ay.selectedTextRange.startContainer.closest('text');
            Array.from(this.#stage.selectedElements.keys()).find(aA => aA === az || aA.contains(az)) || (ay.selectedTextRange = null);
        }
        this.rn();
        this.nn();
        this.Js();
    }
    Ye = () => {

        this.l && !this.#stage.selectedTextRange ? this.M() : !this.l && this.#stage.selectedTextRange && this.P();

        if (this.l) {
            this.Js();
            this.nn();
        }

    }
    Je = () => {
        if (this.#stage.selectedTextRange) {
            let ay = this.#stage.selectedTextRange.startContainer.closest('text');
            ay ? this.sn(ay) : this.#stage.selectedTextRange = null;
        }
    }
    Xe = (ay) => {
        ay.target.closest('text') && this.hn(ay);
    }
    hn = (ay) => {
        if (ay.buttons > 0x1) return;
        ay.preventDefault();
        let az = ay.target.closest('text');
        if (0x1 === this.#stage.pointerClickCount) {
            let aA;
            let aB;
            let aC = Ri(az);
            let aD = ut(az).inverse();
            let aE = new DOMPoint(ay.clientX, ay.clientY);
            let aF = aE.matrixTransform(aD);
            let aG = az.getCharNumAtPosition(ti(aF));
            let aH = aG;
            let aI = null;
            Kt(aF, az.getStartPositionOfChar(aG)) > Kt(aF, az.getEndPositionOfChar(aG)) && (aH += 0x1);
            let [aJ, aK] = ji(az, aH);
            this.#stage.selectedElements.clear(false);
            this.#stage.selectedElements.set(az);

            if (this.#stage.shiftKey) {
                let aL = this.#stage.selectedTextRange;
                if (null === aL || !0x1 === az.contains(aL.startContainer)) {
                    let aM = new Range();
                    aM.setStart(aJ, aK);
                    aM.setEnd(aJ, aK);
                    this.#stage.selectedTextRange = aM;
                }
                this.dn(aH);
            } else {
                let aN = new Range();
                aN.setStart(aJ, aK);
                aN.setEnd(aJ, aK);
                this.#stage.selectedTextRange = aN;
            }
            this.#htmlInput.focus();
            window.addEventListener('pointermove', aA = aO => {
                let aP = new DOMPoint(aO.clientX, aO.clientY);
                if (Kt(aE, aP) < 0x3)
                    return;
                let { clientX: aQ, clientY: aR } = aO;
                let aS = new DOMPoint(aQ, aR).matrixTransform(aD);
                let aT = az.getCharNumAtPosition(ti(aS));
                if (-0x1 === aT) {
                    let aZ = az.getNumberOfChars();
                    let b0 = 0x0;
                    let b1 = Infinity;
                    if (null === aI) {
                        aI = [];
                        for (let b2 = 0x0; b2 < aZ; b2 += 0x1) {
                            let b3 = Qt(az.getStartPositionOfChar(b2), az.getEndPositionOfChar(b2));
                            aI.push(b3);
                        }
                    }
                    for (let b4 = 0x0; b4 < aZ; b4 += 0x1) {
                        let b5 = aI[b4];
                        let b6 = Kt(aS, b5);
                        if (b6 < b1) {
                            b0 = b4;
                            b1 = b6;
                        }
                    }
                    aT = b0;
                }
                let aU = aT;
                Kt(aS, az.getStartPositionOfChar(aT)) > Kt(aS, az.getEndPositionOfChar(aT)) && (aU += 0x1);
                let [aV, aW] = ji(az, aU);
                let aX = 'forward';
                if (aJ === aV)
                    aW < aK && (aX = 'backward');
                else
                    aJ.compareDocumentPosition(aV) === Node.DOCUMENT_POSITION_PRECEDING && (aX = 'backward');
                let aY = new Range();
                aY.direction = aX;
                if ('forward' === aX) {
                    aY.setStart(aJ, aK);
                    aY.setEnd(aV, aW);
                } else {
                    aY.setStart(aV, aW);
                    aY.setEnd(aJ, aK);
                }
                if (!0x1 === this.#stage.selectedTextRange.collapsed && aY.startOffset === aY.startContainer.textContent.length) {
                    let b7 = aC[aC.indexOf(aY.startContainer) + 0x1];
                    b7 && aY.setStart(b7, 0x0);
                }
                this.#stage.selectedTextRange = aY;
            });
            window.addEventListener('pointerup', aB = () => {
                window.removeEventListener('pointermove', aA);
                window.removeEventListener('pointerup', aB);
            });
        } else {
            if (0x2 === this.#stage.pointerClickCount) {
                let { clientX: aO, clientY: aP } = ay;
                let aQ = ut(az).inverse();
                let aR = new DOMPoint(aO, aP).matrixTransform(aQ);
                let aS = az.getCharNumAtPosition(ti(aR));
                this.cn(az, aS);
            } else {
                if (0x3 === this.#stage.pointerClickCount) {
                    let { clientX: aT, clientY: aU } = ay;
                    let aV = ut(az).inverse();
                    let aW = new DOMPoint(aT, aU).matrixTransform(aV);
                    let aX = az.getCharNumAtPosition(ti(aW));
                    this.pn(az, aX);
                } else
                    this.#stage.pointerClickCount >= 0x4 && this.sn(az);
            }
        }
    }
    ln = (t) => {
        if (
            "Home" === t.key ||
            "End" === t.key ||
            t.key.startsWith("Arrow")
        ) {
            this.un();
        }
    };
    async 'an'(ay) {

        if ('historyUndo' !== ay.inputType) {
            if (0x0 === this.#htmlInput.innerText.length) {
                this.#htmlInput.innerHTML = '\x20';
                document.execCommand('selectAll');
            }
            this.en();
        }

        this.xn();
        this.un();
    }
    en = (ay) => {
        this.#stage.undoManager.checkpoint('#edit-text', '#text-tool');
    }
    sn = (ay) => {
        let az = Ri(ay);
        if (az.length > 0x0) {
            let aA = az[0x0];
            let aB = az[az.length - 0x1];
            let aC = new Range();
            aC.setStart(aA, 0x0);
            aC.setEnd(aB, aB.textContent.length);
            this.#stage.selectedElements.clear(false);
            this.#stage.selectedElements.set(ay);
            this.#stage.selectedTextRange = aC;
            this.Js();
            this.nn();
        }
    }
    mn = () => {
        this.#stage.selectedTextRange = null;
    }
    cn = (ay, az) => {
        let aA = Ii(ay);
        let aB = aA[az];
        let aC = ay.getNumberOfChars();
        let aD = az;
        let aE = az;
        let aF = aL => Qd(aL) || '​' === aL;
        for (let aL = az - 0x1; aL >= 0x0 && !(aF(aB) && !aF(aA[aL]) || !aF(aB) && aF(aA[aL])); aL -= 0x1)
            aD -= 0x1;
        for (let aM = az; aM < aC && !(aF(aB) && !aF(aA[aM]) || !aF(aB) && aF(aA[aM])); aM += 0x1)
            aE += 0x1;
        let [aG, aH] = ji(ay, aD);
        let [aI, aJ] = ji(ay, aE);
        if (aH === aG.textContent.length) {
            let aN = Ri(ay);
            let aO = aN[aN.indexOf(aG) + 0x1];
            if (aO) {
                aG = aO;
                aH = 0x0;
            }
        }
        let aK = new Range();
        aK.setStart(aG, aH);
        aK.setEnd(aI, aJ);
        this.#stage.selectedTextRange = aK;
    }
    pn = (ay, az) => {
        let aA = Ii(ay);
        // aA[az];
        let aB = ay.getNumberOfChars();
        let aC = az;
        let aD = az;
        for (let aJ = az - 0x1; aJ >= 0x0 && '​' !== aA[aJ]; aJ -= 0x1)
            aC -= 0x1;
        for (let aK = az; aK < aB && '​' !== aA[aK]; aK += 0x1)
            aD += 0x1;
        let [aE, aF] = ji(ay, aC)
            , [aG, aH] = ji(ay, aD);
        if (aF === aE.textContent.length) {
            let aL = Ri(ay);
            let aM = aL[aL.indexOf(aE) + 0x1];
            if (aM) {
                aE = aM;
                aF = 0x0;
            }
        }
        let aI = new Range();
        aI.setStart(aE, aF);
        aI.setEnd(aG, aH);
        this.#stage.selectedTextRange = aI;
    }
    dn = (ay) => {
        let az = this.#stage.selectedTextRange;
        let aA = az.startContainer.closest('text');
        let [, aB] = Ni(az.startContainer, az.startOffset);
        let [, aC] = Ni(az.endContainer, az.endOffset);
        if (ay < aB)
            aB = ay;
        else {
            if (ay > aC)
                aC = ay;
            else {
                if (!(ay > aB && ay < aC))
                    return;
                ay - aB > aC - ay ? aC = ay : aB = ay;
            }
        }
        let [aD, aE] = ji(aA, aB);
        let [aF, aG] = ji(aA, aC);
        if (aE === aD.textContent.length) {
            let aI = Ri(aA);
            let aJ = aI[aI.indexOf(aD) + 0x1];
            if (aJ) {
                aD = aJ;
                aE = 0x0;
            }
        }
        let aH = new Range();
        aH.setStart(aD, aE);
        aH.setEnd(aF, aG);
        aH.direction = 'backward';
        this.#stage.selectedTextRange = aH;
    }
    Js = () => {
        let ay = this.#stage.selectedTextRange;
        let az = ay ? ay.startContainer.closest('text') : null;
        let aA = ay ? az.getNumberOfChars() : 0x0;
        let [, aB] = ay ? Ni(ay.startContainer, ay.startOffset) : [, -0x1];
        let [, aC] = ay ? Ni(ay.endContainer, ay.endOffset) : [, -0x1];
        if (0x1 === aA && '\x20' === ay?.toString()) {
            let aD = 0x0;
            let aE = az.getExtentOfChar(aD);
            let aF = az.getStartPositionOfChar(aD);
            let aG = az.getSubStringLength(aD, 0x1);
            let aH = aE.height;
            let aI = az.getRotationOfChar(aD);
            let aJ = new DOMPoint(aF['x'] + aG / 0x2, aF['y']);
            let aK = new DOMMatrix();
            aK.multiplySelf(pt(az, this.#hud));
            aK.translateSelf(aJ['x'], aJ['y']);
            aK.rotateSelf(aI);
            aK.translateSelf(-aJ['x'], -aJ['y']);
            this.#caretLine.setAttribute('x1', aF['x']);
            this.#caretLine.setAttribute('y1', aE['y']);
            this.#caretLine.setAttribute('x2', aF['x']);
            this.#caretLine.setAttribute('y2', aE['y'] + aH);
            this.#caretLine.setAttribute('transform', aK.toString());
            this.#caretLine.style.setProperty('visibility', 'visible');
        } else {
            if (!0x0 === ay?.collapsed) {
                let aL = 'backward' === ay.direction ? aB : aC;
                if (0x0 === aL) {
                    let aM = az.getExtentOfChar(aL);
                    let aN = az.getStartPositionOfChar(aL);
                    let aO = az.getSubStringLength(aL, 0x1);
                    let aP = aM.height;
                    let aQ = az.getRotationOfChar(aL);
                    let aR = new DOMPoint(aN['x'] + aO / 0x2, aN['y']);
                    let aS = new DOMMatrix();
                    aS.multiplySelf(pt(az, this.#hud));
                    aS.translateSelf(aR['x'], aR['y']);
                    aS.rotateSelf(aQ);
                    aS.translateSelf(-aR['x'], -aR['y']);
                    this.#caretLine.setAttribute('x1', aN['x']);
                    this.#caretLine.setAttribute('y1', aM['y']);
                    this.#caretLine.setAttribute('x2', aN['x']);
                    this.#caretLine.setAttribute('y2', aM['y'] + aP);
                    this.#caretLine.setAttribute('transform', aS.toString());
                    this.#caretLine.style.visibility = 'visible';
                } else {
                    if (aL > 0x0 && aL <= aA) {
                        let aT = az.getExtentOfChar(aL - 0x1);
                        let aU = az.getEndPositionOfChar(aL - 0x1);
                        let aV = az.getSubStringLength(aL - 0x1, 0x1);
                        let aW = aT.height;
                        let aX = az.getRotationOfChar(aL - 0x1);
                        let aY = new DOMPoint(aU['x'] + aV / 0x2, aU['y']);
                        let aZ = new DOMMatrix();
                        aZ.multiplySelf(pt(az, this.#hud));
                        aZ.translateSelf(aY['x'], aY['y']);
                        aZ.rotateSelf(aX);
                        aZ.translateSelf(-aY['x'], -aY['y']);
                        this.#caretLine.setAttribute('x1', aU['x']);
                        this.#caretLine.setAttribute('y1', aT['y']);
                        this.#caretLine.setAttribute('x2', aU['x']);
                        this.#caretLine.setAttribute('y2', aT['y'] + aW);
                        this.#caretLine.setAttribute('transform', aZ.toString());
                        this.#caretLine.style.visibility = 'visible';
                    } else
                        aL > aA && (this.#caretLine.style.visibility = 'hidden');
                }
            } else
                this.#caretLine.style.visibility = 'hidden';
        }
        this.#selectionRects.innerHTML = '';
        if (!0x1 === ay?.collapsed) {
            let b0 = ay.startContainer.closest('text');
            let b1 = b0.getNumberOfChars();
            for (let b2 = aB; b2 < aC && b2 < b1; b2 += 0x1) {
                let b3 = b0.getExtentOfChar(b2);
                let b4 = b0.getStartPositionOfChar(b2);
                b0.getEndPositionOfChar(b2);
                let b5 = b0.getSubStringLength(b2, 0x1);
                let b6 = b3.height;
                let b7 = b0.getRotationOfChar(b2);
                let b8 = new DOMPoint(b4['x'] + b5 / 0x2, b4['y']);
                let b9 = new DOMMatrix();
                b9.multiplySelf(pt(b0, this.#hud));
                b9.translateSelf(b8['x'], b8['y']);
                b9.rotateSelf(b7);
                b9.translateSelf(-b8['x'], -b8['y']);
                let bb = Zi('svg:rect');
                bb.setAttribute('x', b4['x']);
                bb.setAttribute('y', b3['y']);
                bb.setAttribute('width', b5);
                bb.setAttribute('height', b6);
                bb.setAttribute('transform', b9.toString());
                this.#selectionRects.append(bb);
            }
        }
        if ('visible' === this.#caretLine.style.visibility) {
            this.#htmlInputObject.setAttribute('x', this.#caretLine['x2'].baseVal.value);
            this.#htmlInputObject.setAttribute('y', this.#caretLine['y2'].baseVal.value);
            this.#caretLine.hasAttribute('transform') ? this.#htmlInputObject.setAttribute('transform', this.#caretLine.getAttribute('transform')) : this.#htmlInputObject.removeAttribute('transform');
        }
        else {
            if (this.#selectionRects.children.length > 0x0) {
                let bj = this.#selectionRects.children[0x0];
                this.#htmlInputObject.setAttribute('x', bj['x'].baseVal.value);
                this.#htmlInputObject.setAttribute('y', bj['y'].baseVal.value + bj.height.baseVal.value);
                bj.hasAttribute('transform') ? this.#htmlInputObject.setAttribute('transform', bj.getAttribute('transform')) : this.#htmlInputObject.removeAttribute('transform');
            }
        }
    }
    un = () => {
        let ay = Xd(this.hud).getSelection();
        let az = ay.rangeCount > 0x0 ? ay.getRangeAt(0x0) : null;
        if (az) {
            let aA = this.gn(az.startContainer, az.startOffset)[0x1];
            let aB = this.gn(az.endContainer, az.endOffset)[0x1];
            let aC = 0x0;
            let aD = new Range();
            let aE = null;
            let aF = this.tn;
            for (let aG of Ri(aF)) {
                for (let aH = 0x0; aH <= aG.textContent.length; aH += 0x1,
                    aC += 0x1) {
                    aC === aA && aD.setStart(aG, aH);
                    aC === aB && (0x0 === aH && aE ? aD.setEnd(aE, aE.textContent.length) : aD.setEnd(aG, aH));
                }
                aC -= 0x1;
                aE = aG;
            }
            this.#stage.selectedTextRange = aD;
        }
    }
    nn = () => {
        let ay = this.#stage.selectedTextRange;
        if (ay) {
            let az = Ni(ay.startContainer, ay.startOffset)[0x1];
            let aA = Ni(ay.endContainer, ay.endOffset)[0x1];
            let aB = 0x0;
            let aC = new Range();
            let aD = null;
            for (let aF of this['fn'](this.#htmlInput)) {
                for (let aG = 0x0; aG <= aF.textContent.length; aG += 0x1,
                    aB += 0x1) {
                    aB === az && aC.setStart(aF, aG);
                    aB === aA && (0x0 === aG && aD ? aC.setEnd(aD, aD.textContent.length) : aC.setEnd(aF, aG));
                }
                aB -= 0x1;
                aD = aF;
            }
            let aE = window.getSelection();
            aE.removeAllRanges();
            aE.addRange(aC);
        }
    }
    xn = () => {
        let ay = this.tn;
        let az = ay ? ay.querySelector('textPath') || ay : null;
        if (az) {
            let aA = Zi('svg:g');
            aA.innerHTML = this.#htmlInput.innerHTML;
            let aB = document.createNodeIterator(aA, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
            let aC = null;
            let aD = Bi(ay);
            let aE = Gi(ay);
            for (; aC = aB.nextNode();)
                if (aC.nodeType === Element.TEXT_NODE) {
                    if (aC.textContent.includes('\x0a')) {
                        let aG = document.createDocumentFragment();
                        for (let aH of aC.textContent)
                            if ('\x0a' === aH) {
                                let aI = fs`<tspan x="${aD['x']}" dy="${aE + 0x1}em">${'​'}</tspan>`;
                                aG.append(aI);
                            } else
                                aG.append(new Text(aH));
                        aC.replaceWith(aG);
                    }
                } else {
                    if (aC.nodeType === Element.ELEMENT_NODE) {
                        if ('span' === aC.localName) {
                            let aJ = Zi('svg:tspan');
                            for (let { name: aK, value: aL } of [...aC.attributes])
                                aJ.setAttribute(aK, aL);
                            for (let aM of [...aC.childNodes])
                                aJ.append(aM);
                            aC.replaceWith(aJ);
                        } else
                            ('br' === aC.localName || 'div' === aC.localName) && aC.remove();
                    }
                }
            az.innerHTML = aA.innerHTML;
            let aF = Bi(ay);
            aF['x'] !== aD['x'] && ay.setAttribute('x', aD['x']);
            aF['y'] !== aD['y'] && ay.setAttribute('y', aD['y']);
        }
    }
    rn = () => {
        let t = this.#stage.selectedTextRange;
        let e = t ? t.startContainer.closest("text") : null;
        let i = e ? e.querySelector("textPath") || e : null;
        if (i) {
            let t = document.createElement("div");
            t.innerHTML = i.innerHTML;
            for (let n of t.querySelectorAll("tspan"))
                if (_i(n)) n.replaceWith(new Text("\n"));
                else {
                    let i = document.createElement("span");
                    for (let { name: t, value: e } of [...n.attributes])
                        i.setAttribute(t, e);
                    for (let t of [...n.childNodes]) i.append(t);
                    n.replaceWith(i);
                }
            this.#htmlInput.innerHTML = t.innerHTML;
            this.tn = e;
        }
    }
    fn = (ay) => {
        let az = [];
        let aA = document.createTreeWalker(ay, NodeFilter.SHOW_TEXT);
        for (; aA.nextNode();)
            aA.currentNode.closest('bx-title, desc') || az.push(aA.currentNode);
        return az;

    }
    gn = (ay, az) => {
        let aA = this.#htmlInput;
        let aB = 0x0;
        let aC = -0x1;
        for (let aD of this.fn(aA)) {
            if (aD === ay) {
                aC = aB + az;
                break;
            }
            aB += aD.length;
        }
        return [aA, aC];
    }
}

export default TextHud;