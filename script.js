(() => {
  'use strict';

  const body = document.body;
  const envelope = document.getElementById('envelope');
  const openButton = document.getElementById('openInvitation');
  const envelopeCard = document.getElementById('envelopeCard');
  const stages = [...document.querySelectorAll('.stage')];

  stages[0]?.classList.add('is-active');

  function openInvitation() {
    if (!envelope || envelope.classList.contains('is-opening')) return;

    envelope.classList.add('is-opening');
    body.classList.add('has-opened');

    if (navigator.vibrate) navigator.vibrate(14);

    // Let the O/M light ignition and fold beams happen before scrolling is unlocked.
    window.setTimeout(() => {
      body.classList.remove('is-locked');
    }, 3500);

    window.setTimeout(() => {
      envelope.classList.add('is-open');
      envelope.setAttribute('aria-hidden', 'true');
      openButton?.setAttribute('tabindex', '-1');
    }, 3650);
  }

  openButton?.addEventListener('click', openInvitation);

  // A slightly larger invisible tap target around the wax seal keeps the interaction effortless on mobile.
  envelope?.addEventListener('pointerup', (event) => {
    if (event.target === openButton || envelope.classList.contains('is-opening') || !envelopeCard) return;
    const card = envelopeCard.getBoundingClientRect();
    const cx = card.left + card.width / 2;
    const cy = card.top + card.height * 0.532;
    const radius = Math.max(54, card.width * 0.145);
    if (Math.hypot(event.clientX - cx, event.clientY - cy) <= radius) openInvitation();
  });

  // Fade/lift each artwork as it enters. The page itself remains a continuous scroll strip.
  const stageObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio > 0.18) {
        entry.target.classList.add('is-active');
      }
    }
  }, { threshold: [0.08, 0.18, 0.42] });
  stages.forEach(stage => stageObserver.observe(stage));

  // Scratch-to-reveal gold foil.
  class ScratchZone {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      this.isDrawing = false;
      this.revealed = false;
      this.lastCheck = 0;
      this.dpr = 1;
      this.width = 0;
      this.height = 0;
      this.pointerId = null;
      this.bind();
      this.resize();
    }

    bind() {
      this.canvas.addEventListener('pointerdown', (event) => {
        if (this.revealed) return;
        this.isDrawing = true;
        this.pointerId = event.pointerId;
        this.canvas.setPointerCapture?.(event.pointerId);
        this.erase(event);
      });

      this.canvas.addEventListener('pointermove', (event) => {
        if (!this.isDrawing || this.revealed) return;
        this.erase(event);
      });

      const end = (event) => {
        if (this.pointerId !== null && event.pointerId !== undefined && event.pointerId !== this.pointerId) return;
        this.isDrawing = false;
        this.pointerId = null;
      };
      this.canvas.addEventListener('pointerup', end);
      this.canvas.addEventListener('pointercancel', end);
      this.canvas.addEventListener('lostpointercapture', end);
    }

    resize() {
      if (this.revealed) return;
      const rect = this.root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = Math.max(1, Math.round(rect.width * this.dpr));
      this.canvas.height = Math.max(1, Math.round(rect.height * this.dpr));
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.paintFoil();
    }

    paintFoil() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      const foil = ctx.createLinearGradient(0, 0, w, h);
      foil.addColorStop(0, '#f7e6bf');
      foil.addColorStop(.2, '#d7ad68');
      foil.addColorStop(.45, '#faedcf');
      foil.addColorStop(.68, '#c9954e');
      foil.addColorStop(1, '#ead2a3');
      ctx.fillStyle = foil;
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = Math.max(.55, w / 210);
      for (let x = -h; x < w + h; x += Math.max(6, w / 17)) {
        ctx.strokeStyle = 'rgba(255,251,237,.25)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + h, h);
        ctx.stroke();
      }

      const glow = ctx.createRadialGradient(w * .34, h * .18, 0, w * .34, h * .18, Math.max(w, h));
      glow.addColorStop(0, 'rgba(255,255,255,.31)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(135,88,37,.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(.5, .5, Math.max(0, w - 1), Math.max(0, h - 1));
    }

    point(event) {
      const rect = this.canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    erase(event) {
      event.preventDefault();
      const { x, y } = this.point(event);
      const brush = Math.max(14, this.width * .19);
      const ctx = this.ctx;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const soft = ctx.createRadialGradient(x, y, brush * .24, x, y, brush);
      soft.addColorStop(0, 'rgba(0,0,0,1)');
      soft.addColorStop(.73, 'rgba(0,0,0,.99)');
      soft.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = soft;
      ctx.beginPath();
      ctx.arc(x, y, brush, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const now = performance.now();
      if (now - this.lastCheck > 170) {
        this.lastCheck = now;
        this.checkProgress();
      }
    }

    checkProgress() {
      const data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
      let transparent = 0;
      let sampled = 0;
      const stride = 64;
      for (let i = 3; i < data.length; i += stride) {
        sampled += 1;
        if (data[i] < 45) transparent += 1;
      }
      if (sampled && transparent / sampled >= .46) this.reveal();
    }

    reveal() {
      if (this.revealed) return;
      this.revealed = true;
      this.isDrawing = false;
      this.root.classList.add('is-revealed');
      if (navigator.vibrate) navigator.vibrate(9);
      window.dispatchEvent(new CustomEvent('scratch:revealed'));
    }
  }

  const scratchZones = [...document.querySelectorAll('.scratch-zone')].map(zone => new ScratchZone(zone));
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => scratchZones.forEach(zone => zone.resize()), 140);
  });

  window.addEventListener('scratch:revealed', () => {
    if (!scratchZones.every(zone => zone.revealed)) return;
    const dateArt = document.getElementById('dateArt');
    dateArt?.animate([
      { filter: 'brightness(1)' },
      { filter: 'brightness(1.035)', offset: .48 },
      { filter: 'brightness(1)' }
    ], { duration: 760, easing: 'ease-out' });
  });

  // Development/QA convenience only: ?preview=open lets screenshots inspect the interior without touching production behavior.
  if (new URLSearchParams(window.location.search).get('preview') === 'open') {
    window.setTimeout(openInvitation, 120);
  }
})();
