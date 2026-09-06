export const MATERIALS = {
  iron: { id: 'iron', name: 'লোহা', alpha: 1.2e-5, color: '#8c92ac' },
  copper: { id: 'copper', name: 'তামা', alpha: 1.7e-5, color: '#b87333' },
  aluminium: { id: 'aluminium', name: 'অ্যালুমিনিয়াম', alpha: 2.4e-5, color: '#d9d9d9' },
  brass: { id: 'brass', name: 'পিতল', alpha: 2.0e-5, color: '#b5a642' },
};

export type MaterialId = keyof typeof MATERIALS;

export const VISUAL_MULTIPLIER = 15; // Exaggerate expansion for macro view so it's visible
export const MICRO_MULTIPLIER = 50;  // Exaggerate more for micro view

export const INITIAL_TEMP = 20;
export const MAX_TEMP = 1000;
export const MIN_TEMP = 0;
export const BASE_LENGTH = 1000; // e.g. 1000 mm = 1m
