import React, { useState } from 'react';
import { ConfigProvider, Slider} from 'antd';

const App = () => {
    const [budget, setBudget] = useState([100, 10000]);
    const [isFlexibleBudget, setIsFlexibleBudget] = useState(false);

  
  const theme = {
       components: {
            Slider: {
                colorPrimary: '#db924b',
                // algorithm: true, // Enable algorithm
                colorPrimaryHover: '#c59f60',
                colorPrimaryBorder: '#c59f60',
                colorPrimaryBorderHover: '#db924b',
                colorBgElevated: '#20161f',
            },
            Tooltip: {
                colorTextLightSolid: '#20161f',
                colorBgSpotlight: '#db924b',
            }, },
        };
const tipFormatter = (value: number | undefined): string => {
    return value !== undefined ? `${value}€` : '';
    };

    const handleBudgetChange = (value: number[]) => {
        setBudget(value);
        setIsFlexibleBudget(false); // Aktiviert den Slider wieder
    };
    
    const handleFlexibleBudgetClick = () => {
        setIsFlexibleBudget(true); // Deaktiviert den Slider
        setBudget([100, 10000]); // Setzt den Slider zurück
    };
    

    return (
        <ConfigProvider theme={theme}>
          <Slider
                range
                defaultValue={[100, 10000]}
                value={budget}
                onChange={handleBudgetChange}
                min={100}
                max={10000}
                tipFormatter={tipFormatter}
                // disabled={isFlexibleBudget} // Der Slider wird basierend auf isFlexibleBudget deaktiviert/aktiviert
            />
          <button 
            type="button"
            onClick={handleFlexibleBudgetClick} 
            className={`btn ${isFlexibleBudget ? 'btn-primary' : 'btn-outline'} mt-2`}
          >
            Ich habe kein festes Budget
          </button>
        </ConfigProvider>
      );
    };
        
export default App;