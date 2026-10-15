import { useEffect, useRef, useState } from 'react';
import { media } from './data.js';
import { ParticleEngine } from './particleEngine.js';

function useMotionPreference() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function ParticleDemo() {
  const reducedMotion = useMotionPreference();
  const [paused, setPaused] = useState(reducedMotion);
  const [preset, setPreset] = useState('fountain');
  const [count, setCount] = useState(350);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const settings = useRef({ paused, count });
  settings.current = { paused, count };

  useEffect(() => { if (reducedMotion) setPaused(true); }, [reducedMotion]);
  useEffect(() => {
    engineRef.current?.setPreset(preset);
  }, [preset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const engine = new ParticleEngine();
    engineRef.current = engine;
    let width = 1, height = 1, visible = true, frame = 0, previous = 0;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      for (let i = 0; i < settings.current.count; i++) {
        const p = engine.particles[i];
        if (!p.active) continue;
        context.globalAlpha = Math.max(0, 1 - p.age / p.life);
        context.fillStyle = i % 3 === 0 ? '#6ca6ff' : i % 3 === 1 ? '#a38aff' : '#e4d8ff';
        context.fillRect(p.x, p.y, p.size, p.size);
        context.globalAlpha *= 0.1;
        context.fillRect(p.x - p.size, p.y - p.size, p.size * 3, p.size * 3);
      }
      context.globalAlpha = 1;
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    // Leave a still example visible when motion is paused from the outset.
    resize();
    for (let i = 0; i < 65; i++) engine.step(1 / 60, width, height, settings.current.count);
    draw();
    const animate = (time) => {
      const dt = previous ? (time - previous) / 1000 : 0;
      previous = time;
      if (visible && !document.hidden && !settings.current.paused) {
        engine.step(dt, width, height, settings.current.count);
        draw();
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      engineRef.current = null;
    };
  }, []);

  const changePreset = (value) => {
    setPreset(value);
    engineRef.current?.setPreset(value);
    setPaused(false);
  };

  return (
    <article className="demo-card">
      <div className="demo-heading">
        <div><span className="eyebrow">01 / PARTICLE SYSTEMS</span><h3>A little controlled chaos.</h3></div>
        <button type="button" className="quiet-button" aria-label={paused ? 'Play particle animation' : 'Pause particle animation'} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>
      </div>
      <div className="particle-stage">
        <canvas ref={canvasRef} role="img" aria-label="Interactive blue and purple particle emitter illustration">An animated particle emitter illustrating reusable particles.</canvas>
        <span className="stage-label">POOLED PARTICLES / {preset.toUpperCase()}</span>
      </div>
      <div className="demo-controls">
        <div className="preset-buttons" aria-label="Particle presets">
          {['fountain', 'drift', 'burst'].map((item) => <button type="button" key={item} aria-pressed={preset === item} onClick={() => changePreset(item)}>{item}</button>)}
        </div>
        <label className="density-control" htmlFor="particle-count"><span>Particles <output>{count}</output></span><input id="particle-count" type="range" min="100" max="900" step="50" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
      </div>
      <p className="demo-caption">A browser illustration of the configurable, pooled emitter I built for Goblin Man. This is a JavaScript recreation, not a recording or performance benchmark of the C++ engine.</p>
    </article>
  );
}

export function BonkeraDemo() {
  const reducedMotion = useMotionPreference();
  const [paused, setPaused] = useState(reducedMotion);
  const [cycle, setCycle] = useState(0);
  useEffect(() => { if (reducedMotion) setPaused(true); }, [reducedMotion]);
  return (
    <article className="demo-card">
      <div className="demo-heading">
        <div><span className="eyebrow">02 / ENEMY BEHAVIOR</span><h3>Meet the Bonkera.</h3></div>
        <button type="button" className="quiet-button" aria-label={paused ? 'Play Bonkera animation' : 'Pause Bonkera animation'} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</button>
      </div>
      <div key={cycle} className={`bonkera-stage ${paused ? 'is-paused' : ''}`} role="img" aria-label="Looping scene: a Goblittle walks beneath a translucent Bonkera mushroom, which rises, stalls, and slams down, squashing the Goblittle.">
        <div className="cave-light" aria-hidden="true" />
        <span className="stage-label">GOBLIN MAN / BEHAVIOR STUDY</span>
        <div className="bonkera-shadow" aria-hidden="true" />
        <img className="bonkera-sprite" src={media('bonkera.png')} alt="" width="32" height="32" />
        <div className="goblittle-runner" aria-hidden="true"><img src={media(paused ? 'goblittle-still.png' : 'goblittle-running.gif')} alt="" width="16" height="16" /></div>
        <div className="impact-ring" aria-hidden="true" />
        <div className="cave-floor" aria-hidden="true" />
      </div>
      <div className="bonkera-controls">
        <ol className="state-cycle" aria-label="Enemy state sequence"><li>Rest</li><li>Climb</li><li>Stall</li><li>Fall</li></ol>
        <button type="button" className="quiet-button" onClick={() => { setCycle(cycle + 1); setPaused(false); }}>Replay ↻</button>
      </div>
      <p className="demo-caption">The Bonkera fades as the Goblittle passes underneath, then slams and squashes it. This looping browser recreation uses the original sprites and illustrates the state cycle in my C++ behavior.</p>
    </article>
  );
}
