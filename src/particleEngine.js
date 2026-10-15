// A small browser illustration of pooled particles, not the original C++ engine.
export class ParticleEngine {
  constructor(capacity = 900, random = Math.random) {
    this.random = random;
    this.preset = 'fountain';
    this.particles = Array.from({ length: capacity }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 1,
      size: 2, delay: random() * 2.5, active: false,
    }));
  }

  setPreset(preset) {
    this.preset = preset;
    for (const p of this.particles) {
      p.active = false;
      p.delay = preset === 'burst' ? 0 : this.random() * 2;
    }
  }

  spawn(p, width, height) {
    const r = this.random;
    p.active = true;
    p.age = 0;
    p.size = 1 + r() * 2.3;
    p.life = 1.4 + r() * 1.6;
    if (this.preset === 'drift') {
      p.x = r() * width;
      p.y = height + 8;
      p.vx = (r() - 0.5) * 30;
      p.vy = -25 - r() * 50;
      p.life = 4 + r() * 3;
    } else if (this.preset === 'burst') {
      const angle = r() * Math.PI * 2;
      const speed = 30 + r() * 155;
      p.x = width * 0.5;
      p.y = height * 0.5;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
    } else {
      p.x = width * 0.5 + (r() - 0.5) * 14;
      p.y = height * 0.88;
      p.vx = (r() - 0.5) * 165;
      p.vy = -90 - r() * 140;
    }
  }

  step(elapsed, width, height, count) {
    if (width <= 0 || height <= 0) return;
    const dt = Math.max(0, Math.min(elapsed, 0.05));
    const limit = Math.max(0, Math.min(Math.floor(count), this.particles.length));
    for (let i = 0; i < limit; i++) {
      const p = this.particles[i];
      if (!p.active) {
        p.delay -= dt;
        if (p.delay <= 0) this.spawn(p, width, height);
        continue;
      }
      p.age += dt;
      if (p.age >= p.life) {
        p.active = false;
        p.delay = this.preset === 'burst' ? 0.45 : 0;
        continue;
      }
      if (this.preset === 'fountain') p.vy += 100 * dt;
      if (this.preset === 'burst') {
        p.vx *= Math.exp(-dt * 0.65);
        p.vy *= Math.exp(-dt * 0.65);
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }
}
