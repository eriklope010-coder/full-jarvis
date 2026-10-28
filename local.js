'use strict';
const JARVIS_APPS={youtube:'youtube://',google:'googlechrome://www.google.com',gmail:'googlegmail://',correo:'googlegmail://',spotify:'spotify:',whatsapp:'whatsapp://',netflix:'nflx://',twitch:'twitch://',instagram:'instagram://app',tiktok:'snssdk1233://',maps:'maps://',mapas:'maps://',calendario:'calshow://',fotos:'photos-redirect://',drive:'googledrive://',traductor:'googletranslate://',amazon:'amazon://',wikipedia:'wikipedia://',chatgpt:'chatgpt://',telegram:'tg://',discord:'discord://',reddit:'reddit://'};
const JARVIS_WEB={youtube:'https://www.youtube.com',google:'https://www.google.com',gmail:'https://mail.google.com',correo:'https://mail.google.com',spotify:'https://open.spotify.com',whatsapp:'https://wa.me/',netflix:'https://www.netflix.com',twitch:'https://www.twitch.tv',instagram:'https://www.instagram.com',tiktok:'https://www.tiktok.com',maps:'https://maps.apple.com',mapas:'https://maps.apple.com',calendario:'https://calendar.google.com',fotos:'https://photos.google.com',drive:'https://drive.google.com',traductor:'https://translate.google.com',amazon:'https://www.amazon.es',wikipedia:'https://es.wikipedia.org',chatgpt:'https://chatgpt.com',telegram:'https://web.telegram.org',discord:'https://discord.com/app',reddit:'https://www.reddit.com'};
function abrirApp(name){const scheme=JARVIS_APPS[name];if(!scheme)return false;const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);if(isIOS){window.location.href=scheme;}else{window.open(JARVIS_WEB[name],'_blank','noopener');}return true;}

const JARVIS_BANK={
chistes:['¿Qué le dice un bit a otro? Nos vemos en el bus.','¿Por qué el ordenador fue al médico? Porque tenía un virus.','¿Qué hace una abeja en el gimnasio? ¡Zumba!','¿Qué le dice un cero a un ocho? Bonito cinturón.','¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs.','¿Qué le dice un pez a otro pez? Nada.','¿Cómo se despiden los químicos? Ácido un placer.','¿Por qué el libro de matemáticas estaba triste? Porque tenía muchos problemas.','¿Qué le dice una pared a otra? Nos vemos en la esquina.','¿Cuál es el colmo de un electricista? Que su mujer se llame Luz.','Mi wifi y yo tenemos algo en común: desaparecemos cuando más nos necesitan.','Un programador va a por pan. Le dicen: compra uno, y si hay huevos, trae seis. Vuelve con seis panes.'],
vaciladas:['Tienes tantas pestañas abiertas que tu móvil ya pide vacaciones.','Eres de los que miran la nevera tres veces esperando que aparezca pizza.','Tú no llegas tarde, haces entradas dramáticas.','Tienes más capturas de pantalla que recuerdos en el carrete.','Tu despertador ya se ha rendido contigo, illo.','Si procrastinar fuera un deporte, mañana te daban la medalla.','Tu batería dura más que tus ganas de madrugar.','Eres capaz de perder el móvil mientras lo tienes en la mano.','Tú dices cinco minutitos y el reloj empieza a llorar.','Tu móvil tiene tantas notificaciones que parece una central de emergencias.'],
piropos:['Tienes una sonrisa que mejora hasta los lunes.','No sé qué filtro usas, pero en persona seguro que ganas.','Si las miradas hablaran, la tuya tendría una historia entera.','Eres esa casualidad que a uno le gustaría repetir.','No hace falta que brilles más, ya se te nota.','Contigo hasta una conversación corta se hace especial.','Hay personas que alegran el día sin darse cuenta. Tú eres una.','No sé si eres mi tipo, pero desde luego has cambiado mis preferencias.','Tienes ese algo que no se puede explicar con una foto.','Si el tiempo vuela contigo, que no aterrice todavía.'],
consejos:['No tomes decisiones importantes solo por un mal día.','Si algo te importa, empieza por un paso pequeño y concreto.','Escucha a quien te quiere, pero decide también por ti.','No confundas tener prisa con avanzar.','Si una conversación te preocupa, habla claro y con respeto.','Descansar también forma parte de hacerlo bien.','No prometas algo que no sabes si podrás cumplir.','No tienes que gustarle a todo el mundo para valer mucho.','Antes de responder enfadado, espera un momento y piensa qué quieres conseguir.','Si te equivocas, corrige lo que puedas y aprende para la próxima.'],
datos:['Los pulpos tienen tres corazones.','La luz del Sol tarda unos ocho minutos en llegar a la Tierra.','Los wombats hacen caca en forma de cubo.','La primera cámara web se creó para vigilar una cafetera.','Un día en Venus dura más que su año.','La palabra murciélago tiene las cinco vocales.'],
animos:['Un paso pequeño sigue siendo un paso, illo.','No hace falta que hoy salga todo perfecto.','Has avanzado más de lo que parece.','Pide ayuda cuando la necesites; no tienes que hacerlo todo solo.']};
let lastPicks={};
function pick(kind){const a=JARVIS_BANK[kind];let i=Math.floor(Math.random()*a.length);if(a.length>1&&i===lastPicks[kind])i=(i+1)%a.length;lastPicks[kind]=i;return a[i];}
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[¿?¡!]/g,'').trim();}
// Convierte números dictados en español a cifras antes de calcular.
const NUMEROS_VOZ={cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18,diecinueve:19,veinte:20,veintiuno:21,veintiun:21,veintidos:22,veintitres:23,veinticuatro:24,veinticinco:25,veintiseis:26,veintisiete:27,veintiocho:28,veintinueve:29,treinta:30,cuarenta:40,cincuenta:50,sesenta:60,setenta:70,ochenta:80,noventa:90,cien:100,ciento:100,doscientos:200,trescientos:300,cuatrocientos:400,quinientos:500,seiscientos:600,setecientos:700,ochocientos:800,novecientos:900,mil:1000};
function numerosHablados(texto){
 const palabras=texto.split(/\s+/),salida=[];
 for(let i=0;i<palabras.length;){
  if(!Object.prototype.hasOwnProperty.call(NUMEROS_VOZ,palabras[i])){salida.push(palabras[i++]);continue;}
  let total=0,grupo=0,j=i,ultimo=-1;
  while(j<palabras.length){
   const w=palabras[j];if(w==='y'&&j+1<palabras.length&&NUMEROS_VOZ[palabras[j+1]]!==undefined&&ultimo>=30&&ultimo%10===0){j++;continue;}
   if(NUMEROS_VOZ[w]===undefined)break;
   const n=NUMEROS_VOZ[w];
   if(n===1000){grupo=Math.max(1,grupo)*1000;total+=grupo;grupo=0;}
   else if(n>=100){grupo+=n;}
   else if(n>=20&&n%10===0){grupo+=n;}
   else if(n<10&&ultimo>=20&&ultimo%10===0){grupo+=n;}
   else if(ultimo>=0&&ultimo<100&&n<100)break;
   else grupo+=n;
   ultimo=n;j++;
  }
  salida.push(String(total+grupo));i=j;
 }
 return salida.join(' ');
}
function calculate(s){let t=numerosHablados(norm(s).replace(/\b(?:jarvis|oye|por favor|dime|me puedes decir|puedes decirme|cuanto seria|cuantos son|cuanto son)\b/g,' ').replace(/\b(?:multiplicado por|multiplica por)\b/g,' por ').replace(/\b(?:dividido entre|dividido por)\b/g,' entre ').replace(/\b(?:la raiz cuadrada de)\b/g,' raiz cuadrada de ')).replace(/\b(cuanto es|cuanto da|calcula|calculame|resuelve|resultado de|haz la cuenta de|haz|operacion)\b/g,'').replace(/\b(mas)\b/g,'+').replace(/\b(menos)\b/g,'-').replace(/\b(por|multiplicado por|multiplica(?:do)? por)\b/g,'*').replace(/\b(entre|dividido por|dividido entre)\b/g,'/').replace(/\b(elevado a|a la potencia de)\b/g,'^').replace(/\bcoma\b/g,'.').replace(/\b(pi)\b/g,String(Math.PI)).replace(/\b(raiz cuadrada de)\s*(\d+(?:[.,]\d+)?)/g,'sqrt($2)').replace(/\s+/g,'').replace(/(\d),(\d)/g,'$1.$2');
if(!/[0-9]/.test(t)||t.length>120||!/^[\d.+\-*/%^()a-z]+$/.test(t))return null;
const tokens=t.match(/sqrt|\d+(?:\.\d+)?|[()+\-*/%^]/g);if(!tokens||tokens.join('')!==t)return null;let p=0;
function primary(){let x=tokens[p++];if(x==='+'||x==='-'){const v=primary();return x==='-'?-v:v;}if(x==='('){let v=expr();if(tokens[p++]!==')')throw Error();return v;}if(x==='sqrt'){if(tokens[p++]!=='(')throw Error();let v=expr();if(tokens[p++]!==')'||v<0)throw Error();return Math.sqrt(v);}if(!x||!/^(?:\d+(?:\.\d+)?)$/.test(x))throw Error();return Number(x);}
function power(){let v=primary();if(tokens[p]==='^'){p++;const b=power();if(Math.abs(b)>50||Math.abs(v)>1e8)throw Error();v=Math.pow(v,b);}return v;}
function term(){let v=power();while(['*','/','%'].includes(tokens[p])){let op=tokens[p++],b=power();v=op==='*'?v*b:op==='/'?v/b:v%b;}return v;}
function expr(){let v=term();while(['+','-'].includes(tokens[p])){let op=tokens[p++],b=term();v=op==='+'?v+b:v-b;}return v;}
try{let n=expr();if(p!==tokens.length||!Number.isFinite(n)||Math.abs(n)>1e15)throw Error();return 'El resultado es '+Number(n.toPrecision(12)).toLocaleString('es-ES',{maximumFractionDigits:10})+'.';}catch{return 'Esa operación no la he podido calcular. Prueba con números, paréntesis, suma, resta, multiplicación o división.';}}
function offlineCommand(raw){
// Prioridad al motor matemático para porcentajes y problemas, también por voz.
if(typeof matesResolver==='function'){const resultadoMates=matesResolver(raw);if(resultadoMates)return resultadoMates;}
const t=norm(raw).replace(/^(oye |ey |hola )?(jarvis|yarvis|garvis|harvis|jarbis)[, ]*/,'').trim();const now=new Date();
if(/^(hola|buenas|hey|que tal|estas ahi|despierta)$/.test(t))return 'Buenas, illo. Aquí estoy. ¿Qué necesitas?';
if(/\b(que hora es|dime la hora|hora tienes|hora actual)\b/.test(t))return 'Son las '+now.toLocaleTimeString('es-ES',{hour:'numeric',minute:'2-digit'})+'.';
if(/\b(que dia es|fecha de hoy|que fecha|dia de hoy)\b/.test(t))return 'Hoy es '+now.toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+'.';
if(/\b(chiste|hazme reir|algo gracioso)\b/.test(t))return pick('chistes');
if(/\b(vacila|vacilada|vacile|roast|metete conmigo)\b/.test(t))return pick('vaciladas');
if(/\b(piropo|pirope|ligar|frase bonita|frase romantica)\b/.test(t))return pick('piropos');
if(/\b(consejo|aconseja|recomendacion|que me recomiendas)\b/.test(t))return pick('consejos');
if(/\b(dato curioso|curiosidad)\b/.test(t))return pick('datos');
if(/\b(animame|motivame|dame animos)\b/.test(t))return pick('animos');
if(/\b(que puedes hacer|ayuda|comandos|funciones)\b/.test(t))return 'Sin servidor puedo hacer cálculos, contar chistes, vacilarte, decir piropos, dar consejos, decir la hora y fecha, recordar cosas y abrir aplicaciones. Pídeme lo que quieras.';
if(/\b(recuerda que|acuerdate de)\b/.test(t)){const m=raw.replace(/^.*?(?:recuerda que|acu[eé]rdate de)\s*/i,'').trim();if(m){memories.push(m);localStorage.setItem('jarvis_memories',JSON.stringify(memories));return 'Apuntado, illo. Lo recordaré en este dispositivo.';}}
if(/\b(que recuerdas|que sabes de mi)\b/.test(t))return memories.length?'Recuerdo esto: '+memories.join('; '):'Todavía no me has pedido que recuerde nada.';
const app=t.match(/\b(?:abre|abrir|entra en|ir a|llevame a)\s+(?:la app de |la aplicacion de |el |la )?([a-z]+)\b/);if(app){const name=app[1];if(JARVIS_APPS[name]){abrirApp(name);return 'Intentando abrir '+name+'. Si no se abre, comprueba que tienes la app instalada.';}return 'Desde Safari no puedo abrir esa aplicación directamente. Prueba con una web como YouTube, Spotify, Instagram, TikTok o WhatsApp.';}
if(/\b(calcula|calculame|cuanto es|cuanto da|cuanto seria|cuantos son|cuanto son|resuelve|resultado de|operacion|haz la cuenta|suma|resta|multiplica|divide|raiz cuadrada)\b/.test(t)||/\b(?:mas|menos|por|entre|multiplicado|dividido|elevado)\b/.test(t)&&(/\d/.test(t)||Object.keys(NUMEROS_VOZ).some(n=>new RegExp('\\b'+n+'\\b').test(t)))||/^[\d\s()+\-*/%^.,]+$/.test(t)){const r=calculate(t);if(r)return r;}
return null;}
