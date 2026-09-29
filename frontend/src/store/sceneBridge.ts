import * as THREE from "three";

// Це НЕ Zustand-стор і не React-стан навмисно: камера — "живий" об'єкт
// Three.js, який не повинен викликати повторний рендер React щоразу,
// коли оновлюється (а оновлюється він на кожному кадрі). Це просто
// звичайний JS-об'єкт, який слугує "поштовою скринькою" між DOM-подією
// drop (зовні <Canvas>) і камерою сцени (всередині <Canvas>).
interface SceneBridge {
  camera: THREE.Camera | null;
  raycaster: THREE.Raycaster;
  floorPlane: THREE.Plane;
}

export const sceneBridge: SceneBridge = {
  camera: null,
  raycaster: new THREE.Raycaster(),
  // Площина y = 0 з нормаллю "вгору" — це і є підлога кімнати.
  floorPlane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
};

/**
 * Перетворює координати пікселя на екрані (з події drop) у точку
 * на підлозі кімнати. Повертає null, якщо камера ще не готова
 * або промінь не перетнув підлогу (наприклад, кинули вище горизонту).
 */
export function screenToFloorPoint(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
): [number, number, number] | null {
  if (!sceneBridge.camera) return null;

  const rect = canvas.getBoundingClientRect();
  // Нормалізовані координати пристрою: від -1 до 1 в обох осях,
  // саме цього формату очікує Three.js для променя з камери.
  const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
  const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

  sceneBridge.raycaster.setFromCamera(
    new THREE.Vector2(ndcX, ndcY),
    sceneBridge.camera,
  );

  const point = new THREE.Vector3();
  const hit = sceneBridge.raycaster.ray.intersectPlane(
    sceneBridge.floorPlane,
    point,
  );

  return hit ? [point.x, 0, point.z] : null;
}
