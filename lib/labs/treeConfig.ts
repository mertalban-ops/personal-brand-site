// Shared world & camera constants for Albanexa Labs (Tree of Life).
// Tuned against reference video frames (0.0s, 1.6s, 2.4s, 4.8s, 6.4s, 7.2s, 8.8s, 9.6s)
// so the opening establishing shot reveals the epic floating world, colossal moon,
// Gothic castle islands, distant citadel & viaduct bridge, craggy island underside,
// and deep cumulus cloud sea while keeping the ancient Tree of Life as the hero focus.

export const TREE = {
  trunkHeight: 2.95,
  trunkRadiusBottom: 1.05,
  trunkRadiusTop: 0.62,
  /** Broad bonsai/ancient-oak dome canopy center (world space). */
  canopyCenter: [0, 3.85, 0] as [number, number, number],
  /** Canopy ellipsoid radii (x, y, z) — organic rounded dome silhouette like 0.0s & 2.4s. */
  canopyRadius: [4.25, 2.15, 4.25] as [number, number, number],
};

export const ISLAND = {
  topY: 0,
  radius: 5.2,
  thickness: 5.4,
};

export const CAMERA = {
  /** Grand entrance dolly start (1.45s smooth settle into the 0.0s epic establishing view). */
  start: [0, 3.35, 31.5] as [number, number, number],
  /** Default desktop hero framing matching 0.0s - 1.6s wide epic world composition. */
  hero: [0, 2.1, 25.2] as [number, number, number],
  /** Mid-wide framing matching 2.4s - 3.2s as the tour glides closer to the island. */
  midHero: [0, 2.25, 19.2] as [number, number, number],
  /** Close-up branch & golden-apple framing matching 4.8s - 5.6s. */
  closeUp: [0.12, 2.82, 7.8] as [number, number, number],
  /** Orbit target (centered so sky/moon above and island crag/waterfalls below are balanced). */
  target: [0, 0.85, 0] as [number, number, number],
  closeUpTarget: [0, 3.58, 0] as [number, number, number],
};
