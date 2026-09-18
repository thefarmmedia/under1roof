'use strict';

/* Rates supplied by the owner. Decorative flake $6–$8 / sq. ft., metallic $14–$16 / sq. ft.
   No minimum charge, trip charge or repair surcharge has been supplied, so the calculator
   applies none. Concrete condition and layout are collected for the estimate only and
   deliberately do not modify the range — if the owner supplies multipliers later, apply
   them here rather than in the markup. */
const RATES = Object.freeze({
  flake:    {low: 6,  high: 8,  label: 'Decorative flake'},
  metallic: {low: 14, high: 16, label: 'Metallic'}
});
const MAX_AREA = 100000;

const $  = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const money = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0});

const form      = $('#calculator-form');
const sqft      = $('#sqft');
const result    = $('#result');
const priceEl   = $('#price-range');
const detailEl  = $('#price-detail');
const condition = $('#condition');
const layout    = $('#layout');

const state = {project: 'Garage', finish: 'flake'};
let estimate = null;

/* ---------- option groups ---------- */
function choose(button) {
  const group = button.dataset.group;
  $$(`.opt[data-group="${group}"]`).forEach(b => {
    const on = b === button;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
  });
  state[group] = button.dataset.val;
  render();
}

$$('.opt').forEach(b => b.addEventListener('click', () => choose(b)));

/* ---------- square footage ---------- */
$$('.sqbtn').forEach(b => b.addEventListener('click', () => {
  sqft.value = b.dataset.area;
  render();
}));

function readArea() {
  const raw = sqft.value.trim();
  const area = Number(raw);
  return raw !== '' && Number.isInteger(area) && area > 0 && area <= MAX_AREA ? area : null;
}

/* ---------- render ---------- */
function render() {
  const area = readArea();
  const rate = RATES[state.finish];
  const valid = area !== null;

  estimate = valid
    ? {
        area,
        project: state.project,
        finish: rate.label,
        range: `${money.format(area * rate.low)} – ${money.format(area * rate.high)}`
      }
    : null;

  result.classList.toggle('invalid', !valid);
  priceEl.textContent  = valid ? estimate.range : 'Enter your square footage';
  detailEl.textContent = valid
    ? `${area.toLocaleString()} sq. ft. · ${state.project} · ${rate.label}`
    : `Use a whole number from 1 to ${MAX_AREA.toLocaleString()} sq. ft.`;

  $$('.sqbtn').forEach(b => {
    const on = valid && Number(b.dataset.area) === area;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
  });

  setSteps(valid);
  syncLead(valid);
}

function setSteps(valid) {
  $('#step1').className = 'step done';
  $('#conn1').className = 'connector done';
  $('#step2').className = valid ? 'step done' : 'step on';
  $('#conn2').className = valid ? 'connector done' : 'connector';
  $('#step3').className = valid ? 'step on' : 'step';
}

function syncLead(valid) {
  const summary = valid
    ? `${estimate.area.toLocaleString()} sq. ft. · ${estimate.project} · ${estimate.finish} · ${estimate.range}`
    : 'Tell us about your project below.';
  $('#quote-summary').textContent = summary;
  $('#lead-range').value = valid ? summary : '';
  $('#lead-project').value = state.project;
  $('#lead-details').value = `Condition: ${condition.value} · Layout: ${layout.value}`;
}

form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('submit', e => e.preventDefault());
form.addEventListener('reset', () => setTimeout(() => {
  state.project = 'Garage';
  state.finish = 'flake';
  $$('.opt').forEach(b => {
    const on = b.dataset.val === state[b.dataset.group];
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
  });
  render();
}, 0));

$('#use-estimate').addEventListener('click', e => {
  if (estimate) return;
  e.preventDefault();
  sqft.focus();
  sqft.select();
});

/* ---------- floor visualizer ---------- */
const frame = $('#floor-visualizer');

function selectColor(color) {
  $('#selected-color').textContent = `Selected: ${color}`;
  $('#lead-color').value = color;
}

window.addEventListener('message', e => {
  if (e.origin !== location.origin || e.source !== frame.contentWindow || !e.data) return;
  if (e.data.type === 'u1rVisualizerHeight' && Number.isFinite(e.data.height)) {
    frame.style.height = `${Math.max(400, Math.min(6000, e.data.height))}px`;
  }
  if (['u1rColor', 'u1rVisualizerQuote'].includes(e.data.type) && typeof e.data.color === 'string') {
    selectColor(e.data.color.slice(0, 80));
  }
  if (e.data.type === 'u1rVisualizerQuote') $('#calculator').scrollIntoView();
});

const requestedColor = new URLSearchParams(location.search).get('color');
if (requestedColor && /^[a-z -]{1,40}$/i.test(requestedColor)) {
  frame.src = `visualizer.html?color=${encodeURIComponent(requestedColor)}`;
  selectColor(requestedColor);
}

/* ---------- page chrome ---------- */
$('#year').textContent = new Date().getFullYear();
render();

/* Sales-call demo: the estimate form never sends personal information or creates a lead.
   Replace this handler with the real backend before launch — see README.md. */
$('#estimate-form').addEventListener('submit', e => {
  e.preventDefault();
  $('#form-status').textContent =
    'Demo complete — this is where your estimate request would be sent. No information has been submitted.';
});
