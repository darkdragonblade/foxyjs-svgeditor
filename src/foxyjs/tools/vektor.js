import { Kt, Zi, ut, ct } from "../utils/common";
import { rotate, flipX, flipY } from '../utils/matrix';
class VektorTool {
    #stage;
    #hud = document.querySelector("#vektor-hud");
    #dashed;
    #arrow;
    #text;
    #pointerEvent;
    #zoomchangeEvent;
    get hud() {
        return this.#hud;
    }
    get enabled() {
        return this.hud.hasAttribute("enabled");
    }
    set enabled(val) {
        val
            ? this.hud.setAttribute("enabled", "")
            : this.hud.removeAttribute("enabled");
    }
    constructor(stage) {
        this.#stage = stage;
        this.#hud.innerHTML = `
            <g uid="dashed"></g>
            <g uid="arrow"></g>
            <g uid="text"></g>
        `;

        this.#dashed = document.querySelector('#vektor-hud [uid="dashed"]');
        this.#arrow = document.querySelector('#vektor-hud [uid="arrow"]');
        this.#text = document.querySelector('#vektor-hud [uid="text"]');
    }
    enable = () => {
        this.enabled = true;
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#pointerEvent = (t) => {
                this.#pointerdown(t);
            })
        );
        this.#stage.board.addEventListener('zoomchange', this.#zoomchangeEvent = () => {
            this.#update();
        });
        // window.addEventListener('pointerdown', this.#windowEvent = () => {
        //     this.#dashed.innerHTML = '';
        //     this.#arrow.innerHTML = '';
        //     this.#text.innerHTML = '';
        // });
    }
    disable = () => {
        this.enabled = false;
        this.#stage.board.style.cursor = "auto";
        this.#stage.workspaces.removeEventListener('pointerdown', this.#pointerEvent);
        this.#stage.board.removeEventListener('zoomchange', this.#zoomchangeEvent);
        // window.removeEventListener('pointerdown', this.#windowEvent);
        this.#dashed.innerHTML = '';
        this.#arrow.innerHTML = '';
        this.#text.innerHTML = '';
    }
    #pointerdown = (events) => {
        const { buttons, clientX, clientY } = events;
        if (buttons > 1) return;
        let pointermoveEvent;
        let pointerupEvent;
        const s = new DOMPoint(clientX, clientY);

        window.addEventListener('pointermove', pointermoveEvent = (r) => {
            const { clientX, clientY } = r;
            const m = new DOMPoint(clientX, clientY);
            if (Kt(s, m) >= 3) {
                window.removeEventListener('pointermove', pointermoveEvent);
                window.removeEventListener('pointerup', pointerupEvent);
                this.#create(events);
            }
        });
        window.addEventListener('pointerup', pointerupEvent = () => {
            window.removeEventListener('pointermove', pointermoveEvent);
            window.removeEventListener('pointerup', pointerupEvent);
        });
    }
    #create = (events) => {
        const { clientX, clientY } = events;

        let pointermoveEvent;
        let pointerupEvent;

        const dashed = this.#dashed?.childNodes[0] || Zi('svg:path');
        const arrow = this.#arrow?.childNodes[0] || Zi('svg:path');

        console.error(arrow);
        const text = this.#text?.childNodes[0] || Zi('svg:text');
        this.#arrow?.childNodes?.[0] || this.#arrow.append(arrow);
        this.#dashed?.childNodes?.[0] || this.#dashed.append(dashed);
        this.#text?.childNodes?.[0] || this.#text.append(text);
        text.setAttribute('font-size', 12);
        text.setAttribute('font-family', 'Arial');
        const a = ut(arrow).inverse();
        const f = ct(arrow).multiply(a);

        arrow.setAttribute('transform', f.toString());
        dashed.setAttribute('transform', f.toString());

        const lAngle = 45;
        const rAngle = 135;
        const length = 10;

        window.addEventListener('pointermove', pointermoveEvent = (t) => {
            const { clientX: mx, clientY: my } = t;

            const rad = Math.atan2(my - clientY, mx - clientX);
            const deg = ((rad * 180) / Math.PI) % 360;

            const leftX = Math.sin((lAngle - deg - 180) * Math.PI / 180) * length + mx;
            const leftY = Math.cos((lAngle - deg - 180) * Math.PI / 180) * length + my;
            const rightX = Math.sin((rAngle - deg - 180) * Math.PI / 180) * length + mx;
            const rightY = Math.cos((rAngle - deg - 180) * Math.PI / 180) * length + my;

            const d = `M ${clientX} ${clientY} L ${mx} ${my} Z 
            M ${mx} ${my} L ${leftX} ${leftY} Z
            M ${mx} ${my} L ${rightX} ${rightY} Z`;

            arrow.setAttribute('d', d);
            dashed.setAttribute('d', d);

            const dx = mx - clientX;
            const dy = my - clientY;

            const tx = clientX + dx / 2 - 20
            const ty = deg < 0 ? clientY + dy / 2 - 6 : clientY + dy / 2 + 16;
            text.setAttribute('x', tx);
            text.setAttribute('y', ty);

            text.setAttribute('transform', f.toString());
            if (deg < -90 || deg > 90) {
                flipX(text, clientX + dx / 2);
                flipY(text, clientY + dy / 2);
            }
            rotate(text, deg, clientX + dx / 2, clientY + dy / 2);
            const num = Math.sqrt(dx * dx + dy * dy) / this.#stage.scale;
            text.innerHTML = `${num.toFixed(3)}`;

        });

        window.addEventListener('pointerup', pointerupEvent = () => {
            window.removeEventListener('pointermove', pointermoveEvent);
            window.removeEventListener('pointerup', pointerupEvent);
        });
    }
    #update = () => {
        this.#dashed.innerHTML = '';
        this.#arrow.innerHTML = '';
        this.#text.innerHTML = '';
    }
}

export default VektorTool