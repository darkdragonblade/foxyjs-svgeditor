import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const font = './circle-text/font.data';
const matcap = "./circle-text/metal_copper_flamed.png";

let animation = void 0;
export default class Sketch {
    settings = {
        text: "foxy.js svgEditor foxy.js svgEditor",
        fontSize: 1,
        rotateSpeed: 1,
        twistSpeed: 5,
        fontDepth: 0.5,
        radius: 3.5,
        twists: 2,
        font: 0,
    };

    constructor(options) {
        this.scene = new THREE.Scene();
        this.scene1 = new THREE.Scene();

        this.group = new THREE.Group();
        this.group1 = new THREE.Group();

        this.scene.add(this.group);
        this.scene1.add(this.group1);

        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.container.appendChild(this.renderer.domElement);

        this.loader = new FontLoader();

        this.camera = new THREE.PerspectiveCamera(
            70,
            this.width / this.height,
            0.1,
            100
        );

        this.camera.position.set(0, 0, 6);

        this.time = 0;

        this.isPlaying = true;
        this.addObjects();
        this.resize();
        this.render();
        this.setupResize();
    }

    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    getMaterial() {
        let matcaptexture = new THREE.TextureLoader().load(matcap);
        matcaptexture.needsUpdate = true;
        let header = `
            varying vec3 vPosition;
            varying float vDebug;
            uniform float uOffset;
            uniform float uTwistSpeed;
            uniform float uRotateSpeed;
            uniform float uTwists;
            uniform float uRadius;
            uniform vec3 uMin;
            uniform vec3 uMax;
            uniform float time;
            float radius = 1.5;
            float twists = 2.;
            float PI = 3.141592653589793238;
        mat4 rotationMatrix(vec3 axis, float angle) {
            axis = normalize(axis);
            float s = sin(angle);
            float c = cos(angle);
            float oc = 1.0 - c;
            
            return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                        0.0,                                0.0,                                0.0,                                1.0);
        }

        vec3 rotate(vec3 v, vec3 axis, float angle) {
            mat4 m = rotationMatrix(axis, angle);
            return (m * vec4(v, 1.0)).xyz;
        }
        float mapRange(float value, float min1, float max1, float min2, float max2) {
        return clamp( min2 + (value - min1) * (max2 - min2) / (max1 - min1), min2, max2 );
        }
        `;

        let normals = `
          vPosition = position;
          
          float xx = mapRange(vPosition.x, uMin.x, uMax.x, -1., 1.0);
          objectNormal = rotate(objectNormal, vec3(1.,0.,0.), 0.5*PI*uTwists*xx + 0.01*time*uTwistSpeed);
  
          objectNormal = rotate(objectNormal, vec3(0.,0.,1.), (xx + 0.01*time*uRotateSpeed)*PI);
        `;

        let geometry = `
        vec3 pos = transformed;
         
        float xxx = mapRange(position.x, uMin.x, uMax.x, -1., 1.);

        float theta = (xxx + 0.01*time*uRotateSpeed)*PI;
        pos = rotate(pos,vec3(1.,0.,0.), 0.5*PI*uTwists*xxx + 0.01*time*uTwistSpeed);        
        vec3 dir = vec3(sin(theta), cos(theta),pos.z);
        vec3 circled = vec3(dir.xy*uRadius,pos.z) + vec3(pos.y*dir.x,pos.y*dir.y,0.);
        transformed = circled;
        `;
        this.uniforms = {
            uOffset: { value: 0 },
            time: {
                value: 0,
            },
            uRadius: {
                value: this.settings.radius,
            },
            uTwists: {
                value: this.settings.twists,
            },
            uTwistSpeed: {
                value: this.settings.twistSpeed,
            },
            uRotateSpeed: {
                value: this.settings.rotateSpeed,
            },
            uMin: {
                value: { x: -1, y: 0, z: 0 },
            },
            uMax: {
                value: { x: 1, y: 0, z: 0 },
            },
        };

        let material = new THREE.MeshMatcapMaterial({
            matcap: matcaptexture,
        });

        material.onBeforeCompile = (shader) => {
            shader.uniforms = { ...shader.uniforms, ...this.uniforms };
            shader.vertexShader = header + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
                "#include <beginnormal_vertex>",
                "#include <beginnormal_vertex>" + normals
            );
            shader.vertexShader = shader.vertexShader.replace(
                "#include <begin_vertex>",
                "#include <begin_vertex>" + geometry
            );
            material.userData.shader = shader;
        };

        return material;
    }

    addObjects() {
        this.material = this.getMaterial();
        this.material.matcap = new THREE.TextureLoader().load(matcap);
        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

        this.loader.load(font, (font) => {
            this.geo = new TextGeometry(this.settings.text, {
                font: font,
                size: this.settings.fontSize,
                height: this.settings.fontDepth,
                curveSegments: 100,
                bevelThickness: 0.03,
                bevelSize: 0.03,
                bevelSegments: 10,
                bevelEnabled: false,
            });
            this.geo.center();
            this.geo.computeBoundingBox();

            this.uniforms.uMin.value = this.geo.boundingBox.min;
            this.uniforms.uMax.value = this.geo.boundingBox.max;
            this.uniforms.uMax.value.x += this.settings.fontSize / 6;

            this.textmesh = new THREE.Mesh(this.geo, this.material);

            this.group.add(this.textmesh);
        });
    }

    render() {
        if (!this.isPlaying) return;
        this.time += 0.05;
        this.uniforms.time.value = this.time;
        this.renderer.render(this.scene, this.camera);
        animation = requestAnimationFrame(this.render.bind(this));
    }

    dispose() {
        window.cancelAnimationFrame(animation);
        this.renderer.dispose();
        this.renderer.forceContextLoss();
        this.renderer.content = null;
        this.renderer.domElement = null;
        this.renderer = null;
    }
}

