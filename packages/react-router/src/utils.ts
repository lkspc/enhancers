export function getScrollOffset(): [number, number] {
  const rootElement =
    document.documentElement ?? document.body.parentNode ?? document.body;
  const { scrollLeft, scrollTop } = rootElement as HTMLElement;
  const { pageXOffset, pageYOffset } = window;

  return [pageXOffset ?? scrollLeft, pageYOffset ?? scrollTop];
}

export function scrollTo(x = 0, y = 0) {
  window.scroll(x, y);
}
