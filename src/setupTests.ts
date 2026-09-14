import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia — several components read
// prefers-reduced-motion via it, so provide a stable no-op mock.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom has no IntersectionObserver/ResizeObserver — scroll-driven chapter
// tracking and framer-motion's viewport hooks both expect one to exist.
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!window.IntersectionObserver) {
  window.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver;
}
if (!window.ResizeObserver) {
  window.ResizeObserver = ObserverStub as unknown as typeof ResizeObserver;
}
