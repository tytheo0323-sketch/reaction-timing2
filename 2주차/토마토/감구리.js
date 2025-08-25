const $=id=>document.getElementById(id);
const panel=$("panel"),hint=$("hint"),cnt=$("counter"),res=$("result");
const startBtn=$("startBtn"),resetBtn=$("resetBtn"),hist=$("history");
const MAX=Number(window.__TRIES__||5),PENALTY=1000,KEY="rt_board";
let n=0,t0=null,timer=null,rec=[];

function hud(){ cnt.textContent=`도전 횟수: ${n} / ${MAX}`; hist.innerHTML=rec.map((v,i)=>`<li>${i+1}회: ${v} ms</li>`).join(""); }
function reset(){ n=0;rec=[];clearTimeout(timer);t0=null;panel.textContent="READY";panel.className="panel ready";res.textContent="결과가 여기에 표시됩니다.";hint.textContent="START 버튼을 누르면 시작합니다.";startBtn.disabled=false;hud();}
function start(){ if(n>=MAX)return;panel.textContent="WAIT...";panel.className="panel wait";hint.textContent="색이 바뀌면 즉시 클릭!";timer=setTimeout(()=>{panel.textContent="CLICK!";panel.className="panel go";t0=performance.now();},Math.random()*2000+700);}
function click(){
  if(panel.classList.contains("wait")){
    clearTimeout(timer);n++;rec.push(PENALTY);res.textContent=`실패! 너무 빨랐습니다. (${PENALTY}ms)`;panel.textContent="READY";panel.className="panel ready";hud();if(n>=MAX)finish();return;}
  if(panel.classList.contains("go")&&t0){
    const rt=Math.round(performance.now()-t0);n++;rec.push(rt);res.textContent=`반응속도: ${rt} ms`;panel.textContent="READY";panel.className="panel ready";hud();if(n>=MAX)finish();}
}
function finish(){
  startBtn.disabled=true;hint.textContent="";
  const avg=Math.round(rec.reduce((a,b)=>a+b,0)/rec.length);
  hist.innerHTML="";cnt.textContent="";res.innerHTML=`<div class="final-result">당신의 결과는 이겁니다 🎉<br><strong>${avg} ms</strong></div>`;
  const name=sessionStorage.getItem("rt_nick")||"익명";
  const board=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}})();
  board.push({name,avg,tries:MAX,time:new Date().toLocaleString()});
  board.sort((a,b)=>a.avg-b.avg||a.time.localeCompare(b.time));
  localStorage.setItem(KEY,JSON.stringify(board.slice(0,10)));
}

startBtn.addEventListener("click",start);
resetBtn.addEventListener("click",reset);
panel.addEventListener("click",click);
panel.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")click();});
reset();
// … 위 코드 동일 …

function finish(){
  startBtn.disabled = true;
  hint.textContent = "";

  const avg = Math.round(rec.reduce((a,b)=>a+b,0) / rec.length);

  // 전 기록 숨김
  hist.innerHTML="";
  cnt.textContent="";
  res.innerHTML = `
    <div class="final-result">
      당신의 결과는 이겁니다 🎉<br><strong>${avg} ms</strong>
    </div>
  `;

  // 리더보드 저장 (생략 없이 기존 그대로)
  const name=sessionStorage.getItem("rt_nick")||"익명";
  const board=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}})();
  board.push({name,avg,tries:MAX,time:new Date().toLocaleString()});
  board.sort((a,b)=>a.avg-b.avg||a.time.localeCompare(b.time));
  localStorage.setItem(KEY,JSON.stringify(board.slice(0,10)));
}

// … 아래 코드 동일 …
