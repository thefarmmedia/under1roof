'use strict';
const RATES = Object.freeze({flake:{low:6,high:8,label:'Decorative flake'},metallic:{low:14,high:16,label:'Metallic'}});
const calc=document.querySelector('#calculator-form');
const sqft=document.querySelector('#sqft');
const project=document.querySelector('#project');
const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
let currentEstimate=null;
function calculate(){
 const area=Number(sqft.value),finish=new FormData(calc).get('finish'),rate=RATES[finish];
 const valid=sqft.value.trim()!==''&&Number.isInteger(area)&&area>0&&area<=100000;
 currentEstimate=valid?{area,finish,range:`${money.format(area*rate.low)} – ${money.format(area*rate.high)}`} : null;
 document.querySelector('#price-range').textContent=valid?currentEstimate.range:'Enter a valid area';
 document.querySelector('#price-detail').textContent=valid?`${area.toLocaleString()} sq. ft. · ${rate.label}`:'Use a whole number from 1 to 100,000 sq. ft.';
 const summary=valid?`${area.toLocaleString()} sq. ft. · ${rate.label} · ${currentEstimate.range}`:'Tell us about your project below.';
 document.querySelector('#project-summary').textContent=summary;
 document.querySelector('#lead-range').value=valid?summary:'';
 document.querySelector('#lead-project').value=project.value;
 document.querySelectorAll('[data-area]').forEach(b=>b.classList.toggle('active',valid&&Number(b.dataset.area)===area));
}
calc.addEventListener('input',calculate);
calc.addEventListener('change',calculate);
calc.addEventListener('submit',e=>e.preventDefault());
calc.addEventListener('reset',()=>setTimeout(calculate,0));
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>{sqft.value=b.dataset.area;calculate()}));
document.querySelector('#use-estimate').addEventListener('click',e=>{if(!currentEstimate){e.preventDefault();sqft.reportValidity();sqft.focus()}});
const frame=document.querySelector('#floor-visualizer');
function selectColor(color){document.querySelector('#selected-color').textContent=`Selected: ${color}`;document.querySelector('#lead-color').value=color}
window.addEventListener('message',e=>{
 if(e.origin!==location.origin||e.source!==frame.contentWindow||!e.data)return;
 if(e.data.type==='u1rVisualizerHeight'&&Number.isFinite(e.data.height))frame.style.height=`${Math.max(400,Math.min(6000,e.data.height))}px`;
 if(['u1rColor','u1rVisualizerQuote'].includes(e.data.type)&&typeof e.data.color==='string')selectColor(e.data.color.slice(0,80));
 if(e.data.type==='u1rVisualizerQuote')document.querySelector('#calculator').scrollIntoView();
});
document.querySelectorAll('[data-color]').forEach(a=>a.addEventListener('click',()=>{frame.src=`visualizer.html?color=${encodeURIComponent(a.dataset.color)}`;selectColor(a.dataset.color)}));
const requestedColor=new URLSearchParams(location.search).get('color');
if(requestedColor&&/^[a-z -]{1,40}$/i.test(requestedColor)){frame.src=`visualizer.html?color=${encodeURIComponent(requestedColor)}`;selectColor(requestedColor)}
calculate();document.querySelector('#year').textContent=new Date().getFullYear();
// Sales-call demo: never send personal information or create a lead.
const leadForm=document.querySelector('#estimate-form');
leadForm.addEventListener('submit',e=>{
 e.preventDefault();
 document.querySelector('#form-status').textContent='Demo complete — this is where your estimate request would be sent. No information has been submitted.';
});
