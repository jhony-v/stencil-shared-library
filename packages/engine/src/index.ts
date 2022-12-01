export { default as useWebComponentRef } from "./useWebComponentRef"
import ReactDOM from "react-dom/client";

export class EngineApplication {
  constructor(private readonly container: string, private readonly app: JSX.Element) {
    import("design/loader").then(this.setupCustomElements)
    import("market/loader").then(this.setupCustomElements)
  }
  
  setupCustomElements({defineCustomElements, applyPolyfills}) {
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
