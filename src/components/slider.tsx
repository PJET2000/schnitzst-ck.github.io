import React, { useState } from 'react';
import { ConfigProvider, Slider } from 'antd';

const App = () => {
  const [budget, setBudget] = useState([100, 10000]);

  // Stellen Sie das Theme für Ant Design ein
  const theme = {
    primaryColor: '#c59f60', // Schriftfarbe Coffee Theme
  };

  const handleStyle = {
    borderColor: theme.primaryColor,
    // height: '24px', // Dickerer Griff
    // width: '24px', // Dickerer Griff
    // marginTop: '-12px', // Anpassung der Position, damit der Griff mittig bleibt
    backgroundColor: theme.primaryColor, // Griffhintergrund
  };

  const trackStyle = {
     backgroundColor: theme.primaryColor, // Gefüllter Teil der Spur
    // height: '10px', // Dickerer gefüllter Teil der Spur
  };

  const railStyle = {
    backgroundColor: '#20161f', // Hintergrundfarbe Coffee Theme
    // height: '10px', // Dickerer nicht gefüllter Teil der Spur
  };

  return (
    <ConfigProvider theme={{ primaryColor: theme.primaryColor }}>
      <Slider
        range
        defaultValue={[100, 10000]}
        value={budget}
        onChange={setBudget}
        min={100}
        max={10000}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
      />
    </ConfigProvider>
  );
};

export default App;
