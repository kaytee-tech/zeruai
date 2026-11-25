const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const io=(el,fn,t=.15)=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){fn(e.target);o.disconnect()}},{threshold:t});o.observe(el)};
const rs=(c,x,cb)=>{const f=()=>{const q=devicePixelRatio||1,b=c.getBoundingClientRect();c.W=b.width;c.H=b.height;c.width=b.width*q;c.height=b.height*q;x.setTransform(q,0,0,q,0,0);cb&&cb()};f();addEventListener('resize',f)};
const vis=c=>{c.on=1;new IntersectionObserver(e=>c.on=e[0].isIntersecting).observe(c)};
/* Dotted orb: hover repels dots + speeds spin, tap/click sends a pulse */
function orb(c){const d=c.dataset,N=+d.n||300,s=+d.s||1,df=+d.d||0,mx=+d.m||0,dk=+d.k||0,r0=+d.r||1.4,col=d.c=='a'?'163,54,27':d.c=='g'?'60,58,55':'95,92,88',P=[],x=c.getContext('2d');
let t=Math.random()*6,k=0,m={x:-999,y:-999};
if(innerWidth<700&&N>800)c.dataset.n=N*.55,P.n=1;
const n=N>800&&innerWidth<700?N*.55|0:N;
for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),a=i*2.39996;P.push({x:Math.cos(a)*r,y,z:Math.sin(a)*r,a:mx&&i%mx==0,ox:0,oy:0})}
for(let i=0;i<dk;i++){const a=Math.random()*6.28,r=1.5+Math.random()*1.3;P.push({x:Math.cos(a)*r,y:(Math.random()-.5)*.15,z:Math.sin(a)*r,a:i%3==0,g:1,ox:0,oy:0})}
rs(c,x);vis(c);
c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect();m={x:e.clientX-b.left,y:e.clientY-b.top}});
c.addEventListener('pointerleave',()=>m={x:-999,y:-999});c.addEventListener('pointerdown',()=>k=1);
(function f(){requestAnimationFrame(f);if(!c.on)return;const W=c.W,H=c.H;t+=.004*(1+(m.x>0?1.6:0)+k*5);k*=.95;x.clearRect(0,0,W,H);
const R=Math.min(W,H)*.4*s,cs=Math.cos(t),sn=Math.sin(t),tl=dk?.35:0;
for(const p of P){const q=1+df*Math.sin(p.y*4+t*3)*Math.cos(p.x*3-t*2)+(p.g?0:k*.12*Math.sin(p.y*12-t*30));
const X=p.x*cs+p.z*sn,Z=-p.x*sn+p.z*cs;let sx=W/2+X*R*q,sy=H/2+(p.y*(1-tl)+Z*tl)*R*q;
const dx=sx-m.x,dy=sy-m.y,ds=Math.hypot(dx,dy)||1,pw=ds<110?(1-ds/110)*38:0;
p.ox+=(dx/ds*pw-p.ox)*.12;p.oy+=(dy/ds*pw-p.oy)*.12;sx+=p.ox;sy+=p.oy;
const dp=(Z+1.5)/3;x.fillStyle=`rgba(${p.a?'163,54,27':col},${.25+.75*dp})`;x.beginPath();x.arc(sx,sy,r0*(.5+dp)*(pw?1.5:1),0,6.283);x.fill()}})()}
$$('canvas[data-n]').forEach(orb);
/* Wave */
(function(){const c=$('#wave'),x=c.getContext('2d');let t=0;rs(c,x);vis(c);(function f(){requestAnimationFrame(f);if(!c.on)return;t+=.025;const W=c.W,H=c.H;x.clearRect(0,0,W,H);
for(let s=0;s<2;s++)for(let i=0;i<W;i+=6){const u=i/W,y=H/2+Math.sin(u*14+t+s*3.14)*H*.3*(1-u*.5)*Math.cos(u*3);x.fillStyle=s?`rgba(163,54,27,${1-u*.8})`:`rgba(40,38,35,${.9-u*.8})`;x.fillRect(i,y,2.2,2.2)}})()})();
/* Dot grids */
$$('.dg').forEach(g=>{const w=+g.dataset.w,r=+g.dataset.r,T=w*r,h=Math.round(T*g.dataset.g/100*(w>20?.4:1));g.style.setProperty('--w',w);
for(let i=0;i<T;i++){const e=document.createElement('i');e.dataset.h=i>=T-h?1:0;g.append(e)}
io(g,()=>$$('i',g).forEach((e,i)=>e.dataset.h==1&&setTimeout(()=>e.classList.add('h'),i*6)))});
/* Counters */
$$('[data-ct]').forEach(e=>io(e,()=>{const T=+e.dataset.ct;let t0;const f=n=>{t0=t0||n;const p=Math.min((n-t0)/1600,1);e.textContent=Math.round(T*(1-Math.pow(1-p,3)))+e.dataset.sf;p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)}));
/* Marquees */
$$('.tr').forEach(t=>t.innerHTML+=t.innerHTML);
/* Reveal + nav */
$$('.rv').forEach(e=>io(e,t=>t.classList.add('in'),.08));
addEventListener('scroll',()=>$('#nav').classList.toggle('sc',scrollY>10),{passive:true});
/* Mobile menu */
const bg=$('#bg'),mm=$('#mm'),tg=o=>{mm.classList.toggle('open',o);$('i',bg).className=o?'ri-close-line':'ri-menu-line'};
bg.onclick=()=>tg(!mm.classList.contains('open'));$$('a',mm).forEach(a=>a.addEventListener('click',()=>tg(false)));
addEventListener('resize',()=>innerWidth>1100&&tg(false));
/* Tabs (auto-cycle until touched) */
const tabs=$$('.tab');let ti=2,auto=setInterval(()=>{ti=(ti+1)%3;sel(ti)},3200);
const sel=i=>tabs.forEach((t,j)=>t.classList.toggle('on',i==j));
tabs.forEach((t,i)=>{t.onclick=()=>{clearInterval(auto);sel(i)};t.onmouseenter=()=>{clearInterval(auto);sel(i)}});
/* Activity flow highlight */
const st=$$('#steps>div');let si=4;const cyc=setInterval(()=>{si=(si+1)%5;st.forEach((e,i)=>e.classList.toggle('on',i==si))},1700);
st.forEach((e,i)=>{e.onmouseenter=()=>{clearInterval(cyc);st.forEach((s,j)=>s.classList.toggle('on',i==j))}});st[4].classList.add('on');
/* Stack hover */
const ly=$$('#stack .ly'),pl=$$('.pl li'),hl=i=>{ly.forEach((l,j)=>l.classList.toggle('on',i==j));pl.forEach((l,j)=>l.classList.toggle('on',i==j))};
pl.forEach((l,i)=>{l.onmouseenter=()=>hl(i);l.onclick=()=>hl(i)});ly.forEach((l,i)=>{l.onmouseenter=()=>hl(i)});$('#stack').onmouseleave=()=>hl(-1);
/* Proof graph */
const gr=$('#gr'),N=['GAIB','CITREA','UNLLOO','BION','UPSCALE','CHANGENOW','ASPEN','DITTO'];let sv='<svg viewBox="-100 -100 200 200">',lb='';
N.forEach((n,i)=>{const a=i/N.length*6.283-1.2,X=Math.cos(a)*88,Y=Math.sin(a)*82;sv+=`<line data-n="${n}" x1="0" y1="0" x2="${X}" y2="${Y}"/>`;lb+=`<b data-n="${n}" style="left:${50+X/2}%;top:${50+Y/2}%">${n}</b>`});
gr.insertAdjacentHTML('beforeend',sv+'</svg>'+lb);
const on=(n,v)=>$$(`[data-n="${n}"]`).forEach(e=>e.classList.toggle('on',v));
$$('.row').forEach(r=>{r.onmouseenter=()=>on(r.dataset.n,1);r.onmouseleave=()=>on(r.dataset.n,0)});
$$('#gr b').forEach(b=>{b.onmouseenter=()=>on(b.dataset.n,1);b.onmouseleave=()=>on(b.dataset.n,0)});
