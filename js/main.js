const hd=document.getElementById('hd'),fl=document.getElementById('fl');
window.addEventListener('scroll',()=>{hd.classList.toggle('scrolled',scrollY>30);fl.classList.toggle('show',scrollY>500);});
const ro=new IntersectionObserver(e=>{e.forEach(el=>{if(el.isIntersecting){el.target.classList.add('v');ro.unobserve(el.target);}});},{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));
document.querySelectorAll('.fq-q').forEach(q=>{q.addEventListener('click',()=>{const i=q.parentElement,w=i.classList.contains('open');document.querySelectorAll('.fq-i').forEach(x=>x.classList.remove('open'));if(!w)i.classList.add('open');});});
/* sp-navの項目はinline scriptで管理するためスキップ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  if(a.closest('#spNav')) return;
  a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)window.scrollTo({top:t.getBoundingClientRect().top+scrollY-100,behavior:'smooth'});});
});
function tick(){const end=new Date('2026-04-30T23:59:59+09:00').getTime(),diff=Math.max(0,end-Date.now()),d=Math.floor(diff/864e5),hr=Math.floor(diff%864e5/36e5),mn=Math.floor(diff%36e5/6e4),sc=Math.floor(diff%6e4/1e3);document.getElementById('cdD').textContent=d;document.getElementById('cdH').textContent=String(hr).padStart(2,'0');document.getElementById('cdM').textContent=String(mn).padStart(2,'0');document.getElementById('cdS').textContent=String(sc).padStart(2,'0');}
tick();setInterval(tick,1000);
