import * as THREE from "three";

// Прості процедурні текстури через <canvas>, щоб не залежати від
// зовнішніх файлів зображень (менше ризику "картинка не завантажилась").
// Якщо пізніше захочеш реальні фото-текстури — просто заміниш
// createXTexture() на new THREE.TextureLoader().load("/шлях.jpg").

function makeCanvas(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

export function createWoodTexture(repeatX: number, repeatY: number) {
  const canvas = makeCanvas();
  const ctx = canvas.getContext("2d")!;
  const plankColors = ["#c9a479", "#bd9569", "#d1ac82", "#b78e63"];

  const plankHeight = canvas.height / 8;
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = plankColors[i % plankColors.length];
    ctx.fillRect(0, i * plankHeight, canvas.width, plankHeight);
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, i * plankHeight, canvas.width, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWallTexture() {
  const canvas = makeCanvas(128);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f7f7f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 900; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.03})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCarpetTexture(repeatX: number, repeatY: number) {
  const canvas = makeCanvas();
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#c7cad1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
