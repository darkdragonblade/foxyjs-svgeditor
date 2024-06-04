class Layout {
    static stage = stage => {
        const { a, d, e, f } = stage; return `<g uid="canvas" transform="matrix(${a},0,0,${d},${e},${f})">
            <rect id="background-rect" x="-1000000" y="-1000000" width="2000000" height="2000000"></rect>

            <g id="background-outlines">
                <rect style="pointer-events: none;" x="0" y="0" width="500" height="500" />
            </g>
            <g id="workspaces">
                <rect id="whitespace" x="-1000000" y="-1000000" width="2000000" height="2000000"></rect>  
                <g uid="foxy-workspace" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 500 500">
                    <defs></defs>
                </g>
            </g>
        
            <g id="huds">
                <g id="outline-hud"></g>
                <g id="manual-guides-hud"></g>
                <g id="smart-guides-hud"></g>
                <g id="grid-hud"></g>
                <g id="spline-hud"></g>
                <g id="line-hud"></g>
                <g id="cubic-bezier-seg-hud"></g>
                <g id="text-hud"></g>
                <g id="freehand-hud"></g>
                <g id="view-hud"></g>
                <g id="rubber-band-hud"></g>
                <g id="transform-hud"></g>
                <g id="vektor-hud"></g>
                <g id="crosshair-hud"></g>
            </g>
            <foreignObject style="pointer-events: none;" uid="htmlPlugins" x="-1000000" y="-1000000" width="2000000" height="2000000"></foreignObject>
        </g>`}
} export default Layout;