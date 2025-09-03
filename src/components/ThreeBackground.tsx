import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Import the provided background JPG from the repo root as a URL
// Adjust the relative path if this component moves.
// Vite will handle bundling the asset and provide a URL at runtime.
// Example file path from user: C:\\Users\\LG\\projects\\showinfo\\e5ab8bc80a487bb68a1f468b33ffb583.jpg
// We refer to it relatively from src/components (two levels up to project root):
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Vite's ?url import returns a string URL at runtime
import backgroundUrl from "../../e5ab8bc80a487bb68a1f468b33ffb583.jpg?url";

function makeSprite(label: string, color: string): THREE.Sprite {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  // Circle background
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
  ctx.fill();
  // Label
  ctx.font = "bold 48px system-ui, sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.6, 1.6, 1.6); // world units
  return sprite;
}

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Background plane with the provided JPG
    const bgTexture = new THREE.TextureLoader().load(backgroundUrl);
    bgTexture.colorSpace = THREE.SRGBColorSpace;
    const bgGeo = new THREE.PlaneGeometry(20, 12);
    const bgMat = new THREE.MeshBasicMaterial({ map: bgTexture });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.z = -5;
    scene.add(bg);

    // Icon-like sprites (e.g., SP, BB, FG)
    const icons = [
      makeSprite("SP", "#3abff8"),
      makeSprite("BB", "#a78bfa"),
      makeSprite("FG", "#f472b6"),
      makeSprite("TV", "#f59e0b"),
      makeSprite("★", "#34d399")
    ];
    icons.forEach((s, i) => {
      s.position.set(Math.sin(i) * 3, Math.cos(i * 1.3) * 1.5, 0);
      scene.add(s);
    });

    // Subtle ambient movement
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      icons.forEach((s, i) => {
        s.position.x = Math.sin(t * 0.5 + i) * 3.2;
        s.position.y = Math.cos(t * 0.7 + i * 1.3) * 1.8;
        s.material.rotation = Math.sin(t * 0.6 + i) * 0.2;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeChild(renderer.domElement);
      renderer.dispose();
      bgGeo.dispose();
      (bgMat.map as THREE.Texture | null)?.dispose();
      bgMat.dispose();
      icons.forEach((s) => {
        (s.material as THREE.SpriteMaterial).map?.dispose();
        s.material.dispose();
        s.geometry.dispose?.();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "260px", marginBottom: "1rem" }}
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;

