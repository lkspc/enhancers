import { useRef, useEffect, useLayoutEffect, FC } from 'react';
import { useHistory, useLocation } from 'react-router';
import { getScrollOffset, scrollTo } from './utils';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);
}

export function useScrollToTopOnMount() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
}

export function useScrollRestoration() {
  const { action } = useHistory();
  const { pathname } = useLocation();
  const stackRef = useRef<[number, number][]>([]);

  useLayoutEffect(() => {
    const stack = stackRef.current;

    // route mounted by navigation back
    // restore its scroll position
    if (action === 'POP') {
      const [x, y] = stack.shift() ?? [0, 0];
      scrollTo(x, y);
    } else {
      scrollTo(0, 0);
    }

    return () => {
      // route unmounted by foraward
      // store its scroll position
      if (action === 'PUSH') {
        const [x, y] = getScrollOffset();
        stack.unshift([x, y]);
      }
    };
  }, [pathname, action]);
}

export const ScrollToTop: FC = ({ children = null }) => {
  useScrollToTop();
  return children as JSX.Element;
};

export const ScrollToTopOnMount: FC = ({ children = null }) => {
  useScrollToTopOnMount();
  return children as JSX.Element;
};

export const ScrollRestoration: FC = ({ children = null }) => {
  useScrollRestoration();
  return children as JSX.Element;
};

// used for umi app
export const createRouteChange = () => {
  const stack: [number, number][] = [];

  return ({ action }: any) => {
    if (action === 'POP') {
      const [x, y] = stack.shift() ?? [0, 0];
      setTimeout(() => {
        scrollTo(x, y);
      }, 0);
    } else if (action === 'PUSH') {
      const [x, y] = getScrollOffset();
      stack.unshift([x, y]);
    }
  };
};
