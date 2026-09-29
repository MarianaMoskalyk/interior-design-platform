import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Розміри кімнати з плану (в метрах). Пізніше візьмемо з реальних
// даних проєкту — поки що хардкодимо під "Вітальня 68 м²" з мокапу.
const ROOM_WIDTH = 8; // вздовж осі X
const ROOM_DEPTH = 8.5; // вздовж осі Z
const WALL_HEIGHT = 2.6;
const WALL_THICKNESS = 0.15;

function Walls() {
  return (
    <group>
      {/* підлога */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color="#e7e5e4" />
      </mesh>

      {/* задня стіна */}
      <mesh
        position={[0, WALL_HEIGHT / 2, -ROOM_DEPTH / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[ROOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      {/* ліва стіна */}
      <mesh
        position={[-ROOM_WIDTH / 2, WALL_HEIGHT / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[ROOM_DEPTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>

      {/* права стіна */}
      <mesh
        position={[ROOM_WIDTH / 2, WALL_HEIGHT / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[ROOM_DEPTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>

      {/* передню стіну навмисно не малюємо — інакше камера опиниться
          "всередині коробки" і нічого не буде видно */}
    </group>
  );
}

export default function Room3DScene() {
  return (
    <Canvas camera={{ position: [7, 6, 8], fov: 50 }} shadows>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />

      <Walls />

      {/* тимчасовий об'єкт для орієнтиру — приберемо, коли з'явиться
          реальне розміщення меблів із каталогу */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={3}
        maxDistance={20}
      />
    </Canvas>
  );
}
