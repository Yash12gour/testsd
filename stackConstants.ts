/**
 * Tunable constants for the stacking sections scroll animation.
 */
export const STACK_CONFIG = {
  scaleDropDesktop: 0.05,
  scaleDropTablet: 0.04,
  scaleDropMobile: 0.03,

  dimDesktop: 0.35,
  dimTablet: 0.3,
  dimMobile: 0.25,

  driftDesktop: '-4svh',
  driftTablet: '-3svh',
  driftMobile: '0px',

  radiusDesktop: '28px',
  radiusTablet: '24px',
  radiusMobile: '20px',

  tallPanelThreshold: 1.8, // Do not stack if panel height > 1.8 * viewport height
};
