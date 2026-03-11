import { useState } from "react";
import BootScreen from "./components/Boot/BootScreen";
import Desktop from "./components/Desktop/Desktop";



function App() {

  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {!bootComplete
        ? <BootScreen onFinish={() => setBootComplete(true)} />
        : <Desktop />
      }
    </>
  );
}

export default App;