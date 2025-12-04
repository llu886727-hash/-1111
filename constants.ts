
import * as THREE from 'three';

// Trump Luxury Palette - Enhanced for Vibrancy
export const COLORS = {
  // Richer, more visible green
  EMERALD_DEEP: "#003b1c", 
  EMERALD_LIGHT: "#006b3e",
  
  // "Trump" Gold - Balanced
  GOLD_METALLIC: "#FFD700", 
  GOLD_HIGHLIGHT: "#FFFACD", 
  
  // Gemstone Colors (More Vibrant)
  LUXURY_RED: "#D7001F", // Vibrant Ruby
  ROYAL_BLUE: "#002366", // Deep Sapphire
  
  PURE_WHITE: "#FFFFFF",
  WARM_WHITE: "#FFF8E7",
};

// Tree Dimensions
export const TREE_HEIGHT = 12;
export const TREE_RADIUS_BASE = 5.5; 
export const SCATTER_RADIUS = 25;

// Counts - High Density
export const PARTICLE_COUNT = 12000;
export const ORNAMENT_COUNT = 600;   
export const POLAROID_COUNT = 40;

// Math Helpers
export const randomVector3 = (radius: number): [number, number, number] => {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = Math.cbrt(Math.random()) * radius;

  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  ];
};

export const getConePosition = (height: number, baseRadius: number, normalizedY: number): [number, number, number] => {
  const y = (normalizedY * height) - (height / 2);
  const radiusAtY = baseRadius * (1 - normalizedY);
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * radiusAtY;

  return [
    r * Math.cos(angle),
    y,
    r * Math.sin(angle)
  ];
};

export const damp = THREE.MathUtils.damp;
