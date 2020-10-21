/**
 * Checks if the browser window is narrower than the specified breakpoint.
 *
 * @param {number} breakpoint The desired mobile breakpoint in pixels.
 * @returns {boolean|undefined} Whether the window is narrower than the breakpoint, or undefined if no window object.
 */
export const checkIfMobile = breakpoint => window?.innerWidth <= breakpoint;
