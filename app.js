const CANVAS_SIZE = 700;
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colorBtn = document.querySelector("#jsColors");
const fillBtn = document.querySelector("#jsMode");
const lineInput = document.querySelector("#jsRange");
const clearBtn = document.querySelector("#jsClear");
const saveBtn = document.querySelector("#jsSave");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
const handleColorBtn = (e) => {
  const targetColor = e.target.style.backgroundColor;
  if (!fill) {
    ctx.strokeStyle = targetColor;
  } else {
    ctx.fillStyle = targetColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};
const handleFillBtn = () => {
  if (fill) {
    fillBtn.textContent = "Fill";
    fill = false;
  } else {
    fillBtn.textContent = "Paint";
    fill = true;
  }
};
const handleClearBtn = () => {
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};
const handleLineInput = (e) => (ctx.lineWidth = e.target.value);
const handleCM = (e) => e.preventDefault();
const handleSaveClick = () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colorBtn) {
  colorBtn.addEventListener("click", handleColorBtn);
}

if (fillBtn) {
  fillBtn.addEventListener("click", handleFillBtn);
}

if (lineInput) {
  lineInput.addEventListener("change", handleLineInput);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearBtn);
}
