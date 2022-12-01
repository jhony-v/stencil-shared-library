//@ts-nocheck
import "./App.css";

function App() {

  const onChangeUsername = ev => {
    alert(ev)
  }

  return (
    <div className="App">
      <design-widget username="username from react" changeUsername={onChangeUsername}>
        <h1>HELLO</h1>
        <market-component 
        first="Stencil" 
        last="'Don't call me a framework' JS">
        </market-component>
        <design-my-component 
        first="Stencil" 
        last="'Don't call me a framework' JS">
        </design-my-component>
      </design-widget>
    </div>
  );
}

export default App;
