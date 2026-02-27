function showTab(id) {
  document.querySelectorAll(".tab")
    .forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function pitch(area) {
  const L = Number(document.getElementById("heater").value);
  if (!L || L <= 0) return "ヒーター長さ未入力";
  return ((area / L) / 1000 ).toFixed(2);
}

/* 四角柱 */
function calcBox() {
  const x = Number(document.getElementById("bx").value);
  const y = Number(document.getElementById("by").value);
  const h = Number(document.getElementById("bh").value);

  const A = 2 * (x*y + x*h + y*h);
  const B = 2 * (x*h + y*h);
  document.getElementById("br").textContent =
    `表面積 ${A.toFixed(1)} mm²\n` +
    `ピッチ長さ = 表面積÷ヒーター長\n` +
    `= ${pitch(A)} mm\n` +
    `側面積 ${B.toFixed(1)} mm\n` +
    `ピッチ長さ = 側面積÷ヒーター長\n` +
    `= ${pitch(B)} mm\n` +
    `※表面積は空間に接しているすべての面の面積の合計である。\n` +
    `※側面積は底と一番上の面を除いた面の面積の合計である。`;
}

/* 円柱 */
function calcCyl() {
  const d = Number(document.getElementById("cd").value);
  const h = Number(document.getElementById("ch").value);
  const r = d / 2;

  const A = 2 * Math.PI * (r * h + r**2);
  const B = 2 * Math.PI * r * h;
  document.getElementById("cr").textContent =
    `表面積 ${A.toFixed(1)} mm²\n` +
    `ピッチ長さ = 表面積÷ヒーター長\n` +
    `= ${pitch(A)} mm\n` +
    `側面積 ${B.toFixed(1)} mm²\n` +
    `ピッチ長さ = 側面積÷ヒーター長\n` +
    `= ${pitch(B)} mm\n` +
    `※表面積は空間に接しているすべての面の面積の合計である。\n` +
    `※側面積は底と一番上の面を除いた面の面積の合計である。`;
}

/*円柱＋半楕円回転体*/
function calcCylEllip() {
  const D = Number(document.getElementById("ced").value);
  const H1 = Number(document.getElementById("ceh1").value);
  const H2 = Number(document.getElementById("ceh2").value);

  const R = D / 2;

  /* 円柱側面 */
  const Scyl = 2 * Math.PI * R * H1;

  /*底面*/
  const circle = Math.PI * R * R;

  /* 楕円体（全体） */
  let Sellip;

  if (H2 > R) {
    // 長球（プロレート）
    const e = Math.sqrt(1 - (R*R)/(H2*H2));
    Sellip = 2*Math.PI*R*R*(1 + (H2/(R*e))*Math.asin(e));
  } else if (H2 < R) {
    // 扁球（オブレート）
    const e = Math.sqrt(1 - (H2*H2)/(R*R));
    Sellip = 2*Math.PI*R*R*(1 + ((1-e*e)/e)*Math.atanh(e));
  } else {
    // R = H2 → 半球
    Sellip = 4 * Math.PI * R * R;
  }

  const Shalf = Sellip / 2;

  /* 合算 */
  const A = circle + Scyl + Shalf;
  const B = Scyl + Shalf;

  document.getElementById("cer").innerHTML =
    `合計表面積 ${A.toFixed(1)} mm²<br>
     合計側面積 ${B.toFixed(1)} mm²<br>
     ピッチ長さ=側面積÷ヒーター長<br>
     = ${pitch(B)} mm <br> 
     ※表面積は空間に接しているすべての面の面積の合計である。<br> 
     ※側面積は底の面を除いた面の面積の合計である。`;
}


/* 円錐 */
function calcCone() {
  const d = Number(document.getElementById("co_d").value);
  const h = Number(document.getElementById("co_h").value);
  const r = d / 2;
  const l = Math.sqrt(r*r + h*h);

  const A = Math.PI * (r**2 + r * l);
  const B = Math.PI * r * l;
  document.getElementById("cor").textContent =
    `表面積 ${A.toFixed(1)} mm²\n` +
    `ピッチ長さ = 表面積÷ヒーター長\n` +
    `= ${pitch(A)} mm\n` +
    `側面積 ${B.toFixed(1)} mm²\n` +
    `ピッチ長さ = 側面積÷ヒーター長\n` +
    `= ${pitch(B)} mm\n` +
    `※表面積は空間に接しているすべての面の面積の合計である。\n` +
    `※側面積は底の面を除いた面の面積の合計である。`;
}

/* 四角錐 */
function calcPyr() {
  const x = Number(document.getElementById("px").value);
  const y = Number(document.getElementById("py").value);
  const h = Number(document.getElementById("ph").value);

  const sx = Math.sqrt((y/2)**2 + h**2);
  const sy = Math.sqrt((x/2)**2 + h**2);
  const A = x*y + x*sx + y*sy;
  const B = x*sx + y*sy;

  document.getElementById("pr").textContent =
    `表面積 ${A.toFixed(1)} mm² \n` +
    `ピッチ長さ = 表面積÷ヒーター長\n` +
    `= ${pitch(A)} mm\n` +
    `側面積 ${B.toFixed(1)} mm² / ピッチ長さ ${pitch(B)} mm\n` +
    `※表面積は空間に接しているすべての面の面積の合計である。\n` +
    `※側面積は底の面を除いた面の面積の合計である。`;
}

/* Lアングル 
function calcAng() {
  const x = Number(document.getElementById("ax").value);
  const y = Number(document.getElementById("ay").value);
  const h = Number(document.getElementById("ah").value);
  const t = Number(document.getElementById("at").value);

  
  const w = t*t;
  const A = 2*(x*t + x*h + y*t + y*h + 2*h*t - w);

  document.getElementById("ar").textContent =
    `表面積 ${A.toFixed(1)} mm²\n` +
    `ピッチ長さ = 表面積÷ヒーター長\n` +
    `= ${pitch(A)} mm\n` +
    `※表面積は空間に接しているすべての面の面積の合計である。`;
}*/

/* 台形柱 */
function calcTrap() {
  const a = Number(document.getElementById("ut").value);
  const b = Number(document.getElementById("uy").value);
  const c = Number(document.getElementById("st").value);
  const d = Number(document.getElementById("sy").value);
  const h = Number(document.getElementById("h").value);

  const th = Math.sqrt(((c - a)/2)**2 + h**2); 
  const yh = Math.sqrt(((d - b)/2)**2 + h**2);

  const mt = ((a + c)*th)/2;
  const my = ((b + d)*yh)/2;
  

  const u = a*b;
  const s = c*d;

  const A = 2*(mt + my) + u + s;
  const B = 2*(mt + my);
  
  document.getElementById("tr").textContent =
    `表面積 ${A.toFixed(1)} mm²\n` +
    `ピッチ長さ = 表面積÷ヒーター長\n` +
    `= ${pitch(A)} mm\n` +
    `側面積 ${B.toFixed(1)} mm²\n` +
    `ピッチ長さ = 側面積÷ヒーター長\n` +
    `= ${pitch(B)} mm\n` +
    `※台形は左右対称と仮定し計算しているため、非対称の場合多少のずれが生じます。\n` +
    `※表面積は空間に接しているすべての面の面積の合計である。\n` +
    `※側面積は底と一番上の面を除いた面の面積の合計である。`;
}

