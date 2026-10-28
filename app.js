'use strict';
const $=id=>document.getElementById(id);
const cfg=JSON.parse(localStorage.getItem('jarvis_cfg')||'{}');
const history=JSON.parse(localStorage.getItem('jarvis_history')||'[]');
const memories=JSON.parse(localStorage.getItem('jarvis_memories')||'[]');
const personality='Eres Jarvis, un asistente personal cercano, simpático y breve. Hablas español de España, con humor suave. Responde normalmente en 1-3 frases. No inventes datos. Recuerdos del usuario: '+memories.join('; ');
let busy=false,recognition=null;
function setStatus(s,label){$('orb').className='orb '+s;$('status').textContent=label;}
function show(t){$('answer').textContent=t;}
function speak(t){if(cfg.voice==='off'||!('speechSynthesis'in window)){setStatus('','LISTO PARA AYUDARTE');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='es-ES';u.rate=1.02;u.onstart=()=>setStatus('speaking','HABLANDO');u.onend=()=>setStatus('','LISTO PARA AYUDARTE');u.onerror=()=>setStatus('','LISTO PARA AYUDARTE');speechSynthesis.speak(u);}
function reply(t){show(t);speak(t);busy=false;}
async function ask(raw){if(busy)return;const text=raw.trim();if(!text)return;busy=true;setStatus('thinking','PENSANDO');show('Tú: '+text);const local=offlineCommand(text);if(local){reply(local);return;}if(!cfg.endpoint){reply('Eso todavía no lo sé hacer sin IA, illo. Prueba a pedirme un cálculo, chiste, vacilada, piropo, consejo, la hora o abrir una app.');return;}try{const url=new URL(cfg.endpoint);if(url.protocol!=='https:')throw Error('La URL debe usar HTTPS.');const messages=[{role:'system',content:personality.replace(/Recuerdos del usuario:.*/, 'Recuerdos del usuario: '+memories.join('; '))},...history.slice(-12),{role:'user',content:text}];const res=await fetch(url.href,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:cfg.model||'default',messages,stream:false})});if(!res.ok)throw Error('El servidor respondió '+res.status);const data=await res.json();const answer=data.choices?.[0]?.message?.content||data.message?.content;if(typeof answer!=='string')throw Error('Formato de respuesta no compatible');history.push({role:'user',content:text},{role:'assistant',content:answer});if(history.length>24)history.splice(0,history.length-24);localStorage.setItem('jarvis_history',JSON.stringify(history));reply(answer);}catch(e){reply('No he podido conectar con la IA: '+e.message+'. Comprueba la URL, el acceso CORS y que el servidor esté encendido.');}}
$('chat').addEventListener('submit',e=>{e.preventDefault();const t=$('message').value;$('message').value='';ask(t);});
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
function listen(){if(busy)return;if(!SpeechRecognition){show('Este navegador no ofrece reconocimiento de voz para esta web. Puedes escribir a Jarvis abajo.');return;}try{recognition=new SpeechRecognition();recognition.lang='es-ES';recognition.interimResults=false;recognition.maxAlternatives=1;recognition.onstart=()=>setStatus('listening','ESCUCHANDO');recognition.onresult=e=>{const t=e.results[0][0].transcript;recognition=null;ask(t);};recognition.onerror=e=>{setStatus('','LISTO PARA AYUDARTE');show('No se pudo usar el micrófono ('+e.error+'). Prueba Safari o usa el teclado.');};recognition.onend=()=>{if(!busy)setStatus('','LISTO PARA AYUDARTE');};recognition.start();}catch(e){show('Error al iniciar el micrófono: '+e.message);}}
$('orb').addEventListener('click',listen);$('orb').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();listen();}});
$('settingsBtn').onclick=()=>{$('endpoint').value=cfg.endpoint||'';$('model').value=cfg.model||'';$('username').value=cfg.username||'';$('voice').value=cfg.voice||'on';$('settings').showModal();};
$('save').onclick=()=>{cfg.endpoint=$('endpoint').value.trim();cfg.model=$('model').value.trim();cfg.username=$('username').value.trim();cfg.voice=$('voice').value;localStorage.setItem('jarvis_cfg',JSON.stringify(cfg));$('settings').close();show('Configuración guardada.');};
$('clear').onclick=()=>{if(confirm('¿Borrar la memoria y el historial de Jarvis de este dispositivo?')){memories.length=0;history.length=0;localStorage.removeItem('jarvis_memories');localStorage.removeItem('jarvis_history');show('Memoria borrada.');}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

// Los accesos de la parte inferior intentan abrir la aplicación instalada.
document.querySelectorAll('[data-app]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();abrirApp(a.dataset.app);}));
