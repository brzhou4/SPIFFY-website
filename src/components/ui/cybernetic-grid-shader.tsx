import { useEffect, useRef } from "react";
import * as THREE from "three";

type RGB = [number, number, number];

type Props = {
  /** When true, fills its parent absolutely instead of the whole viewport. */
  contained?: boolean;
  className?: string;
  /** Base grid line color (0–1 RGB). */
  lineColor?: RGB;
  /** Energetic pulse / accent color (0–1 RGB). */
  pulseColor?: RGB;
};

/**
 * CyberneticGridShader
 *
 * Interactive WebGL grid that warps and glows around the cursor.
 * Colors are parameterized so the same shader powers both the blue hero
 * grid and the brand red/purple variant. Rendered on a transparent canvas
 * so it layers cleanly over a light page.
 */
const CyberneticGridShader = ({
  contained = false,
  className,
  lineColor = [0.486, 0.169, 0.839], // #7c2bd6 purple
  pulseColor = [0.882, 0.114, 0.165], // #e11d2a red
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep latest colors in a ref so the effect can stay mount-only.
  const colorsRef = useRef({ lineColor, pulseColor });
  colorsRef.current = { lineColor, pulseColor };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Gracefully degrade if the device/browser can't give us a WebGL context.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      container.classList.add("shader-fallback");
      return;
    }
    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform vec3 uLine;
      uniform vec3 uPulse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

        float t         = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        // warp the grid around the cursor
        float warp = sin(mouseDist * 18.0 - t * 4.0) * 0.08;
        warp *= smoothstep(0.45, 0.0, mouseDist);
        uv += warp;

        // grid lines
        vec2 gridUv = abs(fract(uv * 9.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 60.0);

        // base grid, gently breathing
        vec3 color = uLine * line * (0.5 + sin(t * 2.0) * 0.2);

        // energetic pulses travelling along the grid
        float energy = sin(uv.x * 18.0 + t * 5.0) * sin(uv.y * 18.0 + t * 3.0);
        energy = smoothstep(0.75, 1.0, energy);
        color += uPulse * energy * line * 1.4;

        // glow halo around the cursor
        float glow = smoothstep(0.16, 0.0, mouseDist);
        color += mix(uLine, uPulse, 0.5) * glow * 0.9;

        // accumulated brightness drives transparency over the light page
        float alpha = clamp(line * 0.9 + glow * 0.85 + energy * line * 1.2, 0.0, 1.0);

        // faint sparkle
        color += random(uv + t * 0.1) * 0.03;

        gl_FragColor = vec4(color, alpha * 0.85);
      }
    `;

    const { lineColor: lc, pulseColor: pc } = colorsRef.current;
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: {
        value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      },
      uLine: { value: new THREE.Vector3(lc[0], lc[1], lc[2]) },
      uPulse: { value: new THREE.Vector3(pc[0], pc[1], pc[2]) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // gl_FragCoord is in *drawing-buffer* pixels (CSS px × pixelRatio), so
    // iResolution and iMouse must be expressed in the same space for the
    // cursor warp/glow to line up exactly with the pointer.
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width * pr, height * pr);
    };
    window.addEventListener("resize", onResize);
    onResize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.iMouse.value.set(
        (e.clientX - rect.left) * pr,
        (rect.height - (e.clientY - rect.top)) * pr
      );
    };
    window.addEventListener("mousemove", onMouseMove);

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.setAnimationLoop(null);
      const canvas = renderer.domElement;
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={
        contained
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }
          : {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: -1,
              pointerEvents: "none",
            }
      }
      aria-label="Cybernetic Grid animated background"
    />
  );
};

export default CyberneticGridShader;
