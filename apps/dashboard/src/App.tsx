//@ts-nocheck
import { useWebComponentRef } from 'engine';
import './App.css';

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
      <market-component first="Stencil" last="market component"/>
      <design-my-component first="Stencil" last="design component"/>
    </design-widget>
  );
};

function App() {

  return (
    <div className="App">
      <WebComponent username="mark" />
      <WebComponent username="jhony" />
    </div>
  );
}

export default App;
