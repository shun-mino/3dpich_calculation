function showTab(id) {
  document.querySelectorAll(".tab")
    .forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function pitch(area) {
  const L = Number(document.getElementById("heater").value);
  if (!L || L <= 0) return "ヒーター長さ未入力";
  return (area / L).toFixed(2);
}

/* 四角柱 */
function calcBox() {
  const x = Number(document.getElementById("bx").value);
  const y = Number(document.getElementById("by").value);
  const h = Number(document.getElementById("bh").value);

  const A = 2 * (x*y + x*h + y*h);
  document.getElementById("br").textContent =
    `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 円柱 */
function calcCyl() {
  const d = Number(document.getElementById("cd").value);
  const h = Number(document.getElementById("ch").value);
  const r = d / 2;

  const A = 2 * Math.PI * r * h;
  document.getElementById("cr").textContent =
    `側面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 円錐 */
function calcCone() {
  const d = Number(document.getElementById("co_d").value);
  const h = Number(document.getElementById("co_h").value);
  const r = d / 2;
  const l = Math.sqrt(r*r + h*h);

  const A = Math.PI * r * l;
  document.getElementById("cor").textContent =
    `側面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 四角錐 */
function calcPyr() {
  const x = Number(document.getElementById("px").value);
  const y = Number(document.getElementById("py").value);
  const h = Number(document.getElementById("ph").value);

  const sx = Math.sqrt((y/2)**2 + h**2);
  const sy = Math.sqrt((x/2)**2 + h**2);
  const A = x*y + 2*(x*sx + y*sy);
  const B = 2*(x*sx + y*sy);

  document.getElementById("pr").textContent =
    `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm ￥n 側面積 ${B.toFixed(1)} mm² / ピッチ長さ ${pitch(B)} mm`;
}

/* Lアングル */
function calcAng() {
  const x = Number(document.getElementById("ax").value);
  const y = Number(document.getElementById("ay").value);
  const h = Number(document.getElementById("ah").value);
  const t = Number(document.getElementById("at").value);

  
  const w = t*t;
  const A = 2*(x*t + x*h + y*t + y*h + 2*h*t - w);

  document.getElementById("ar").textContent =
    `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

/* 台形柱 */
function calcTrap() {
  const a = Number(document.getElementById("ta").value);
  const b = Number(document.getElementById("tb").value);
  const h = Number(document.getElementById("th").value);
  const d = Number(document.getElementById("td").value);

  const sl = Math.sqrt(((b - a)/2)**2 + h**2);
  const A = (a + b)*d + 2*(d*sl) + a*b;

  document.getElementById("tr").textContent =
    `表面積 ${A.toFixed(1)} mm² / ピッチ長さ ${pitch(A)} mm`;
}

