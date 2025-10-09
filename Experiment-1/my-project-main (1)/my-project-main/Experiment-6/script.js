const svg = document.getElementById("drawingArea");

let isDrawing = false;
let currentPath = null;

function getSvgPoint(evt) {
  const pt = svg.createSVGPoint();
  const source = evt.touches ? evt.touches[0] : evt;
  pt.x = source.clientX;
  pt.y = source.clientY;
  const ctm = svg.getScreenCTM();
  return ctm ? pt.matrixTransform(ctm.inverse()) : pt;
}

function startDraw(evt) {
  evt.preventDefault();
  isDrawing = true;
  const p = getSvgPoint(evt);
  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("stroke", "#1e90ff");
  currentPath.setAttribute("stroke-width", "2.5");
  currentPath.setAttribute("stroke-linecap", "round");
  currentPath.setAttribute("stroke-linejoin", "round");
  currentPath.setAttribute("d", `M ${p.x} ${p.y}`);
  svg.appendChild(currentPath);
}

function draw(evt) {
  if (!isDrawing || !currentPath) return;
  const p = getSvgPoint(evt);
  const d = currentPath.getAttribute("d") + ` L ${p.x} ${p.y}`;
  currentPath.setAttribute("d", d);
}

function endDraw() {
  isDrawing = false;
  currentPath = null;
}

document.getElementById("clearBtn").addEventListener("click", () => {
  svg.innerHTML = "";
});

svg.addEventListener("mousedown", startDraw);
svg.addEventListener("mousemove", draw);
window.addEventListener("mouseup", endDraw);
svg.addEventListener("mouseleave", endDraw);

svg.addEventListener("touchstart", startDraw, { passive: false });
svg.addEventListener("touchmove", draw, { passive: false });
svg.addEventListener("touchend", endDraw, { passive: false });
