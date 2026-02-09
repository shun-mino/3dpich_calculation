function showTab(id) {
  document.querySelectorAll(".tab")
    .forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function pitch(area) {
  const L = heater.value;
  return (area / L).toFixed(2);
}

/* 四角柱 */
function calcBox() {
  const x=bx.value,y=by.value,h=bh.value;
  const A = 2*(x*y + x*h + y*h);
  br.textContent = `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 円柱 */
function calcCyl() {
  const r = cd.value/2, h=ch.value;
  const A = 2*Math.PI*r*(r+h);
  cr.textContent = `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 円錐 */
function calcCone() {
  const r = co_d.value/2, h=co_h.value;
  const l = Math.sqrt(r*r + h*h);
  const A = Math.PI*r*(r+l);
  cor.textContent = `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 四角錐 */
function calcPyr() {
  const x=px.value,y=py.value,h=ph.value;
  const sx=Math.sqrt((y/2)**2+h**2);
  const sy=Math.sqrt((x/2)**2+h**2);
  const A = x*y + 2*(x*sx + y*sy);
  pr.textContent = `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* Lアングル */
function calcAng() {
  const x=ax.value,y=ay.value,h=ah.value,t=at.value;
  const per = 2*(x+y) - 2*(x-t+y-t);
  const A = per*h + 2*(x*y-(x-t)*(y-t));
  ar.textContent = `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 台形柱 */
function calcTrap() {
  const a=ta.value,b=tb.value,h=th.value,d=td.value;
  const sl = Math.sqrt(((b-a)/2)**2+h**2);
  const A = (a+b)*d + 2*(d*sl) + a*b;
  tr.textContent = `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}
