# Stencil shared library

Demo using StencilJs components in mono repo and micro frontends through core initialization

1. Creation of engine using stencil

```tsx
// packages/engine/src/index.ts
import ReactDOM from "react-dom/client";
import { applyPolyfills, defineCustomElements } from "design/loader";

export class EngineApplication {
  constructor(
    private readonly container: string,
    private readonly app: JSX.Element
  ) {
    applyPolyfills().then(() => {
      defineCustomElements(window);
    });
  }

  start() {
    ReactDOM.createRoot(
      document.getElementById(this.container) as HTMLElement
    ).render(this.app);
  }
}
```

2. Usage of engine

```tsx
// apps/dashboard/src/main.tsx

import { EngineApplication } from "engine";
import App from "./App";
import "./index.css";

const engine = new EngineApplication("root", <App />);
engine.start();
```

3. Using web components created in StencilJs

```tsx
// apps/dashboard/src/App.tsx

//@ts-nocheck
import "./App.css";

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