import { useEffect, useRef } from 'react';

type UseWebComponentRefProps<On> = {
  on: On;
};

export default function useWebComponentRef<T>({ on }: UseWebComponentRefProps<T>) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const events = Object.keys(on).map(name => {
      return {
        name,
        handler: ev => on[name](ev.detail),
      };
    });

    events.forEach(({ name, handler }) => {
      ref.current?.addEventListener(name, handler);
    });

    return () => {
      events.forEach(({ name, handler }) => {
        ref.current?.removeEventListener(name, handler);
      });
    };
  }, []);

  return [ref];
}
