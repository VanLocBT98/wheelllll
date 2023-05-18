import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [hasLoadedRephael, setHasLoadedPhael] = useState(false);
  const [hasLoadedWheelNav, setHasLoadedWheelNav] = useState(false);

  const appendScript = () => {
    const script = document.createElement("script");
    script.id = "raphael";
    script.src = "wheelnav/raphael.min.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => setHasLoadedPhael(true);
    document.body.append(script);
  };

  const scriptAlreadyExists = () => {
    return (
      document.querySelector("script#raphael") !== null &&
      document.querySelector("script#wheelnav") !== null
    );
  };

  useEffect(() => {
    if (!scriptAlreadyExists()) {
      appendScript();
      appendWheelnavScript();
    }
  }, []);

  const appendWheelnavScript = () => {
    const script = document.createElement("script");
    script.id = "wheelnav";
    script.src = "wheelnav/wheelnav.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => setHasLoadedWheelNav(true);
    document.body.append(script);
  };

  useEffect(() => {
    if (hasLoadedWheelNav && hasLoadedRephael) {
      // This demo use two wheels on each other
      let wheel = new window.wheelnav("piemenu");
      wheel.clockwise = false;
      wheel.wheelRadius = wheel.wheelRadius * 0.83;
      wheel.createWheel();
    }
  }, [hasLoadedWheelNav, hasLoadedRephael]);
  return (
    <div className="App">
     <div id='piemenu' data-wheelnav
 data-wheelnav-slicepath='DonutSlice'
 data-wheelnav-navangle='180'
 data-wheelnav-cssmode 
 data-wheelnav-init>
  <div data-wheelnav-navitemtext='0' onmouseup='alert("Place your logic here.");'></div>
  <div data-wheelnav-navitemtext='1' onmouseup='alert("Place your logic here.");'></div>
  <div data-wheelnav-navitemtext='2' onmouseup='alert("Place your logic here.");'></div>
  <div data-wheelnav-navitemtext='3' onmouseup='alert("Place your logic here.");'></div>
  <div data-wheelnav-navitemtext='4' onmouseup='alert("Place your logic here.");'></div>
</div>
    </div>
  );
}

export default App;
