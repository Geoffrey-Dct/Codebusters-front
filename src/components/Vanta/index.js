import React, { useState, useEffect, useRef } from 'react';
import CLOUDS2 from 'vanta/dist/vanta.clouds2.min';

import App from 'src/components/App';

const Vanta = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(CLOUDS2({
        el: myRef.current,
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div ref={myRef}>
      <App />
    </div>
  );
};

export default Vanta;
