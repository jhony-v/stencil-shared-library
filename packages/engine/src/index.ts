import ReactDOM from "react-dom/client";
import { applyPolyfills, defineCustomElements } from "design/loader";

export class EngineApplication {
  constructor(private readonly container: string, private readonly app: JSX.Element) {
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
