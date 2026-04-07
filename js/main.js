/* ===== ヘッダー・フローティングCTA ===== */
const hd=document.getElementById('hd'),fl=document.getElementById('fl');
window.addEventListener('scroll',()=>{
  hd.classList.toggle('scrolled',scrollY>30);
  fl.classList.toggle('show',scrollY>500);
});

/* ===== スクロール出現アニメーション ===== */
const ro=new IntersectionObserver(e=>{
  e.forEach(el=>{
    if(el.isIntersecting){el.target.classList.add('v');ro.unobserve(el.target);}
  });
},{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

/* ===== FAQ アコーディオン ===== */
document.querySelectorAll('.fq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const i=q.parentElement,w=i.classList.contains('open');
    document.querySelectorAll('.fq-i').forEach(x=>x.classList.remove('open'));
    if(!w)i.classList.add('open');
  });
});

/* ===== スムーズスクロール（sp-nav以外） ===== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  if(a.closest('#spNav')) return;
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t)window.scrollTo({top:t.getBoundingClientRect().top+scrollY-100,behavior:'smooth'});
  });
});

/* ===== スマホナビゲーション ===== */
(function(){
  var hbBtn=document.getElementById('hbBtn');
  var spNav=document.getElementById('spNav');
  var spOv=document.getElementById('spNavOverlay');
  if(!hbBtn||!spNav||!spOv) return;

  function closeNav(){
    hbBtn.classList.remove('open');
    spNav.classList.remove('open');
    spOv.classList.remove('open');
    document.body.style.overflow='';
  }

  hbBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var isOpen=spNav.classList.contains('open');
    if(isOpen){ closeNav(); }
    else {
      spNav.classList.add('open');
      spOv.classList.add('open');
      hbBtn.classList.add('open');
      document.body.style.overflow='hidden';
    }
  });

  /*
   * ▼ 修正ポイント
   * 旧: spOv.addEventListener('click', closeNav)
   *   → オーバーレイがCSSのz-indexでspNavの上に重なっていたため
   *     メニューリンクへのタップをオーバーレイが横取りし
   *     closeNavだけ走ってスクロール遷移されなかった。
   *
   * 新: documentレベルで「nav・hbBtn 外のクリック = 閉じる」に変更。
   */
  document.addEventListener('click',function(e){
    if(!spNav.classList.contains('open')) return;
    if(spNav.contains(e.target)||hbBtn.contains(e.target)) return;
    closeNav();
  });

  spNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(e){
      e.stopPropagation(); // documentのcloseNavハンドラを止める
      var href=this.getAttribute('href');
      if(href && href.charAt(0)==='#'){
        e.preventDefault();
        closeNav();
        setTimeout(function(){
          var target=document.getElementById(href.slice(1));
          if(target){
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.pageYOffset - 100,
              behavior: 'smooth'
            });
          }
        },50);
      } else {
        closeNav();
      }
    });
  });
})();

/* ===== カウントダウンタイマー ===== */
function tick(){
  var end=new Date('2026-04-30T23:59:59+09:00').getTime();
  var diff=Math.max(0,end-Date.now());
  var d=Math.floor(diff/864e5);
  var hr=Math.floor(diff%864e5/36e5);
  var mn=Math.floor(diff%36e5/6e4);
  var sc=Math.floor(diff%6e4/1e3);
  document.getElementById('cdD').textContent=d;
  document.getElementById('cdH').textContent=String(hr).padStart(2,'0');
  document.getElementById('cdM').textContent=String(mn).padStart(2,'0');
  document.getElementById('cdS').textContent=String(sc).padStart(2,'0');
}
tick();
setInterval(tick,1000);

/* ポップアップ（campPopup）はindex.htmlのinlineスクリプトで制御済み */
