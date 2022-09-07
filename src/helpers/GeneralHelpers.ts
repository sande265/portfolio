export const hex2rgba = (hex: any, alpha = 1) => {
  const [r, g, b] = hex?.match(/\w\w/g).map((x: string) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};

export const scrollRevealConfig = (delay = 200, viewFactor = 0.25, reset?: boolean) => ({
  origin: 'bottom',
  distance: '10px',
  duration: 400,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  mobile: true,
  reset: reset ?? true,
  useDelay: 'always',
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 70, left: 0 },
});

export const addExternalLinksAttribute = () => {
  const links: HTMLAnchorElement[] = Array.from(document.querySelectorAll('a'));
  if (links.length > 0)
    for (let i = 0; i < links.length; i++) {
      const link: HTMLAnchorElement = links[i];
      if (link.host !== window.location.host) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    }
};

export const getClientIP = (cb: CallableFunction) => {
  fetch('https://checkip.amazonaws.com/')
    .then(res => res.text())
    .then(data => cb(null, data));
};
