import * as THREE from "three";

// Pose of the 3D photo per section (desktop). x,y,z = position, ry = rotation Y, s = scale, o = opacity
const POSES = {
  hero:       { x: 2.5,  y: 0,    z: 0,   ry: -0.28, s: 1.05, o: 1 },
  about:      { x: -2.7, y: 0,    z: 0,   ry: 0.5,   s: 0.95, o: 1 },
  experience: { x: 2.9,  y: 0.2,  z: -1,  ry: -0.7,  s: 0.8,  o: 0.9 },
  projects:   { x: -4.2, y: 1.2,  z: -3,  ry: 1.0,   s: 0.6,  o: 0.3 },
  skills:     { x: 4.2,  y: -1.0, z: -3,  ry: -1.0,  s: 0.6,  o: 0.3 },
  contact:    { x: 0,    y: 0.6,  z: 0.5, ry: Math.PI * 2, s: 0.95, o: 1 }, // full spin
};

const VERT = /* glsl */ `
  uniform float uTime; uniform float uBend;
  varying vec2 vUv;
  void main(){
    vUv = uv;
    vec3 p = position;
    p.z += sin(uv.y * 3.14159 + uTime * 0.8) * 0.06 + sin(uv.x * 6.0 + uTime) * uBend * 0.25;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap; uniform float uOpacity; uniform float uShift; uniform float uTime; uniform float uScan;
  varying vec2 vUv;
  void main(){
    float r = texture2D(uMap, vUv + vec2(uShift, 0.0)).r;
    float g = texture2D(uMap, vUv).g;
    float b = texture2D(uMap, vUv - vec2(uShift, 0.0)).b;
    float ta = texture2D(uMap, vUv).a;
    vec3 col = vec3(r, g, b);
    // cool blue grade
    col = mix(col, col * vec3(0.85, 0.95, 1.12), 0.45);
    // scanlines
    col *= 0.97 + 0.03 * sin(vUv.y * 900.0 + uTime * 2.0);
    // blue rim light from the right
    col += vec3(0.1, 0.3, 0.8) * smoothstep(0.55, 1.0, vUv.x) * 0.2;
    // hologram scan beam sweeping upward
    float band = smoothstep(0.07, 0.0, abs(vUv.y - uScan));
    col += vec3(0.25, 0.65, 1.0) * band * 0.9;
    // cut the faint dark halo of the cutout + fade the torso into the dark
    float a = smoothstep(0.4, 0.95, ta) * smoothstep(0.0, 0.2, vUv.y);
    gl_FragColor = vec4(col, a * uOpacity);
    #include <colorspace_fragment>
  }`;

function placeholderTexture(initials) {
  const cv = document.createElement("canvas");
  cv.width = 768; cv.height = 1024;
  const g = cv.getContext("2d");
  const grd = g.createLinearGradient(0, 0, 768, 1024);
  grd.addColorStop(0, "#0b1d4a"); grd.addColorStop(1, "#1d4ed8");
  g.fillStyle = grd; g.fillRect(0, 0, 768, 1024);
  g.fillStyle = "#e0efff"; g.font = "700 300px sans-serif";
  g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(initials, 384, 470);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function labelTexture(text) {
  const cv = document.createElement("canvas");
  cv.width = 320; cv.height = 80;
  const g = cv.getContext("2d");
  g.font = "600 30px 'JetBrains Mono', monospace";
  const w = Math.min(300, g.measureText(text).width + 44);
  const x = (320 - w) / 2;
  g.fillStyle = "rgba(10,25,60,0.75)";
  g.strokeStyle = "rgba(96,165,250,0.9)";
  g.lineWidth = 3;
  g.beginPath();
  if (g.roundRect) g.roundRect(x, 10, w, 60, 30); else g.rect(x, 10, w, 60);
  g.fill(); g.stroke();
  g.fillStyle = "#dbeafe"; g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText(text, 160, 42);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function initScene(canvas, photoUrl, initials, orbitWords = []) {
  const small = innerWidth < 860;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070d, 0.032);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
  camera.position.z = 8;

  // ---------- background particles ----------
  const N = small ? 900 : 2400;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 6 + Math.random() * 18, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(p) * Math.cos(t);
    pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.8;
    pos[i * 3 + 2] = r * Math.cos(p) - 6;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(
    pg,
    new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.05, transparent: true, opacity: 0.85, depthWrite: false })
  );
  scene.add(stars);

  // ---------- floating wireframe shapes ----------
  const shapes = new THREE.Group();
  const wire = (c) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.35 });
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), wire(0x3b82f6));
  ico.position.set(-5, 2.2, -5);
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.22, 120, 12), wire(0x60a5fa));
  knot.position.set(5.5, -2.4, -6);
  const oct = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), wire(0x93c5fd));
  oct.position.set(-4, -3, -4);
  shapes.add(ico, knot, oct);
  scene.add(shapes);

  // ---------- fly-through tunnel of rings (moves toward you as you scroll) ----------
  const tunnel = new THREE.Group();
  const segs = [3, 4, 6, 8, 6, 64];
  const c1 = new THREE.Color(0x1d4ed8), c2 = new THREE.Color(0x93c5fd);
  const RINGS = small ? 26 : 46;
  for (let i = 0; i < RINGS; i++) {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(11 + (i % 3) * 1.4, 0.018, 4, segs[i % segs.length]),
      new THREE.MeshBasicMaterial({ color: c1.clone().lerp(c2, (i % 7) / 7), transparent: true, opacity: 0.55 })
    );
    m.position.z = -8 - i * 3.4;
    m.rotation.z = i * 0.45;
    tunnel.add(m);
  }
  scene.add(tunnel);

  // ---------- retro grid floor that streams toward the camera ----------
  const grid = new THREE.GridHelper(140, 140, 0x2563eb, 0x1d4ed8);
  grid.position.y = -5;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);

  // ---------- 3D photo ----------
  const photo = new THREE.Group();
  scene.add(photo);
  const W = 3, H = 4;
  const uniforms = {
    uMap: { value: placeholderTexture(initials) },
    uOpacity: { value: 1 }, uShift: { value: 0 }, uTime: { value: 0 }, uBend: { value: 0 }, uScan: { value: 0 },
  };
  const main = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H, 32, 32),
    new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, side: THREE.DoubleSide, depthWrite: false })
  );
  photo.add(main);

  // soft glow disc behind the cutout
  const gc = document.createElement("canvas"); gc.width = gc.height = 256;
  const gx = gc.getContext("2d"), gg = gx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gg.addColorStop(0, "rgba(59,130,246,.55)"); gg.addColorStop(1, "rgba(59,130,246,0)");
  gx.fillStyle = gg; gx.fillRect(0, 0, 256, 256);
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 6.4),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, depthWrite: false, opacity: 0.8 })
  );
  halo.position.set(0, 0.2, -0.8);

  // spinning ring around the portrait
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.012, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.7 })
  );
  ring.rotation.x = Math.PI / 2.4;
  photo.add(halo, ring);

  // orbiting security keywords
  const orbit = new THREE.Group();
  photo.add(orbit);
  const tags = orbitWords.map((w, i) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(w), transparent: true, depthWrite: false, fog: false }));
    sp.scale.set(1.6, 0.4, 1);
    sp.userData.a = (i / Math.max(1, orbitWords.length)) * Math.PI * 2;
    sp.userData.k = i % 2 ? 1 : -1;
    orbit.add(sp);
    return sp;
  });

  // load real photo (placeholder stays if it fails)
  new THREE.TextureLoader().load(
    photoUrl,
    (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      const ia = t.image.width / t.image.height;
      main.scale.set((ia * H) / W, 1, 1); // keep the cutout's natural proportions
      uniforms.uMap.value = t;
    },
    undefined,
    () => {}
  );

  // ---------- scroll poses ----------
  const secs = [...document.querySelectorAll("[data-pose]")];
  let centers = [];
  const measure = () => (centers = secs.map((s) => ({ y: s.offsetTop + s.offsetHeight / 2, k: s.dataset.pose })));
  const mobile = () => innerWidth < 860;

  const cur = { x: 0, y: 0, z: 0, ry: 0, s: 1, o: 1 };
  const tgt = { ...cur };
  const mouse = { x: 0, y: 0 };
  let vel = 0, lastY = scrollY;

  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => t * t * (3 - 2 * t);

  function computeTarget() {
    const y = scrollY + innerHeight / 2;
    let i = 0;
    while (i < centers.length - 1 && y > centers[i + 1].y) i++;
    const j = Math.min(i + 1, centers.length - 1);
    const a = POSES[centers[i].k], b = POSES[centers[j].k];
    const span = centers[j].y - centers[i].y || 1;
    const t = ease(Math.min(Math.max((y - centers[i].y) / span, 0), 1));
    for (const k of ["x", "y", "z", "ry", "s", "o"]) tgt[k] = lerp(a[k], b[k], t);
    if (mobile()) {
      tgt.x = 0;
      tgt.s *= 0.62;
      tgt.y = centers[i].k === "hero" && t < 0.5 ? 1.5 : tgt.y * 0.4 + 0.3;
      tgt.o = Math.min(tgt.o, t < 0.4 && centers[i].k === "hero" ? 1 : 0.28);
    }
  }

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    measure();
  }
  addEventListener("resize", resize);
  addEventListener("load", measure);
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(document.body);
  setTimeout(measure, 600);
  resize();

  addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
  });

  // ---------- loop ----------
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    const dy = scrollY - lastY; lastY = scrollY;
    vel = lerp(vel, Math.max(-60, Math.min(60, dy)), 0.12);
    const maxS = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const prog = Math.min(1, Math.max(0, scrollY / maxS));

    computeTarget();
    for (const k in cur) cur[k] = lerp(cur[k], tgt[k], 0.07);

    photo.position.set(cur.x, cur.y + Math.sin(t * 0.9) * 0.1, cur.z);
    photo.rotation.y = cur.ry + mouse.x * 0.35;
    photo.rotation.x = -mouse.y * 0.2 + vel * 0.004;
    photo.scale.setScalar(cur.s);
    uniforms.uOpacity.value = cur.o;
    uniforms.uShift.value = Math.abs(vel) * 0.0007;
    uniforms.uBend.value = Math.abs(vel) * 0.01;
    uniforms.uTime.value = t;
    uniforms.uScan.value = (t * 0.22) % 1.6 - 0.3; // sweeps up, pauses off-screen
    halo.material.opacity = 0.8 * cur.o;
    ring.rotation.z = t * 0.4;

    tags.forEach((sp) => {
      const a = sp.userData.a + t * 0.32 * sp.userData.k;
      sp.position.set(Math.cos(a) * 3.3, Math.sin(a * 2) * 0.55 + sp.userData.k * 0.9, Math.sin(a) * 1.8);
      sp.material.opacity = (0.3 + 0.7 * ((Math.sin(a) + 1) / 2)) * cur.o;
    });

    stars.rotation.y = t * 0.012 + mouse.x * 0.05;
    stars.rotation.x = mouse.y * 0.03;
    stars.position.y = scrollY * 0.0016;
    shapes.children.forEach((m, i) => { m.rotation.x = t * (0.12 + i * 0.05); m.rotation.y = t * (0.15 + i * 0.04); });
    shapes.position.y = scrollY * 0.0009;

    // fly through the tunnel with scroll; grid streams toward you
    tunnel.position.z = prog * 120;
    tunnel.rotation.z = prog * 2.2 + t * 0.03;
    grid.position.z = (scrollY * 0.006 + t * 0.4) % 1;

    camera.position.x = lerp(camera.position.x, mouse.x * 0.45, 0.05);
    camera.position.y = lerp(camera.position.y, -mouse.y * 0.3, 0.05);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}
