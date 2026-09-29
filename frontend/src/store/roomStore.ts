import { create } from "zustand";

export interface RoomDimensions {
  width: number;
  depth: number;
  wallHeight: number;
}

export interface PlacedObject {
  id: string;
  type: string;
  position: [number, number, number]; // точка на підлозі (y завжди 0)
  rotationY: number;
  color: string;
  scale: number;
}

interface RoomStore {
  dimensions: RoomDimensions;
  objects: PlacedObject[];
  selectedId: string | null;

  setDimensions: (dims: Partial<RoomDimensions>) => void;

  addObject: (type: string, color?: string) => void;
  addObjectAt: (
    type: string,
    position: [number, number, number],
    color?: string,
  ) => void;
  updateObjectPosition: (
    id: string,
    position: [number, number, number],
  ) => void;
  updateObjectRotation: (id: string, rotationY: number) => void;
  updateObjectColor: (id: string, color: string) => void;
  updateObjectScale: (id: string, scale: number) => void;
  removeObject: (id: string) => void;
  selectObject: (id: string | null) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  dimensions: { width: 8, depth: 8.5, wallHeight: 2.6 },
  objects: [],
  selectedId: null,

  setDimensions: (dims) =>
    set((state) => ({ dimensions: { ...state.dimensions, ...dims } })),

  addObject: (type, color = "#818cf8") =>
    set((state) => ({
      objects: [
        ...state.objects,
        {
          id: crypto.randomUUID(),
          type,
          position: [0, 0, 0],
          rotationY: 0,
          color,
          scale: 1,
        },
      ],
      selectedId: null,
    })),

  // Те саме, що addObject, але з точною позицією — саме цю функцію
  // викликає drag-and-drop із каталогу після raycasting.
  addObjectAt: (type, position, color = "#818cf8") =>
    set((state) => ({
      objects: [
        ...state.objects,
        {
          id: crypto.randomUUID(),
          type,
          position,
          rotationY: 0,
          color,
          scale: 1,
        },
      ],
      selectedId: null,
    })),

  updateObjectPosition: (id, position) =>
    set((state) => ({
      objects: state.objects.map((o) => (o.id === id ? { ...o, position } : o)),
    })),

  updateObjectRotation: (id, rotationY) =>
    set((state) => ({
      objects: state.objects.map((o) =>
        o.id === id ? { ...o, rotationY } : o,
      ),
    })),

  updateObjectColor: (id, color) =>
    set((state) => ({
      objects: state.objects.map((o) => (o.id === id ? { ...o, color } : o)),
    })),

  updateObjectScale: (id, scale) =>
    set((state) => ({
      objects: state.objects.map((o) => (o.id === id ? { ...o, scale } : o)),
    })),

  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((o) => o.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  selectObject: (id) => set({ selectedId: id }),
}));
