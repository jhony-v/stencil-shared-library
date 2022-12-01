# Stencil shared library

Demo using StencilJs components in mono repo and micro frontends through core initialization

## 1. Creation of engine using stencil

```tsx
// packages/engine/src/index.ts
import ReactDOM from 'react-dom/client';

export class EngineApplication {
  constructor(private readonly container: string, private readonly app: JSX.Element) {
    import('design/loader').then(this.setupCustomElements);
    import('market/loader').then(this.setupCustomElements);
  }

  setupCustomElements({ defineCustomElements, applyPolyfills }) {
    applyPolyfills().then(() => {
      defineCustomElements(window);
    });
  }

  start() {
    const el = document.getElementById(this.container) as HTMLElement;
    ReactDOM.createRoot(el).render(this.app);
  }
}
```

## 2. Usage of engine

```tsx
// apps/dashboard/src/main.tsx

import { EngineApplication } from 'engine';
import App from './App';
import './index.css';

const engine = new EngineApplication('root', <App />);
engine.start();
```

## 3. Using web components created in StencilJs

```tsx
// apps/dashboard/src/App.tsx

//@ts-nocheck
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>HELLO</h1>
      <my-widget></my-widget>
      <my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>
    </div>
  );
}

export default App;
```

## 4. Accessing to events in web components

### 4.1 Creating reusable hook to bind Stencil Js components

```tsx
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
```

### 4.2 Using in react components

```tsx
import { useWebComponentRef } from 'engine';

const WebComponent = ({ username }) => {
  const [widget] = useWebComponentRef({
    on: {
      changeUsername(value) {
        console.log(`${username} prints ${value}`);
      },
    },
  });

  return (
    <design-widget username={username} ref={widget}>
      <i>HELLO {username}</i>
    </design-widget>
  );
};
```
