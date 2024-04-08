import React, { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ConfigProvider, Slider} from 'antd';


<style>
{`
  :root {
    --svg-fill-color: black; /* Default color */
  }
`}
</style>



const NachrichtForm: React.FC = () => {
  const [möbelstück, setMöbelstück] = useState('');
  const [selectedMöbelstück, setSelectedMöbelstück] = useState('');
  const [showTischOptions, setShowTischOptions] = useState(false);
  const [showStuhlOptions, setShowStuhlOptions] = useState(false);
  const [showLampeOptions, setShowLampeOptions] = useState(false);
  const [showAufbewahrungOptions, setShowAufbewahrungOptions] = useState(false);
  const [stil, setStil] = useState('');
  const [selectedStil, setSelectedStil] = useState('');
  const [budget, setBudget] = useState([100, 10000]);
  const [isFlexibleBudget, setIsFlexibleBudget] = useState(false);
  const [formattedBudget, setFormattedBudget] = useState('Budget: 100€ - 10000€');
  const [nachricht, setNachricht] = useState('');
  const [formattedNachricht, setFormattedNachricht] = useState('');
  const [editableMessage, setEditableMessage] = useState('');
  const [email, setEmail] = useState('');

  const [currentStep, setCurrentStep] = useState(1);



  const handleMöbelstückClick = (stück: string) => {
    const möbelstückText = `Möbelstück: ${stück}\n`;
    setMöbelstück(möbelstückText);
    setSelectedMöbelstück(stück);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstückText}${stil}${formattedBudget}
${formattedNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);

    setSelectedMöbelstück(stück);

    if (stück === 'Tisch') {
      setShowTischOptions(true);
    } else {
      setShowTischOptions(false);
    }

    if (stück === 'Stuhl') {
      setShowStuhlOptions(true);
    } else {
      setShowStuhlOptions(false);
    }

    if (stück === 'Lampe') {
      setShowLampeOptions(true);
    } else {
      setShowLampeOptions(false);
    }

    if (stück === 'Aufbewahrung') {
      setShowAufbewahrungOptions(true);
    } else {
      setShowAufbewahrungOptions(false);
    }
    if (stück === 'Überrascht mich!') {
      setCurrentStep(2);}
  };

  const HandleMöbelstückOptionClick = (stück: string) => {
    const möbelstückText = `Möbelstück: ${stück}\n`;
    setMöbelstück(möbelstückText);
    setSelectedMöbelstück(stück);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstückText}${stil}${formattedBudget}${formattedNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
   setCurrentStep(2);
  };

  const handleBackClick = () => {
    setShowTischOptions(false);
    setShowStuhlOptions(false);
    setShowLampeOptions(false);
    setShowAufbewahrungOptions(false);
    setSelectedMöbelstück(''); // Setzt die Auswahl zurück, damit die ursprünglichen Optionen angezeigt werden
  };

  const getButtonClass = (value: string) => {
    const isSelectedMöbelstück = value === selectedMöbelstück;
    const isSelectedStil = value === selectedStil;
    return `btn ${isSelectedMöbelstück || isSelectedStil ? 'btn-primary' : 'btn-outline'} items-center flex-auto w-20  h-[150px] xl:w-20 h-48`;
  };



  const handleStilOptionClick = (stil: string) => {
    const stilText = `Stil: ${stil}\n`;
    setStil(stilText);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stilText}${formattedBudget}${formattedNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
    setSelectedStil(stil);
    setCurrentStep(3);
  };

// Budget :
  const theme = {
    components: {
        Slider: {
            colorPrimary: '#b78765',
            // algorithm: true, // Enable algorithm
            colorPrimaryHover: '#b78765',
            colorPrimaryBorder: '#b78765',
            colorPrimaryBorderHover: '#b78765',
            colorBgElevated: '#20161f',
        },
        Tooltip: {
            colorTextLightSolid: '#20161f',
            colorBgSpotlight: '#b78765',
            tooltipPlacement: 'top',
          
        }, },
    };
  const tipFormatter = (value: number | undefined): string => {
  return value !== undefined ? `${value}€` : '';
  };

  const handleBudgetChange = (value: number[]) => {
    const budgetText = `Budget: ${value[0]}€ - ${value[1]}€\n`;
    setBudget(value);
    setFormattedBudget(budgetText);
    setIsFlexibleBudget(false);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stil}${budgetText}${formattedNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
  };

  const handleFlexibleBudgetClick = () => {
    setIsFlexibleBudget(true);
    setBudget([100, 10000]);
    const budgetText = "Flexibles Budget\n";
    setFormattedBudget(budgetText);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stil}${budgetText}${formattedNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
    setCurrentStep(4);
  };

const handleBudgetClick = () => {
    setCurrentStep(4);
    };

// Ende Budget
  const handleNachrichtChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newNachricht = e.target.value;
    setNachricht(newNachricht);
    setFormattedNachricht(`Freie Nachricht: ${newNachricht}\n`);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stil}${formattedBudget}${newNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);

  };

const handleNachrichtClick = () => {
  setCurrentStep(5);
  };

  const handleEditableMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableMessage(e.target.value);
  };


  const textareaRef = useRef<HTMLTextAreaElement>(null); // Typ hinzugefügt

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'inherit'; // Jetzt weiß TypeScript, dass `style` existiert
      textarea.style.height = `${textarea.scrollHeight +5}px`; // `scrollHeight` existiert auch
    }
  }, [editableMessage, currentStep]); // Dieser Effekt wird ausgeführt, wenn sich `editableMessage` ändert


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('Bitte gib deine E-Mail-Adresse ein, um die Nachricht abzusenden.');
      return; // Beendet die Funktion frühzeitig, um das Absenden zu verhindern
    }
    
    const formData = {
      "form-name": "gesamtnachricht",
      möbelstück,
      stil,
      nachricht,
      editableMessage,
      email,
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formData)
    })
    .then(() => setCurrentStep(6))
    .catch(error => alert("Ups, da ist wohl was schiefgegangen: " + JSON.stringify(error))); // Änderung hier
  };

  const resetForm = () => {
    // Setze hier alle Formularzustände zurück
    setMöbelstück('');
    setShowTischOptions(false);
    setShowStuhlOptions(false);
    setShowLampeOptions(false);
    setShowAufbewahrungOptions(false);
    setSelectedMöbelstück('');
    setSelectedStil('');
    setIsFlexibleBudget(false);
    setBudget([100, 10000]);
    setNachricht('');
    setCurrentStep(1); // Zurück zum Anfang
  };


      return (
    <form onSubmit={handleSubmit} className="p-5 xl:p-10 max-w-4xl flex flex-grow flex-col mx-auto my-20 text-center border-2 h-[620px] border-base-content card bg-transparent" name="gesamtnachricht" method="POST" data-netlify="true"  data-aos="flip-left">
      <input type="hidden" name="editableMessage" value={editableMessage} />
      <div className='mb-5 xl:mb-5' >
      <h1 className="text-3xl font-bold text-left" >Mein SchnitzStück:</h1>
        {(currentStep < 5) ? (
          <p className="text-lg text-left">
           Ob du mit einer wilden Idee kommst, ein spezifisches Modell vor Augen hast oder noch nach Inspiration suchst: Gemeinsam finden wir dein persönliches SchnitzStück!
          </p>) : (
          <p className="text-lg text-left hidden xl:block">
        Ob du mit einer wilden Idee kommst, ein spezifisches Modell vor Augen hast oder noch nach Inspiration suchst: Gemeinsam finden wir dein persönliches SchnitzStück!
          </p>)}
      </div>
      <div className='justify-center flex-1 flex '>
      {/* Möbelstück Auswahl */}
      <>
      {currentStep === 1 && (
        <div className='card flex-col flex-shrink items-center justify-center flex-1 w-full'>
      
      <p className="text-lg text-center font-semibold mb-5 md:mb-16 mb:text-xl xl:mb-28">Was für ein Möbelstück suchst du?</p>
        <div className="flex flex-row flex-wrap gap-2 item-center justify-center w-full lg:gap-4">

        


          {!showTischOptions && !showStuhlOptions && !showLampeOptions && !showAufbewahrungOptions && (
            <>
              {/* Die ursprünglichen Buttons */}
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Tisch')}
                className={`${getButtonClass('Tisch')} items-center flex flex-grow flex-column gap-2 `}
              >

                  <div className='p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', minHeight: '50px', minWidth: '50px' }}
                    version="1.1"
                    viewBox="0 0 200 200"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M183.4,61.1c-0.2-0.5-0.6-1-1-1.5c-0.4-0.4-0.9-0.8-1.4-1c-1-0.5-2-0.8-2.9-0.9c-1.9-0.4-3.8-0.4-5.6-0.4  c-7.3-0.1-14.6-0.3-21.9-0.4c-14.6-0.2-29.2-0.5-43.8-0.7C92.2,56,77.6,55.9,63,55.7l-21.9-0.2l-5.5,0c-1.7,0-3.4-0.1-5.3-0.3  c-1.9-0.1-3.8-0.3-6-0.1c-1.1,0.1-2.3,0.3-3.6,0.9c-0.6,0.2-1.3,0.7-1.9,1.2c-0.3,0.3-0.6,0.6-0.9,0.9l-0.8,1.1  c-0.2,0.6-0.5,1.2-0.6,1.9c-0.1,0.5-0.1,0.8-0.2,1.3c-0.1,0.8-0.1,1.5-0.1,2.2c-0.1,1.4-0.1,2.8,0,4.2c0,1.4,0.1,2.8,0.2,4.3  l0.1,0.6l0.2,1c0.1,0.3,0.1,0.7,0.2,1c0.1,0.3,0.2,0.6,0.3,0.9c0.1,0.3,0.3,0.5,0.5,0.8L18,78c0.4,0.5,1,0.7,1.5,1  c0.6,0.2,1.2,0.3,1.9,0.3l1,0c0.3,0,0.8,0,0.9,0c0.8,0,1.5-0.1,2.2-0.2c0.6-0.1,1.4-0.1,1.8-0.1l1.8,0.1l8.1,0.3  C57.4,80,77.6,80,97.8,79.8V95c0,9.1,0.8,18.3,2.4,27.3c-1.4-0.6-3.9-0.1-6.3,1.3c-3.2,1.9-6.6,3.6-10,5.4l-5.1,2.7l-3.4,1.8  l-2.5,1.4l-1.2,0.7c-0.3,0.2-0.6,0.5-0.9,0.7c-0.5,0.5-1.2,1-1.7,1.4l-0.5,1.2c-0.1,0.2-0.2,0.4-0.2,0.6c0,0.2-0.1,0.5,0,0.8  c0,0.6,0.2,1.3,0.4,1.9c0.3,0.6,0.6,1,0.8,1.2c0.3,0.3,0.5,0.5,0.9,0.8c0.4,0.3,1,0.5,1.7,0.7c0.8,0.1,1.8,0.1,2.8,0.1h14  c7.9,0,15.7-0.1,23.6-0.2l13.8-0.3c0.9,0,1.8,0,2.6-0.1c0.7-0.1,1.3-0.3,1.7-0.6c0.4-0.2,0.7-0.5,1-0.7c0.2-0.2,0.6-0.5,0.9-1.1  c0.3-0.5,0.4-1.2,0.4-1.8c-0.1-0.6-0.2-0.9-0.5-1.3l-0.8-1.1l-1.5-1.3c-1.8-1-3.5-1.9-5.3-2.8l-3.3-1.6l-6.4-2.9  c-4.3-2-8.5-3.9-12.5-6.3h0c-0.3-0.2-0.5-0.2-0.8-0.3c0.1-0.1,0.1-0.1,0.1-0.2c1.6-9.1,2.4-18.3,2.4-27.5V79.8  c19.9-0.2,39.9-0.5,59.7-0.7c10-0.1,18.2-1.5,18.2-3.3c0.4,0,0.8-1.1,1-3.3l0,0c0.1-1.8,0.4-3.6,0.6-5.4c0.1-0.9,0.2-1.9,0.2-2.8  C183.9,63.2,183.9,62.2,183.4,61.1z M113.5,132.1l6.1,3.6l2.9,1.7c0.3,0.2,0.6,0.4,0.8,0.6c0.2,0.2,0.3,0.3,0.5,0.4  c0.2,0.1,0.2,0.4-0.1,0.5c-0.2,0.2-0.6,0-0.8,0l-0.6-0.1l-0.3,0l-0.1,0l0,0l-0.2,0l-0.4,0l-2.9-0.1l-5.9-0.1  c-7.9-0.2-15.7-0.2-23.6-0.2h-9l6.8-3.5c3.4-1.8,6.9-3.5,10.3-5.5c2.6-1.5,4.2-3.6,4.2-5.2c0.1,0.1,0.1,0.2,0.2,0.2h0  C105.4,127.3,109.4,129.7,113.5,132.1z M164,72.6c-42.3,0.3-84.5,1.5-126.7,0.3l-8.1-0.3l-1,0l-0.5,0l-0.7,0c-1,0-1.6,0.1-2.3,0.2  c-0.7,0.1-1.3,0.1-1.9,0.2c-0.2,0-0.1,0-0.1,0l0,0l0,0l0,0l0,0l0,0l0-0.4c-0.1-1.2-0.2-2.5-0.2-3.8c0-1.3,0-2.6,0-3.8  c0-0.6,0.1-1.2,0.1-1.8c0-0.2,0.1-0.6,0.1-0.7c0,0,0,0,0,0c0,0,0,0,0.1-0.1c0.1-0.1,0.2-0.2,0.4-0.2c0.4-0.2,1-0.3,1.7-0.4  c1.4-0.2,3.2-0.1,4.9,0l2.8,0.2c0.9,0,2,0.1,2.9,0.1l5.5,0L63,61.6c14.6-0.2,29.2-0.3,43.8-0.5c14.6-0.2,29.2-0.5,43.7-0.7  c7.3-0.1,14.6-0.3,21.8-0.4c1.8,0,3.6-0.1,5.3,0.1c1.7,0.2,3.2,0.7,3.7,1.9c0.6,1.2,0.5,3.1,0.4,4.8c-0.1,1.8-0.3,3.6-0.3,5.5v0  c0,1.2,0.1,2.1,0.2,2.7C179.8,73.6,172.6,72.5,164,72.6z" />
                  </svg>
                  <div className='mt-5 w-20'> Tisch</div>
                </div>
            </button>
              <button
                 type="button"
                 onClick={() => handleMöbelstückClick('Stuhl')}
                 className={`${getButtonClass('Stuhl')} items-center flex flex-grow flex-column gap-2 `}
              >

                  <div className='p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', minHeight: '50px', minWidth: '50px' }}
                    version="1.1"
                    viewBox="0 0 200 200"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M174.4,99.8c-0.3-1.4-0.7-2.1-1.2-2.1c-1,0-1.6,2.8-3.9,5.9c-1.1,1.6-2.8,3.3-4.8,5.7c-1,1.2-2.1,2.6-3,4.2  c-0.9,1.6-1.7,3.7-2,5.7c-0.7,4.1-0.5,8-0.2,11.7c0.3,3.7,0.8,7.2,0.8,10.4c0,1.6-0.1,3.2-0.4,4.7c-0.2,0.9-0.4,2-0.4,3.1  c0,0.6,0,1.2,0,1.8l0,0.1l-0.2,0.1l-0.1,0l0,0c0,0-0.1,0-0.1,0c-0.1,0.1-0.5,0.1-0.8,0.2c-1.3,0.2-3.1,0.1-4.7,0  c-1.7-0.1-3.5-0.3-5.3-0.5c-0.9-0.1-1.8-0.2-2.9-0.2l-0.8,0h-0.7h-1.3h-10.8H110H88.5c-1.8,0-3.5,0-5.5,0c-1.9,0.1-3.7,0.2-5.6,0.4  l-10.7,1c-3.5,0.3-7.1,0.6-10.6,0.7c-3.5,0.1-6.9,0-10-0.6c-0.8-0.1-1.4-0.4-2.1-0.5c-0.3-0.1-0.5-0.3-0.8-0.4  c-0.1-0.1-0.3-0.1-0.3-0.2c0,0-0.1,0-0.1-0.1c-0.3-0.2-0.9-1.4-1.1-2.9c-0.5-2.9-0.3-6.5,0-9.9l0.8-8.8c0.2-3,0.5-6,0.1-9.5  c-0.2-1.8-0.8-3.6-1.4-5.2c-0.7-1.6-1.6-3.1-2.6-4.4c-1.9-2.6-3.7-4.7-4.9-6.9c-1.1-2.1-1.6-4.3-1.4-6.7c0.1-2.3,0.9-4.6,2.3-6.5  c2.7-3.8,7.7-6.1,12.4-5.9c0.9,0,1.7,0.2,2.6,0.4c1,1.5,2.3,2.9,3.5,4c1.8,1.6,3.3,2.7,4.3,4c0.3,0.4,0.6,0.8,0.8,1.3  c0.3,1.7,0.5,3.6,0.5,5.5c0,2.8-0.2,5.6-0.5,8.5c-0.3,2.9-0.6,5.9-0.8,8.9c-0.1,1.5-0.1,3.1-0.1,4.7c0.1,1.6,0.2,3.3,0.8,5.1  c0.6,1.8,1.6,3.8,3.7,5.2c1,0.6,1.9,1,2.8,1.2c0.9,0.3,1.7,0.4,2.5,0.6c3.2,0.5,6.3,0.5,9.3,0.5c6-0.1,12-0.6,17.9-1.2l2.1-0.2  c2.5,0.2,5.1,0.5,7.7,0.7c5.6,0.6,11.3,1.2,17.2,1.4c2.9,0.1,5.9,0.1,8.9-0.1c1.5-0.1,3.1-0.3,4.7-0.7c1.6-0.4,3.3-0.8,5.2-2.2  c1-0.7,1.8-1.8,2.2-2.7c0.4-0.9,0.7-1.7,0.8-2.4c0.3-1.5,0.5-2.9,0.5-4.2c0.1-2.7,0-5.2-0.2-7.7c-0.3-5-0.9-9.9-1-14.4  c0-0.6,0-1.1,0.1-1.5c0-0.3,0.1-0.4,0.1-0.6l0.2-0.8c0.1-0.5,0.2-1,0.4-1.5c0.1-0.5,0.3-1,0.5-1.4c0.7-1.9,1.8-3.6,3.3-5.5  c1.3-1.7,2.8-3.5,4.1-5.6c2.9-1,6.1-1.2,9.1-0.6c2.7,0.6,5.3,1.8,7.3,3.6c2.1,1.8,3.6,4.2,4.3,6.9l0,0c0.7,2.8,1,4.4,1.4,4.4  c0.3,0,1-1.6,0.3-4.8v0c-0.7-3-2.3-5.8-4.6-8c-2.3-2.2-5.2-3.6-8.2-4.4c-2.6-0.6-5.3-0.7-8-0.3c0.8-1.8,1.3-3.7,1.6-5.6  c0.4-2.9,0.3-5.4,0-7.7c-0.3-2.3-0.7-4.2-1.1-5.8c-0.9-3.2-1.7-5.1-2.7-5.1c-1,0-1.8,2.1-2.2,5.5c-0.4,3.3-0.3,7.9-0.8,12.2  c-0.3,2-0.9,3.8-2,5.6c-1,1.8-2.5,3.5-4.1,5.6c-1.6,2-3.2,4.4-4.2,7.1c-0.3,0.7-0.5,1.3-0.7,2c-0.2,0.7-0.4,1.4-0.5,2.1l-0.2,1  c-0.1,0.4-0.1,0.8-0.1,1.2c-0.1,0.7-0.1,1.4-0.1,2.1c0,1.2,0.1,2.5,0.1,3.6c-13.9-1.5-27.8-2.3-41.8-2.3H66.7c-0.2,0-0.3,0-0.5,0  l0-0.3l0.1-1.6c0-0.6,0-1.3,0-2.1c-0.1-0.9-0.2-1.3-0.4-2c-0.4-1.7-1-3.6-2-5.3c-0.1-0.3-0.1-0.5-0.2-0.8c-0.6-1.7-1.4-3.3-2.5-4.8  l-0.9-1.1c-0.3-0.3-0.6-0.6-1-0.9c-0.7-0.6-1.3-1.2-2-1.7c-1-0.7-2.1-1.4-3.3-1.9l-0.3-0.7c-0.1-0.4-0.2-0.9-0.4-1.3  c-0.3-0.8-0.4-1.8-0.5-2.8c-0.4-3.9-0.2-8,0.4-12.1c0.6-4.1,1.6-8.2,2.9-12.1c0.3-1,0.7-1.9,1.1-2.9c0.4-1,0.8-1.9,1.2-2.8  c0.8-1.8,1.9-3.5,3-4.9c0.3-0.3,0.6-0.6,0.9-0.9c0.3-0.3,0.7-0.5,1.1-0.8c0.4-0.3,0.7-0.6,1.2-0.8l1.3-0.7c1.7-0.9,3.6-1.6,5.5-2.1  c3.9-1.1,8-1.5,12.2-1.7c8.4-0.4,17,0.5,25.8,0.4c4.3-0.1,8.6-0.1,12.8,0.1c4.2,0.2,8.4,0.7,12.4,1.9c3.9,1.2,7.6,3.2,10.3,6.2  c2.7,3,4.2,7,4.6,11.2v0c0.3,2.2,0.6,3.3,1.1,3.3c0.4,0,0.9-1.1,0.7-3.5v0c-0.3-4.4-1.7-8.9-4.6-12.5c-2.9-3.6-7-6-11.2-7.5  c-4.2-1.5-8.7-2.2-13-2.6c-4.4-0.4-8.7-0.5-13.1-0.6c-8.4-0.2-17.1-1.4-25.9-1.3c-4.4,0.1-8.9,0.4-13.4,1.5  c-2.2,0.6-4.5,1.3-6.6,2.4l-1.6,0.8c-0.5,0.3-1,0.7-1.5,1c-0.5,0.4-1,0.6-1.5,1.1l-1.5,1.4c-1.7,1.9-3,3.9-4,6c-0.5,1-1,2.1-1.5,3.1  c-0.5,1-0.9,2.1-1.2,3.2c-1.5,4.3-2.7,8.6-3.4,13.1c-0.7,4.5-1.1,9-0.7,13.7c0.1,0.8,0.2,1.6,0.3,2.4c-6.9-0.2-13.6,2.9-17.8,8.5  c-2.1,2.9-3.3,6.4-3.5,10c-0.1,0.9-0.1,1.8,0,2.7c0,0.9,0.2,1.8,0.3,2.7c0.4,1.8,1,3.5,1.8,5c1.7,3.1,3.7,5.4,5.3,7.6  c0.8,1.1,1.4,2.2,1.9,3.2c0.4,1.1,0.8,2.1,0.9,3.3c0.3,2.4,0.1,5.3-0.2,8.2l-0.8,8.8c-0.2,3.7-0.5,7.4,0.1,11.6  c0.2,1.1,0.4,2.2,0.9,3.3c0.5,1.1,1.1,2.4,2.3,3.5c0.3,0.3,0.6,0.5,1,0.7c0.3,0.3,0.6,0.3,0.9,0.5c0.6,0.3,1.1,0.5,1.7,0.8  c1,0.3,2.1,0.7,3.1,0.8c0.9,0.2,1.9,0.3,2.8,0.4v2c0,3.5,0.9,7,2.6,10.4c0.1,0.2,1.7,0.2,1.8,0c1.7-3.5,2.6-7,2.6-10.4v-1.7  c0.6,0,1.2,0,1.8,0c3.7-0.1,7.4-0.4,11-0.7l10.8-1c1.8-0.2,3.5-0.3,5.2-0.4c1.6-0.1,3.5,0,5.3,0H110h21.6h10.8h1.3h0.7l0.5,0  c0.8,0,1.6,0.1,2.5,0.2c0,0,0.1,0,0.2,0v3.6c0,3.5,0.9,7,2.6,10.4c0.1,0.2,1.7,0.2,1.8,0c1.7-3.5,2.6-7,2.6-10.4v-3.1  c1.4,0.1,2.8,0.1,4.5-0.1c0.3,0,0.6-0.1,0.9-0.1c0.3,0,0.6-0.1,1-0.2c0.4-0.1,0.7-0.2,1.1-0.4c0.4-0.2,0.9-0.5,1.1-0.6  c0.5-0.3,1.3-0.9,1.9-1.5c0.6-0.6,1-1.4,1.2-2.2c0.2-0.8,0.1-1.8,0-2.5c0-0.3,0-0.6,0-0.9c0-0.7,0.2-1.3,0.3-2.2  c0.4-2,0.5-4.1,0.5-6c0-3.9-0.5-7.6-0.8-11.1c-0.3-3.5-0.5-6.8,0.1-9.8c0.2-1.4,0.6-2.5,1.2-3.8c0.6-1.2,1.3-2.4,2.1-3.6  c1.6-2.4,3.2-4.8,4.1-7.3C174.6,103.4,174.7,101.2,174.4,99.8z M94,108.7c14,0,28-0.8,41.9-2.3c0.2,3,0.5,6,0.7,8.9  c0.2,2.4,0.3,4.7,0.2,6.9c0,1.1-0.2,2.2-0.4,3c-0.1,0.4-0.2,0.8-0.3,1c0,0.1-0.1,0.1-0.1,0.1l-1.1,0.5c-0.4,0.2-0.7,0.3-1.1,0.4  c-0.2,0-0.3,0.1-0.5,0.1c-1.1,0.3-2.4,0.4-3.7,0.5c-0.9,0.1-1.9,0.1-2.9,0.1c-4.8-0.1-9.8-0.8-14.9-1.2c-1.5-0.1-3.2-0.2-4.7-0.1  c-0.3,0-0.6,0-0.9,0.1c-0.5,0-0.9-0.1-1.4-0.1c-2.8-0.3-5.7-0.6-8.6-0.8c-0.7,0-1.5-0.1-2.3-0.1c-0.8,0-1.6,0-2.3,0  c-1.5,0-2.9,0.1-4.4,0.2c-5.7,0.3-11.3,0.8-16.4,0.3c-1.9-0.2-3.8-0.6-4.8-1.2c-0.2-0.1-0.4-0.3-0.4-0.3l0,0l0,0  c-1.3,1-0.3,0.2-0.6,0.4l0.1-0.1c0.1-0.1,0.3-0.2,0.5-0.3c0.1,0,0,0,0,0c0,0,0,0,0,0c0,0,0-0.1,0-0.2l-0.1-0.4l-0.1-0.6  c-0.1-0.4-0.1-0.9-0.1-1.3c-0.2-3.8,0.2-8.1,0.6-12.4l0.1-1.2c0.3,0.1,0.6,0.1,0.9,0.1H94z M159.5,151.9l-0.1-0.2  c-0.1-0.1-0.1-0.2-0.2-0.3C160.1,152.7,159.3,151.6,159.5,151.9z" />
                  </svg>
                  <div className='mt-5 w-20'> Stuhl</div>
                </div>
            </button>

              <button
                type="button"
                onClick={() => handleMöbelstückClick('Lampe')}
                className={`${getButtonClass('Lampe')} items-center flex flex-grow flex-column gap-2 `}
              >

                  <div className='p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', minHeight: '50px', minWidth: '50px' }}
                    version="1.1"
                    viewBox="0 0 200 200"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M137.9,94.2L137.9,94.2c-1.4-8.8-2.7-17.6-4.1-26.4l-2.1-13.2c-0.6-4.3-0.9-8.8-1.8-13.4c-0.2-1.1-0.5-2.3-0.8-3.5  c-0.1-0.6-0.3-1.2-0.5-1.7l-0.3-1c-0.2-0.5-0.3-0.9-0.5-1.4c-0.4-0.9-0.9-1.6-1.8-2c-0.8-0.4-1.8-0.5-2.7-0.5l-1.2,0l-0.8,0l-1.7,0  L106.2,31l-13.4-0.2l-6.5-0.1L83,30.4c-0.6,0-1.3-0.1-2-0.1c-0.3,0-1,0.1-1.5,0.2c-0.5,0.1-1,0.3-1.5,0.5c-1.3,0.6-2.4,1.7-3,3  c-0.3,0.6-0.6,1.5-0.7,1.9c-0.1,0.5-0.2,1-0.3,1.4l-0.3,2.1l-0.4,2.1l-1.7,8.8l-3.4,17.5l-6.1,32.4h36.2V120c0,10.4,0.8,20.7,2.3,31  c0,0-0.1,0-0.1,0c-2.3-0.1-4.7-0.1-7.3,0.1c-2.5,0.3-5.1,0.8-7.8,2.1c-2.6,1.3-5,3.8-6.1,6.7c-0.2,0.5-0.5,1.1-0.6,1.6  c-0.1,0.5-0.2,1.1-0.2,1.6c-0.1,1.1-0.3,2.1-0.4,3.2L78,168l-0.1,0.8l0,0.4c0,0.1,0.2,0,0.3,0.1l3.1,0.3l35.8,0  c2.7,0,4.8-1.6,4.8-3.6c0.4,0,0.8-0.3,0.9-1c0.1-2.4-0.4-5-1.9-7.2c-1.5-2.2-3.9-3.8-6.2-4.7c-3.9-1.5-7.8-1.8-11.6-2  c1.5-10.3,2.4-20.7,2.4-31.1v-19.7h9.4v3.3c0,3.3,0.9,6.6,2.7,9.8c0.1,0.2,1.7,0.2,1.8,0c1.8-3.3,2.7-6.5,2.7-9.8v-3.3h2.8  c6.9,0,12.5-1.6,12.5-3.6v0C137.8,96.6,138.1,95.8,137.9,94.2z M113.5,157.1c2,0.5,3.7,1.3,5.1,2.6c1,1,1.7,2.3,2.1,3.8  c-0.9-0.7-2.1-1.1-3.5-1.1H86c0,0,0,0,0,0c0.5-1.4,1.4-2.5,2.8-3.3c1.4-0.8,3.3-1.4,5.3-1.7c2-0.4,4.2-0.5,6.4-0.7  C105.1,156.6,109.5,156.2,113.5,157.1z M70.7,93.1l4.5-24l3.3-17.5l1.6-8.8l0.4-2.3c0.1-0.8,0.2-1.6,0.3-2.3c0-0.3,0.1-0.6,0.1-0.8  c0.1-0.3,0-0.1,0-0.2c0,0,0-0.1,0.1-0.1l0,0c0.1,0-0.1,0,0.2,0c0.4,0,0.8,0,1.3,0l3.4,0.2l6.9-0.1l13.4-0.2l13.4-0.2l1.7,0l0.9,0  l0.4,0l0.1,0c0.1,0,0.3,0,0.4,0c0.1,0,0.2,0.2,0.3,0.3l0.1,0.2l0.2,0.6c0.2,0.5,0.4,1,0.5,1.4c0.3,1,0.6,2,0.8,3  c1,4.1,1.5,8.6,2.4,13.1l2.9,13.1c2,8.7,3.9,17.4,5.8,26.1l0,0c0.1,0.2,0.1,0.4,0.2,0.6c-2-1.2-6.3-2.1-11.4-2.1H70.7z" />
                  </svg>
                  <div className='mt-5 w-20'> Lampe</div>
                </div>
            </button>
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Aufbewahrung')}
                className={`${getButtonClass('Lampe')} items-center flex flex-grow flex-column gap-2 `}
              >

                  <div className='p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', minHeight: '20px', minWidth: '20px' }}
                    version="1.1"
                    viewBox="0 0 200 200"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M167.8,145.3L167.8,145.3c0.3-17.8,0.6-35.6,0.9-53.5l0.2-13.4l0.1-6.7c0-2,0.3-4.3,0.5-6.5c0.5-4.4,1-8.9,1.3-13.4   c0.1-2.3,0.2-4.6,0.1-6.9c-0.1-1.2-0.1-2.4-0.4-3.7c-0.3-1.3-0.5-2.6-1.7-4.3c-0.4-0.4-0.8-0.9-1.4-1.2c-0.5-0.3-0.9-0.5-1.3-0.7   c-0.8-0.3-1.6-0.6-2.4-0.7c-1.5-0.3-3-0.5-4.5-0.6c-2.9-0.2-5.7-0.2-8.6-0.1c-5.6,0.1-11.2,0.6-16.7,0.9c-2.7,0.2-5.5,0.4-8.1,0.4   l-8.3-0.1L101,34.8l-16.6-0.1l-8.3,0l-2,0l-2-0.1L68,34.2c-5.5-0.5-11.1-1-16.7-1.2c-2.8-0.1-5.7-0.2-8.7,0c-1.5,0.1-3,0.2-4.6,0.6   c-0.8,0.2-1.7,0.4-2.6,0.7c-0.5,0.2-0.9,0.4-1.5,0.8c-0.6,0.3-1.1,0.8-1.6,1.3c-0.5,0.7-0.9,1.3-1.2,1.9c-0.3,0.6-0.5,1.1-0.7,1.7   C30.1,41,29.9,42,29.7,43c-0.3,2-0.5,3.9-0.6,5.9c-0.1,3.8,0,7.5,0.2,11.2c0.4,7.3,1.2,14.6,1.8,21.7c0.1,1.8,0.3,3.5,0.3,5.2   l0,5.3V103l0,21.6v10.8v2.7v1.4l0.1,1.5l0.1,1.5l0.2,1.6c0.1,1,0.4,2.2,0.8,3.3c0.2,0.6,0.5,1.2,0.8,1.7c0.1,0.3,0.3,0.6,0.5,0.9   c-1.4,0.1-2.4,0.4-2.4,0.8v6.1c0,3.4,0.9,6.7,2.6,10.1v0c0.1,0.2,1.7,0.2,1.8,0v0c1.8-3.3,2.6-6.7,2.6-10.1v-3.3   c2.3,0.8,4.4,0.8,6.2,0.8c3.9-0.2,7.4-0.7,10.8-0.8c3.3-0.2,7.1-0.1,10.6-0.1h10.8h21.6H142c9.1,0,16.9-0.7,21.3-1.7v5.2   c0,3.4,0.9,6.7,2.6,10.1v0c0.1,0.2,1.7,0.2,1.8,0v0c1.8-3.3,2.6-6.7,2.6-10.1v-6.1c0-0.5-1.6-0.9-3.5-0.9   C167.3,149.9,167.7,148.4,167.8,145.3z M38.6,86.7c0-2-0.2-3.8-0.3-5.6c-0.1-1-0.2-2-0.3-2.9c1.1,0.4,2.4,0.6,3.8,0.6h47   c25.4,0,50.8-0.9,76.1-2.6l0,2.2l0.2,13.4c0.1,6.6,0.2,13.2,0.3,19.8c-25.5-1.7-51-2.6-76.6-2.6h-47c-1.2,0-2.2,0.2-3.2,0.4V103   l0-10.8L38.6,86.7z M36.2,49.1c0.1-1.7,0.2-3.4,0.5-4.9c0.1-0.8,0.3-1.5,0.5-2.1c0.1-0.3,0.2-0.6,0.3-0.8c0.1-0.2,0.3-0.4,0.2-0.4   c0,0,0,0,0,0c0,0,0.2-0.1,0.3-0.2c0.4-0.1,0.9-0.3,1.4-0.4c1.1-0.2,2.3-0.4,3.6-0.4c2.6-0.2,5.3-0.1,8,0c5.4,0.2,10.9,0.7,16.5,1.1   l4.2,0.3l2.2,0.1l2.2,0l8.3,0l16.6-0.1l16.6-0.1l8.3-0.1c2.9-0.1,5.7-0.4,8.5-0.6c5.5-0.5,11-1,16.4-1.3c2.7-0.1,5.4-0.2,8,0   c1.3,0.1,2.6,0.2,3.8,0.4c1.2,0.2,2.2,0.7,2.3,0.8c0.1,0.1,0.5,1,0.7,1.9c0.2,0.9,0.3,2,0.4,3c0.1,2.1,0.1,4.3,0,6.5   c-0.2,4.4-0.5,8.8-0.9,13.3c-0.2,2.2-0.4,4.4-0.4,6.9l0,2.6c-25.3-1.7-50.6-2.6-76-2.6h-47c-1.7,0-3.1,0.3-4.3,0.8   c-0.4-4.3-0.8-8.7-1.1-13C36.2,56.1,36,52.6,36.2,49.1z M98.8,146.4H77.1H66.3c-3.6,0-7.1-0.1-11,0.1c-3.7,0.2-7.5,0.7-10.7,0.8   c-1.6,0.1-3-0.1-3.8-0.4c-0.1,0-0.2-0.1-0.3-0.1c-0.1,0-0.1-0.1-0.2-0.2c-0.1,0-0.1-0.1-0.2-0.1c-0.1-0.1-0.1-0.2-0.2-0.2   c-0.1-0.1-0.3-0.2-0.3-0.5c-0.1-0.3-0.2-0.4-0.3-0.7c-0.8-2.4-0.7-5.9-0.7-9.6l0-10.8v-8.9c1,0.3,2,0.4,3.2,0.4h47   c25.6,0,51.2-0.9,76.7-2.6c0.2,10.6,0.4,21.2,0.5,31.8v0c0,1.9,0.2,3.2,0.4,4c-2.2-1.6-12.3-2.9-24.4-2.9H98.8z"/><path d="M91.1,59.2c0.1,0.4,0.2,0.8,0.3,1.1c0.2,0.8,0.6,1.5,1,2.1c1.1,1.6,2.7,2.9,4.4,3.6c1.7,0.7,3.5,0.9,5.3,0.7   c1.8-0.2,3.6-0.8,5.1-2c1.5-1.2,2.8-2.9,3.3-4.7c0.3-0.9,0-1.7-0.6-2.3c-0.6-0.6-1.5-0.8-2.4-0.8c-1,0-1.9,0.2-2.6,0.4   c-0.7,0.2-1,0.4-1.2,0.6c-0.1,0.5-0.4,0.8-0.8,1.2c-0.4,0.3-1,0.5-1.6,0.6c-1.3,0.2-2.6-0.4-3-1.1c-0.1-0.2-0.2-0.3-0.3-0.5   c0-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3-0.1-0.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4c0-0.1,0.1-0.2,0.1-0.3   c0.2-0.8,0.6-1.7,1.7-2.2c2.2-1.1,5.8-0.7,6.9,2.9v0c0.1,0.2,0.5,0.3,0.9,0.3c0.4,0,0.8-0.1,0.9-0.4c0.2-1.1,0.1-2.4-0.4-3.5   l-0.4-0.9c-0.2-0.3-0.4-0.5-0.5-0.8c-0.4-0.6-0.9-1-1.4-1.4c-2.1-1.7-4.9-2.3-7.6-1.7c-0.7,0.1-1.4,0.4-2,0.7   c-0.6,0.3-1.3,0.7-1.9,1.2c-0.6,0.5-1.2,1-1.6,1.7c-0.2,0.3-0.4,0.7-0.6,1c-0.2,0.3-0.3,0.7-0.4,1.1c-0.1,0.4-0.3,0.7-0.4,1.1   L91,55.9c0,0.4-0.1,0.7-0.1,1.1l0.1,1.1C91,58.4,91,58.8,91.1,59.2z"/><path d="M91.1,96.2c0.1,0.4,0.2,0.8,0.3,1.1c0.2,0.8,0.6,1.5,1,2.1c1.1,1.6,2.7,2.9,4.4,3.6c1.7,0.7,3.5,0.9,5.3,0.7   c1.8-0.2,3.6-0.8,5.1-2c1.5-1.2,2.8-2.9,3.3-4.7c0.3-0.9,0-1.7-0.6-2.3c-0.6-0.6-1.5-0.8-2.4-0.8c-1,0-1.9,0.2-2.6,0.4   c-0.7,0.2-1,0.4-1.2,0.6c-0.1,0.5-0.4,0.8-0.8,1.2c-0.4,0.3-1,0.5-1.6,0.6c-1.3,0.2-2.6-0.4-3-1.1c-0.1-0.2-0.2-0.3-0.3-0.5   c0-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3-0.1-0.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4c0-0.1,0.1-0.2,0.1-0.3   c0.2-0.8,0.6-1.7,1.7-2.2c2.2-1.1,5.8-0.7,6.9,2.9c0.1,0.2,0.5,0.3,0.9,0.3c0.4,0,0.8-0.1,0.9-0.4v0c0.2-1.1,0.1-2.4-0.4-3.5   l-0.4-0.9c-0.2-0.3-0.4-0.5-0.5-0.8c-0.4-0.6-0.9-1-1.4-1.4c-2.1-1.7-4.9-2.3-7.6-1.7c-0.7,0.1-1.4,0.4-2,0.7   c-0.6,0.3-1.3,0.7-1.9,1.2c-0.6,0.5-1.2,1-1.6,1.7c-0.2,0.3-0.4,0.7-0.6,1c-0.2,0.3-0.3,0.7-0.4,1.1c-0.1,0.4-0.3,0.7-0.4,1.1   L91,92.9c0,0.4-0.1,0.7-0.1,1.1l0.1,1.1C91,95.5,91,95.8,91.1,96.2z"/><path d="M107.5,132c-1,0-1.9,0.2-2.6,0.4c-0.7,0.2-1,0.4-1.2,0.6c-0.1,0.5-0.4,0.8-0.8,1.2c-0.4,0.3-1,0.5-1.6,0.6   c-1.3,0.2-2.6-0.4-3-1.1c-0.1-0.2-0.2-0.3-0.3-0.5c0-0.1-0.1-0.2-0.1-0.3c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3-0.1-0.4c0-0.1,0-0.3,0-0.4   c0-0.1,0-0.3,0-0.4c0-0.1,0.1-0.2,0.1-0.3c0.2-0.8,0.6-1.7,1.7-2.2c2.2-1.1,5.8-0.7,6.9,2.9C106.7,131.9,107.1,132,107.5,132   c0.4,0,0.8-0.1,0.9-0.4c0.2-1.1,0.1-2.4-0.4-3.5l-0.4-0.9c-0.2-0.3-0.4-0.5-0.5-0.8c-0.4-0.6-0.9-1-1.4-1.4   c-2.1-1.7-4.9-2.3-7.6-1.7c-0.7,0.1-1.4,0.4-2,0.7c-0.6,0.3-1.3,0.7-1.9,1.2c-0.6,0.5-1.2,1-1.6,1.7c-0.2,0.3-0.4,0.7-0.6,1   c-0.2,0.3-0.3,0.7-0.4,1.1c-0.1,0.4-0.3,0.7-0.4,1.1L91,131c0,0.4-0.1,0.7-0.1,1.1l0.1,1.1c0,0.4,0.1,0.7,0.1,1.1   c0.1,0.4,0.2,0.8,0.3,1.1c0.2,0.8,0.6,1.5,1,2.1c1.1,1.6,2.7,2.9,4.4,3.6c1.7,0.7,3.5,0.9,5.3,0.7c1.8-0.2,3.6-0.8,5.1-2   c1.5-1.2,2.8-2.9,3.3-4.7c0.3-0.9,0-1.7-0.6-2.3C109.4,132.3,108.5,132,107.5,132z" />
                  </svg>
                  <div className='mt-1 w-24'> Aufbewahrung</div>
                </div>
            </button>
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Überrascht mich!')}
                className={`${getButtonClass('Abstrakt')} items-center flex flex-grow flex-column gap-2 min-w-16`}
              >
               <div className='p-2 md:p-5'>
                <div className='mt-2'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', margin:'auto' }}
                    className="w-[75px] items-center"
                    version="1.1"
                    viewBox="0 0 64 64"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M29.96 21.91c.232-.038 4.148-10.65 4.148-10.956 0-.308-.737-.615-1.086-.384-.35.23-4.11 9.995-4.11 10.533 0 .576.814.845 1.047.807zm2.984-13.532c1.513.922 3.956.23 4.537-1.846.583-2.076-1.836-4.18-3.566-3.345-2.947 1.423-2.482 4.268-.97 5.19zm1.63-3.922c.877-.117 2.248.692 1.744 2.037s-1.706 1.615-2.676 1.038-1.085-2.805.93-3.074zm2.558 21.95c.737-.883 1.94-2.844 4.498-5.92 2.56-3.074 6.204-4.88 7.678-4.958 1.474-.077 1.94.884 1.94 2.153 0 1.27-1.707 3.192-1.98 3.076-.27-.115-.154-.538-.348-1.038-.194-.5-1.396-.846-2.172.27-.775 1.114.272 2.23 1.125 2.652.853.423 2.908.23 4.382-1.615 1.473-1.845 1.59-5.036.155-6.535-1.435-1.5-4.653-1.27-9.384 2.19-4.73 3.46-7.647 8.883-7.678 9.19-.077.768 1.047 1.422 1.784.537zm26.6-1.92c-1.007-1.654-2.456-1.345-3.566-1.04-1.396.386-2.133 2-1.55 3 .58 1 1.783 1.615 2.907 1.346 1.124-.27 3.218-1.654 2.21-3.307zm-1.666 2.075c-1.163.73-2.443.04-2.443-.883s.775-1.5 1.745-1.307c.646.128 1.86 1.46.698 2.19zm-12.448 4.69c-4.42.385-8.143 2.916-8.182 3.384-.04.46 1.124 1.307 1.667 1.115.543-.193 2.443-1.923 4.692-2.654 2.25-.73 3.917-.346 4.498 1.115.582 1.462-.233 2.77-1.474 2.77-1.242 0-1.707-1.04-1.9-1.193-.195-.154-1.63.654-1.59 1 .038.346.852 2.076 3.41 2.037 2.56-.038 3.724-2.422 3.724-3.883 0-1.46-.425-4.073-4.846-3.69zM21.156 14.03c.504-.385.543-1.04.35-1.308-.195-.27-1.087-.23-1.59-.46-.505-.232-.466-1.923.542-2.154 1.008-.23 1.86-.115 2.365 2.153.504 2.27-.66 4.69-.66 4.69-.232.77 1.397.924 1.746.73.348-.19 1.434-2.075 1.434-4.15s-.62-5.767-4.382-5.306c-3.76.46-3.916 3.42-3.18 4.652.737 1.23 2.87 1.537 3.374 1.153zm-1.396 4.573c-.97.577-17.953 36.175-18.768 38.02-.814 1.846-1.14 2.908-.93 3.115.503.5 1.628.23 3.1-.346s37.925-13.955 38.74-15.147c.813-1.192-.466-5.65-6.865-14.416S20.73 18.026 19.76 18.602zm-9.694 36.33c-.427.5-1.94 1-1.978.883-.04-.115.427-1.615.27-1.73-.154-.115-.775-.077-.93.115-.155.193-.465 1.962-.504 2.077-.04.115-.737.384-.776.27-.04-.116.582-2.23.427-2.346-.155-.114-.892-.037-.97.193-.077.23-.232 2.345-.426 2.46-.195.115-2.056.73-2.405.5-.226-.15 4.188-8.496 4.42-8.496.234 0 1.823.884 2.366 2.576.545 1.692.933 3 .506 3.5zm7.794-3.038c-.116.115-2.288.77-2.288.77s.737-2.154.582-2.27c-.155-.114-1.086-.114-1.125.078-.04.192-.583 2.5-.62 2.614-.04.115-.66.346-.66.23 0-.114.93-2.652.776-2.767-.155-.115-1.047.115-1.047.308s-.854 2.883-.932 3.037c-.078.154-1.24.846-1.318.577-.078-.27.27-2.037-.97-4.075-1.24-2.037-2.48-2.576-2.636-2.73-.274-.27 5.235-10.148 5.468-10.148.233 0 3.994 2.575 4.614 7.495.62 4.92.27 6.765.154 6.88zm6.786-2.845c-.233.154-1.474.538-1.474.538s.427-1.96.35-2.076c-.078-.115-1.01.23-1.087.346-.078.115-.078 1.922-.35 2.114-.27.192-.62.308-.62.308l.39-3s-1.048.232-1.048.347c0 .115-.155 2.806-.35 3-.193.19-1.395.768-1.473.653-.078-.115.814-5.305-.97-9.15-1.783-3.844-2.985-4.805-4.536-5.65-.204-.112 3.916-8.42 4.188-8.42.27 0 4.576 3.345 5.778 10.418 1.202 7.074 1.435 10.42 1.202 10.572zm4.847-1.806c-.233.192-.66.46-.66.308 0-.154.31-1.96.195-2s-.814.116-.853.27c-.04.154.077 1.922-.078 2-.155.076-.66.422-.66.153 0-.27.35-2.5.195-2.576-.155-.078-1.047-.155-1.047.114 0 .27-.04 2.845-.04 2.845s-.775.345-.775.23c0-.115-.194-8.112-2.055-12.725s-3.218-7.304-5.778-9.073c-.255-.176 2.482-6.305 2.753-6.343.27-.04 3.645 1.92 4.73 2.92 1.087 1 3.53 4.883 4.073 10.61.543 5.73.233 13.07 0 13.264zm8.454-9.38s1.59 3.344 1.86 4.228c.272.884.195 1.153.078 1.27-.116.114-.853.383-.853.19 0-.19.27-1.998.04-2.113-.234-.116-.893.037-.893.268 0 .23-.234 2.383-.234 2.383s-.737.347-.737.078.698-5.997.737-6.305zm-1.396 4.344c-.154 2.037-.077 2.383-.31 2.46-.232.077-1.046.46-1.046.27 0-.193.465-2.577.388-2.692-.078-.115-1.008-.038-1.008.192s-.194 2.614-.35 2.883c-.154.27-1.162.385-1.162.385s.465-2.576.27-2.69c-.193-.116-.968-.155-.968.076 0 .232-.388 3.192-.388 3.192s-1.435.73-1.474.615c-.04-.115.892-3.652.35-9.188-.544-5.537-1.436-9.69-1.94-11.11-.04-.11 4.033 3.69 5.39 5.496 1.357 1.807 2.172 3.498 2.172 3.498s.232 4.576.077 6.614zm19.273-16.762c-.35-.23-1.9-.308-6.243.807s-7.65 3.452-7.794 3.652c-.194.27-.116.73.388.615.504-.115 1.086-.46 5.273-2.345 4.188-1.884 8.22-1.653 8.53-1.69.31-.04.195-.808-.154-1.04zm-34.395-3.23c-.31 0-1.7 3.067-1.86 3.384-.08.154.736.73 1.007.692.27-.038 1.008-2.23 1.24-2.23s1.746 1.27 1.98 1.307c.232.037.503-.27.58-.808.077-.538-2.637-2.345-2.947-2.345z" />
                  </svg>
                  </div>
                  <div className='mt-6 w-36'> Überrascht mich!</div>
                </div>
            </button>
            </>
          )}
          {showTischOptions && (
            <>
              {/* Die Tisch-Options-Buttons */}
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Esstisch')}
                className={getButtonClass('Esstisch')}
              >
                Esstisch
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Schreibtisch')}
                className={getButtonClass('Schreibtisch')}
              >
                Schreibtisch
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Nachttisch')}
                className={getButtonClass('Nachttisch')}
              >
                Nachttisch
              </button>
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-ghost flex-1"
              >
                Zurück
              </button>
            </>
          )}
          {showStuhlOptions && (
            <>
              {/* Die Stuhl-Options-Buttons */}
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Hocker')}
                className={getButtonClass('Hocker')}
              >
               Hocker
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Esszimmerstuhl')}
                className={getButtonClass('Esszimmerstuhl')}
              >
                Esszimmerstuhl
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Sessel')}
                className={getButtonClass('Sessel')}
              >
               Sessel
              </button>
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-ghost flex-1"
              >
                Zurück
              </button>
            </>
          )}
          {showLampeOptions && (
            <>
              {/* Die Lampe-Options-Buttons */}
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Deckenlampe')}
                className={getButtonClass('Deckenlampe')}
              >
               Deckenlampe
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Stehlampe')}
                className={getButtonClass('Stehlampe')}
              >
                Stehlampe
              </button>
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-ghost flex-1"
              >
                Zurück
              </button>
            </>
          )}
          {showAufbewahrungOptions && (
            <>
              {/* Die Aufbewahrung-Options-Buttons */}
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Schrank')}
                className={getButtonClass('Schrank')}
              >
               Schrank
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Regal')}
                className={getButtonClass('Regal')}
              >
                Regal
              </button>
              <button
                type="button"
                onClick={() => HandleMöbelstückOptionClick('Kommode')}
                className={getButtonClass('Kommode')}
              >
               Kommode
              </button>
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-ghost flex-1"
              >
                Zurück
              </button>
            </>
          )}
        </div>
        </div>
      )}
      {currentStep === 2 && (
          <div className='card flex-col flex-shrink items-center justify-center flex-1 w-full'>
      
          <p className="text-lg font-semibold mb:text-xl text-center mb-10 md:mb-16 xl:mb-28 ">Welchen Stil hast du dir vorgestellt?</p>
            <div className="flex flex-row flex-wrap gap-2 item-center justify-center w-full lg:gap-4">

          
            <button
                type="button"
                onClick={() => handleStilOptionClick('Abstrakt')}
                className={`${getButtonClass('Abstrakt')} items-center flex flex-shrink flex-grid gap-2 `}
              >
            <div className='p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', minHeight: '50px', minWidth: '50px' }}
                    version="1.1"
                    viewBox="0 0 48 48"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M7,40.9c3.9-1.6,9.3-0.6,13.6-0.5C22.8,42.7,7.2,42.6,7,40.9z M35.1,31.4c0.1,12.8-2.7,12.2-1.9-0.2c-1.1-0.1-2-0.1-3.1,0  C22.8,48-2.1,34.3,8.8,19.5c1.8-1.9,2.1-0.9,0.8,0.6C1.3,32.3,20.4,44.5,27.7,31.4c-4.5,0.2-9.6-0.4-13.9-0.5c-0.4,0-1,0-1.4-0.5  c-0.3-0.5-0.1-1.1,0.2-1.5c2.4-4,5.1-9.1,7.7-13.1c-2-0.5-4.2-0.2-6.2,0.6c0.1,5.8-2.2,10.5-1.9,1.2c-2.8,2.3-1.7-0.2,0-1.3  c-0.5-9.2,1.9-13.8,2-1.2c2.2-0.9,4.7-1.2,7-0.6c1.9-2.1,3.5-6.7,5.8-7.5c0-0.1,0-0.1,0-0.2c2.2,1.3,4,5.1,5.7,7.3  c7.9-0.5,12.8,1.7,1.2,2c2.5,4.5,6.2,8.9,7.9,13.8C41.7,31.8,36.6,31.4,35.1,31.4z M28.6,29.3c1.5-5.3-1.8-11.2-6.9-13.1  c-2.4,3.9-4.7,8.7-7,12.7c4,0,8.5,0.6,12.5,0.4C27.6,29.4,28.1,29.3,28.6,29.3z M39.7,29.3c-2-4.4-5.1-8.9-7.4-13.3  c-4.5,0.3-8.3-1.5-1.1-1.9C30,11.8,27.8,9.4,27,7c-0.9,2.6-3.1,5.4-4.5,7.8c5.7,2.1,9.4,8.3,8.1,14.3c0.8-0.1,1.7-0.1,2.6,0.1  c0.1-5.9,1.8-5.1,1.8,0.2c1.4,0.2,2.7,0.1,4.1-0.1C39.3,29.3,39.5,29.3,39.7,29.3z" />
                  </svg>
                  <div className='mt-5 w-20'> Abstrakt</div>
                </div>
       </button>
            
            <button
              type="button"
              onClick={() => handleStilOptionClick('Detailreich')}
              className={`${getButtonClass('Abstrakt')} items-center flex flex-grow flex-column gap-2 `}
              >

                  <div className='p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', minHeight: '50px', minWidth: '50px' }}
                    className='p-1'
                    version="1.1"
                    viewBox="0 0 10000 10000"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M600 2410c70-30 160 30 150 100 10 70-70 130-140 100-80-30-80-160-10-200Zm8710 10c50-30 120-10 140 40s10 110-30 140c-40 20-90 20-120-10-60-40-50-140 10-170ZM610 2890c20-30 50-70 90-80 60-10 110 40 130 90 40 100 100 180 130 280 30 80 20 170 0 260-40 210-110 410-160 620l200-400c30-40 50-80 90-110 40-20 90-20 120 0s40 50 40 80c10 100 40 200 30 300-10 140-10 290-60 420-50 100-120 200-210 260 150 320 380 590 660 810-50-60-100-120-120-190-60-170-80-350-110-530-10-40-10-90 20-130s80-40 120-40c60 20 100 70 150 100 70 60 120 130 170 200v-90c-60-60-80-140-110-220-60-170-70-360-20-540l100-220c20-40 60-60 100-60 60 0 100 40 130 80 50 70 90 150 120 230 30 100 30 200 20 310-10 130 0 260-50 390-20 50-50 100-90 120l-20 230a920 920 0 01 540-400c40-20 90-10 130 20 50 30 60 90 50 140l-60 190c-50 120-140 220-230 330-80 90-170 180-270 260l-170 70c260 120 530 200 810 220-110-110-160-270-250-410-20-30-30-70-20-110 10-30 30-80 70-90h130a1010 1010 0 01 460 230c60 60 100 140 140 210l80 160c70-10 150-30 230-30 260-20 510 10 760 80 10-70 0-130-20-200-90 30-190 30-280 0-100-30-210-40-300-90-70-20-130-60-190-110-40-30-90-80-110-130-20-60 30-120 90-140 90-50 190-30 280-40 60 0 120 0 180 20l-150-150c-70 20-150 10-220-10l-240-60c-170-70-310-200-410-350-50-70-100-140-130-220-30-70 30-130 100-140 60 0 120 20 190 40 90 20 190 40 290 80 80 30 160 80 230 120 90 40 170 80 230 160 50 80 100 170 130 260l130 150c-10-110-30-230-10-340 0-80 90-130 160-110 60 20 110 70 160 110 80 90 160 190 180 310 20 110-10 230-20 340-20 90-70 170-90 250l20 170v150l330 180c100-70 210-130 320-180v-130c-10-60 10-130 20-190-20-90-70-160-90-250-20-160-50-330 30-480 50-100 130-180 220-240 30-30 80-50 130-40s100 50 100 100c20 120 0 230-10 350l110-130c30-20 30-70 50-110l100-180c50-60 120-100 190-140l190-100 310-100 230-50c50 0 120 30 130 90 0 40-20 70-30 100-80 150-170 290-300 390-110 80-230 140-370 170-100 30-210 60-310 30l-150 150c60-20 120-20 180-20 90 10 190-10 280 40 60 20 100 80 90 140-40 90-120 140-190 190-90 60-180 90-280 110-90 10-180 50-270 50l-140-20c-20 70-30 130-20 200 230-70 470-100 710-90l280 40 120-230c40-70 90-140 160-190 100-70 200-130 320-160 70-20 140-40 200-20 50 10 70 50 80 90s0 80-20 110c-90 140-140 300-250 410 230-10 470-70 690-160 30-20 80-30 110-60-60-20-120-40-160-80-160-110-290-270-410-420-70-100-120-220-150-340-10-50-10-100 20-140 40-30 100-50 150-40a1000 1000 0 01 550 410l-20-230c-40-20-60-70-80-110-40-90-50-180-50-270 0-110-20-230-10-340 10-100 50-200 110-290 30-40 60-90 110-110s120-10 150 40c70 140 130 290 130 450 10 160-40 310-100 460l-60 80v90c50-70 100-140 170-200 50-30 90-80 140-90s110-10 140 40c20 30 20 80 10 120-30 180-50 360-110 530-20 70-60 130-110 180 270-210 500-490 650-800a670 670 0 01-260-540c-10-80-20-160-10-240l20-180c10-40 20-80 60-100 60-40 140 0 170 60 80 150 170 290 230 450-50-210-120-410-160-610-20-90-30-190 0-280s100-180 130-270c20-50 80-100 140-80 40 10 70 50 90 80l110 230c50 160 70 330 30 490l-100 310-40 150c60-60 140-110 210-150 50-30 100-50 150-30 50 10 80 60 70 110l-50 140c-50 110-80 240-160 330-70 100-180 150-290 190-50 30-100 30-160 30-210 430-550 800-960 1050 120 50 260 50 400 30l250-60c60-10 130-30 180-70 30-20 20-60 30-90 20-120 40-250 110-350s150-180 250-240c40-20 80-60 130-60s100 50 100 100c-10 90-10 180-40 270-30 130-80 270-170 380-60 70-140 140-240 140-30 0-60 20-90 40 60 10 110 40 170 60l210 110c40 20 80 40 80 90 20 50 10 100-40 130-100 50-200 70-310 80a700 700 0 01-570-120l-170-130c-20-20-30-40-30-70-90 0-180-10-260-30-70-30-140-70-220-90l-80 30c130 60 220 170 290 280 80 120 150 240 200 380 20 60 0 130-60 150-50 30-110 20-170 0-120-20-230-90-320-170-80-80-130-180-180-280-40-80-60-160-60-250-150 40-300 70-450 80-120 10-250 30-370 10 40 70 90 140 150 190 70 50 130 100 210 130l70 40c80-20 160-10 240 20 150 50 280 170 360 310 70 110 120 240 170 360 10 30 20 70 0 110-20 50-90 70-140 50-110-20-220-50-320-110a970 970 0 01-380-520c-40-20-60-70-100-80 40 190 40 400-30 590-20 60-30 130-90 160-40 20-90 20-120-10l-70-100c-70-150-180-280-200-440-30-120 20-240 70-350l80-140c-30-30-50-60-60-100l-80-130-140-20c-140-20-290-20-430-20 80 50 150 120 210 190 80 80 130 180 220 260 20 30 50 50 50 90 10 60-50 120-110 120h-220c-70 0-140-20-200-50-130-70-280-140-370-270l-130-200c-90 30-170 80-250 120 360 300 620 730 700 1190 10 60-40 120-100 110-50 0-90-40-100-90-80-430-330-820-670-1090-350 260-590 650-680 1070-10 40-20 70-50 90-40 40-110 20-140-30-30-40-10-90 0-130 100-440 350-830 690-1120-80-40-160-90-250-120-60 110-130 220-230 300a1200 1200 0 01-450 220h-240c-60 0-120-60-110-120 0-40 30-60 50-90 90-80 140-180 220-260 60-70 130-140 210-190-140 0-280 0-420 20l-150 20c-50 70-80 160-140 230l80 130c20 60 50 120 60 190 30 110 10 230-40 330l-160 300c-30 40-50 80-90 100-60 20-120-20-140-70-100-210-120-460-70-690-40 10-60 60-100 80-50 150-130 290-250 400-70 70-160 150-260 180l-210 60c-70 10-150-50-130-120 20-90 60-170 90-250 80-160 180-320 340-420 100-70 230-100 350-70l70-40c80-30 140-80 210-130 60-50 110-120 150-190-130 20-250 0-370-10-150-10-300-40-450-80 0 140-60 270-130 390-70 110-180 200-290 270-90 40-190 70-290 50-70-10-100-90-80-150 50-140 120-280 200-400 80-110 170-210 290-270l-80-30c-80 20-150 60-220 90-80 20-170 30-260 30 0 30-10 50-30 70l-200 160c-70 40-150 80-230 90-100 20-210 20-310 0-100-10-200-30-300-70-30-20-60-50-60-90 0-50 20-100 70-120l200-110 200-80c-50-50-130-30-190-60-110-60-180-160-230-270-60-130-100-260-110-400l-10-100c0-50 40-100 90-100 30-10 50 0 70 20 70 40 150 80 210 140 70 80 140 160 170 270 30 90 50 190 60 290 50 50 130 70 200 90 90 30 190 60 290 70 120 10 250 10 360-50-410-240-750-610-960-1040-50 0-100 0-140-20-120-50-240-100-320-210-80-100-100-220-150-330-10-50-50-80-50-130-10-50 20-100 70-110 50-20 100 0 140 20 80 50 160 90 220 160l-40-130c-40-140-100-290-120-440-10-140 10-280 60-410l110-210m30 560c0 90 30 170 50 260 30-130 80-260 90-400 0-70-30-130-70-190-50 100-70 220-70 330m8660-330c-30 50-60 90-70 150l30 210 60 230 50-220c10-130-10-260-70-370m-8300 980c-30 100-60 200-60 310 50-60 100-130 120-210 20-90 10-190 30-280l-90 180m7920-180c20 90 10 190 30 280 20 80 70 150 120 210 0-110-30-210-60-310l-90-180m-6930 50c-30 70-50 140-50 210-10 130 30 260 80 380l10-170c10-90 20-170 10-260 0-50-20-110-50-160m5980 370 20 220 60-160c40-140 30-290-30-430-70 110-60 250-50 370M460 4210c20 60 40 110 80 150 40 50 100 80 150 110l-120-160-110-100m8990 100c-50 40-90 100-130 160 50-30 110-60 150-110 40-40 60-90 80-150l-100 100m-6190 240a790 790 0 00 650 350l-80-110-160-80-160-90-250-70m3110 140-180 100c-40 30-60 70-80 110 70 0 150-20 230-40 170-50 310-170 410-310-130 30-270 70-380 140m-4710 150c20 100 30 210 70 300 10 50 30 80 60 120 0-80 20-160-10-230-20-70-70-130-120-190m6570 190c-30 70-10 150-10 230l60-100 70-320c-50 60-100 120-120 190m-5890 20c-100 120-190 260-250 410 100-60 180-150 260-230 80-110 180-220 230-350-90 50-180 100-240 170m5090-170 110 200c110 140 230 280 380 380-60-150-150-290-250-410-60-70-150-120-240-170m-2970 50c10 160 40 320 90 470 10-110 40-220 10-320-20-60-60-100-100-150m990 150c-30 100 0 210 10 320 50-150 80-310 90-470-40 50-80 90-100 150M560 5210c40 120 80 250 170 350l-40-180c-30-70-80-120-130-170m8890 0c-50 60-110 110-130 180l-40 170c90-100 130-230 170-350m-5570 210c50 30 100 60 160 70l240 60-90-80-130-40c-60-20-120 0-180-10m1960 50c-40 10-80 50-110 80l240-60c60-10 110-40 160-70h-100c-60 0-130 30-190 50m-2970 30c50 100 100 220 200 290 50 40 120 60 180 60-40-80-70-160-140-220-70-50-150-100-240-130m4030 130c-70 60-100 140-140 220 60 0 130-20 180-60 100-70 150-190 200-290-90 30-170 80-240 130m-5880 390c-40 0-80 0-110 20l-170 70c90 10 190 20 280 10 80-10 160-50 230-100h-230m7740 0 160 90c120 30 240 10 350 0l-170-70c-30-20-70-20-110-20h-230m-6680 130c-100 100-170 230-230 350 110-40 200-120 260-220 40-70 70-130 90-200l-120 70m5730-70c30 90 80 180 140 260 50 70 130 130 210 160-40-80-80-160-140-230-50-80-120-160-210-190m-3630 110c-130 70-240 190-320 310l110-20 220-120c70-50 130-120 170-200-60-20-130 0-180 30m1470-30c40 80 100 150 170 200l220 120 110 20c-80-110-170-220-290-290-60-50-140-70-210-50m-2480 430c-20 30-20 70-30 110-20 110-10 230 10 340 50-90 110-170 120-270 20-80-20-150-40-220l-60 40m3610-40c-20 70-60 130-40 210 10 100 70 190 120 280 20-140 30-280-10-410 0-40-40-60-70-80m-4260 170c-120 90-200 230-260 360 90-30 170-100 240-160 70-80 120-170 160-270-50 10-100 40-140 70m4830-70 100 200c50 70 120 120 190 170 30 30 70 50 110 60l-130-230c-70-90-160-180-270-200Z"  /><path d="M240 3520c90-40 180 60 140 140-30 70-130 80-170 20-50-50-30-140 30-160Zm9450-10c50-10 110 10 130 60 30 70-30 150-100 150-50 0-90-40-100-80-10-50 30-110 70-130Zm-8240 720c60-20 130 10 140 70 20 50-20 110-70 120a100 100 0 01-70-190Zm7020 0c60-20 130 10 140 70 20 60-20 120-80 120a100 100 0 01-60-190Zm-5950 10c70-30 150 40 140 110s-100 110-160 70-50-150 20-180Zm4890 0c70-20 150 40 140 110s-100 110-160 70-50-150 20-180Zm-4180 800c70-20 150 50 130 120-10 70-100 100-160 60-60-50-40-150 30-180Zm3470 10c70-40 150 30 140 100 0 70-100 120-160 70-60-40-40-150 20-170Zm-5540 390c70-20 150 50 130 120-10 70-110 110-170 50-50-40-30-150 40-170Zm7620 10c70-30 150 40 140 110s-110 110-170 60-40-150 30-170ZM270 5690c80-40 170 60 140 140-30 60-130 80-170 20-60-50-30-140 30-160Zm9400-10c60-10 120 20 130 80 20 70-60 150-130 120-60-10-90-80-70-130 20-30 40-60 70-70Zm-7040 450c60-20 130 10 150 70 10 60-40 130-100 120a100 100 0 01-50-190Zm4660 0c70-30 150 30 140 100 0 80-100 120-160 80s-50-150 20-180Zm-6000 290c50-20 120 10 140 60s-10 120-70 130c-50 20-110-20-120-70s10-100 50-120Zm7340 0c60-20 130 10 140 70 20 60-30 120-90 120a100 100 0 01-50-190Zm-4920 430c60-20 130 20 140 80s-40 120-100 110a100 100 0 01-40-190Zm2500 0c60-30 140 10 150 80 10 60-40 120-100 110a100 100 0 01-50-190Zm-3570 340c50-10 110 10 130 60 30 70-50 160-120 150-60-10-100-70-80-130 10-30 40-60 70-80Zm4650 10c80-40 160 30 150 110 0 50-40 90-90 90-70 0-130-70-110-140 10-30 30-50 50-60Z"  />
                  </svg>
                  <div className='mt-5 w-20'> Detailreich</div>
                </div>
            </button>
            <button
              type="button"
              onClick={() => handleStilOptionClick('Überrascht mich:)')}
              className={`${getButtonClass('Abstrakt')} items-center flex flex-grow flex-column gap-2 min-w-20`}
              >
               <div className='p-2 md:p-5'>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor', margin:'auto' }}
                    className="w-[75px] mt-2"
                    version="1.1"
                    viewBox="0 0 64 64"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M29.96 21.91c.232-.038 4.148-10.65 4.148-10.956 0-.308-.737-.615-1.086-.384-.35.23-4.11 9.995-4.11 10.533 0 .576.814.845 1.047.807zm2.984-13.532c1.513.922 3.956.23 4.537-1.846.583-2.076-1.836-4.18-3.566-3.345-2.947 1.423-2.482 4.268-.97 5.19zm1.63-3.922c.877-.117 2.248.692 1.744 2.037s-1.706 1.615-2.676 1.038-1.085-2.805.93-3.074zm2.558 21.95c.737-.883 1.94-2.844 4.498-5.92 2.56-3.074 6.204-4.88 7.678-4.958 1.474-.077 1.94.884 1.94 2.153 0 1.27-1.707 3.192-1.98 3.076-.27-.115-.154-.538-.348-1.038-.194-.5-1.396-.846-2.172.27-.775 1.114.272 2.23 1.125 2.652.853.423 2.908.23 4.382-1.615 1.473-1.845 1.59-5.036.155-6.535-1.435-1.5-4.653-1.27-9.384 2.19-4.73 3.46-7.647 8.883-7.678 9.19-.077.768 1.047 1.422 1.784.537zm26.6-1.92c-1.007-1.654-2.456-1.345-3.566-1.04-1.396.386-2.133 2-1.55 3 .58 1 1.783 1.615 2.907 1.346 1.124-.27 3.218-1.654 2.21-3.307zm-1.666 2.075c-1.163.73-2.443.04-2.443-.883s.775-1.5 1.745-1.307c.646.128 1.86 1.46.698 2.19zm-12.448 4.69c-4.42.385-8.143 2.916-8.182 3.384-.04.46 1.124 1.307 1.667 1.115.543-.193 2.443-1.923 4.692-2.654 2.25-.73 3.917-.346 4.498 1.115.582 1.462-.233 2.77-1.474 2.77-1.242 0-1.707-1.04-1.9-1.193-.195-.154-1.63.654-1.59 1 .038.346.852 2.076 3.41 2.037 2.56-.038 3.724-2.422 3.724-3.883 0-1.46-.425-4.073-4.846-3.69zM21.156 14.03c.504-.385.543-1.04.35-1.308-.195-.27-1.087-.23-1.59-.46-.505-.232-.466-1.923.542-2.154 1.008-.23 1.86-.115 2.365 2.153.504 2.27-.66 4.69-.66 4.69-.232.77 1.397.924 1.746.73.348-.19 1.434-2.075 1.434-4.15s-.62-5.767-4.382-5.306c-3.76.46-3.916 3.42-3.18 4.652.737 1.23 2.87 1.537 3.374 1.153zm-1.396 4.573c-.97.577-17.953 36.175-18.768 38.02-.814 1.846-1.14 2.908-.93 3.115.503.5 1.628.23 3.1-.346s37.925-13.955 38.74-15.147c.813-1.192-.466-5.65-6.865-14.416S20.73 18.026 19.76 18.602zm-9.694 36.33c-.427.5-1.94 1-1.978.883-.04-.115.427-1.615.27-1.73-.154-.115-.775-.077-.93.115-.155.193-.465 1.962-.504 2.077-.04.115-.737.384-.776.27-.04-.116.582-2.23.427-2.346-.155-.114-.892-.037-.97.193-.077.23-.232 2.345-.426 2.46-.195.115-2.056.73-2.405.5-.226-.15 4.188-8.496 4.42-8.496.234 0 1.823.884 2.366 2.576.545 1.692.933 3 .506 3.5zm7.794-3.038c-.116.115-2.288.77-2.288.77s.737-2.154.582-2.27c-.155-.114-1.086-.114-1.125.078-.04.192-.583 2.5-.62 2.614-.04.115-.66.346-.66.23 0-.114.93-2.652.776-2.767-.155-.115-1.047.115-1.047.308s-.854 2.883-.932 3.037c-.078.154-1.24.846-1.318.577-.078-.27.27-2.037-.97-4.075-1.24-2.037-2.48-2.576-2.636-2.73-.274-.27 5.235-10.148 5.468-10.148.233 0 3.994 2.575 4.614 7.495.62 4.92.27 6.765.154 6.88zm6.786-2.845c-.233.154-1.474.538-1.474.538s.427-1.96.35-2.076c-.078-.115-1.01.23-1.087.346-.078.115-.078 1.922-.35 2.114-.27.192-.62.308-.62.308l.39-3s-1.048.232-1.048.347c0 .115-.155 2.806-.35 3-.193.19-1.395.768-1.473.653-.078-.115.814-5.305-.97-9.15-1.783-3.844-2.985-4.805-4.536-5.65-.204-.112 3.916-8.42 4.188-8.42.27 0 4.576 3.345 5.778 10.418 1.202 7.074 1.435 10.42 1.202 10.572zm4.847-1.806c-.233.192-.66.46-.66.308 0-.154.31-1.96.195-2s-.814.116-.853.27c-.04.154.077 1.922-.078 2-.155.076-.66.422-.66.153 0-.27.35-2.5.195-2.576-.155-.078-1.047-.155-1.047.114 0 .27-.04 2.845-.04 2.845s-.775.345-.775.23c0-.115-.194-8.112-2.055-12.725s-3.218-7.304-5.778-9.073c-.255-.176 2.482-6.305 2.753-6.343.27-.04 3.645 1.92 4.73 2.92 1.087 1 3.53 4.883 4.073 10.61.543 5.73.233 13.07 0 13.264zm8.454-9.38s1.59 3.344 1.86 4.228c.272.884.195 1.153.078 1.27-.116.114-.853.383-.853.19 0-.19.27-1.998.04-2.113-.234-.116-.893.037-.893.268 0 .23-.234 2.383-.234 2.383s-.737.347-.737.078.698-5.997.737-6.305zm-1.396 4.344c-.154 2.037-.077 2.383-.31 2.46-.232.077-1.046.46-1.046.27 0-.193.465-2.577.388-2.692-.078-.115-1.008-.038-1.008.192s-.194 2.614-.35 2.883c-.154.27-1.162.385-1.162.385s.465-2.576.27-2.69c-.193-.116-.968-.155-.968.076 0 .232-.388 3.192-.388 3.192s-1.435.73-1.474.615c-.04-.115.892-3.652.35-9.188-.544-5.537-1.436-9.69-1.94-11.11-.04-.11 4.033 3.69 5.39 5.496 1.357 1.807 2.172 3.498 2.172 3.498s.232 4.576.077 6.614zm19.273-16.762c-.35-.23-1.9-.308-6.243.807s-7.65 3.452-7.794 3.652c-.194.27-.116.73.388.615.504-.115 1.086-.46 5.273-2.345 4.188-1.884 8.22-1.653 8.53-1.69.31-.04.195-.808-.154-1.04zm-34.395-3.23c-.31 0-1.7 3.067-1.86 3.384-.08.154.736.73 1.007.692.27-.038 1.008-2.23 1.24-2.23s1.746 1.27 1.98 1.307c.232.037.503-.27.58-.808.077-.538-2.637-2.345-2.947-2.345z" />
                  </svg>
                  <div className='mt-6'> Überrascht mich!</div>
                </div>
            </button>
          </div>
        </div>
      )} </>
    {currentStep === 3 && (
      <div className='flex flex-col items-center flex-1 justify-center w-full'>

      <p className="text-lg font-semibold mb:text-xl basis-1/3">Gibt es ein Budget für dein SchnitzStück?</p>
      <div className="form-control basis-1/3 w-full">
          <ConfigProvider theme={theme}>
            <div className='z-0 h-10'>
              <Slider
                    range
                    defaultValue={[100, 10000]}
                    value={budget}
                    onChange={handleBudgetChange}
                    min={100}
                    max={10000}
                    tipFormatter={tipFormatter}
                    tooltipPlacement="top"
                    style={{ zIndex: '0'}}
                />
                </div>
              <button
                type="button"
                onClick={handleFlexibleBudgetClick}
                className={`btn ${isFlexibleBudget ? 'btn-primary' : 'btn-outline'} mt-10`}
              >
                Ich habe kein festes Budget
              </button>
              <button
                type="button"
                onClick={handleBudgetClick}
                className="btn btn-ghost"
              >
                <div className='flex flex-row items-center'>
                <div > Weiter</div>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor'}}
                    className='h-5 pl-2 items-center'
                    version="1.1"
                    viewBox="0 0 64 64"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M61.8,33.5c-6.7,3.4-12.3,8-17,14c-1.1,1.4-6.8,1.9-5.4,0c4.1-5.4,9.1-9.8,14.8-13.3C37.1,34,20,33.9,2.8,33.8    c-3.9,0,0.3-3,2.3-3C21.6,30.9,38,31,54.4,31.2c-5-4.6-9.8-9.4-14.5-14.3c-1.4-1.5,4.1-3.6,5.4-2.2c5.6,5.9,11.4,11.5,17.4,17    C63.4,32.3,62.3,33.2,61.8,33.5z" />
                  </svg>
                  
                </div>
              </button>
          
            </ConfigProvider>
      </div>
      </div>
    )}
    {currentStep === 4 && (
      <div className='flex flex-col items-center flex-1 justify-center'>
      <p className="text-lg font-semibold mb:text-xl text-left basis-1/3">Gibt es ein bestimmtes Thema, besondere Materialien oder andere Wünsche, die wir einbeziehen sollen? {/* Lass es uns wissen und wir werden unser Bestes geben, deinen Traum zu verwirklichen! */}</p>
            <div className="form-control w-full">
        <textarea
          className="textarea textarea-bordered h-40 w-full mb-2 "
          name="nachricht"
          value={nachricht}
          onChange={handleNachrichtChange}
          placeholder="Besondere Wünsche (Optional)."
        />
      </div>
      <button
                type="button"
                onClick={handleNachrichtClick}
                className="btn btn-ghost"
              >
                
                <div className='flex flex-row items-center w-full'>
                <div > Weiter</div>
                  <svg
                    id="_x30_1_Shapes"
                    style={{ fill: 'currentColor'}}
                    className='h-5 pl-2 items-center'
                    version="1.1"
                    viewBox="0 0 64 64"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"

                  >
                    <path d="M61.8,33.5c-6.7,3.4-12.3,8-17,14c-1.1,1.4-6.8,1.9-5.4,0c4.1-5.4,9.1-9.8,14.8-13.3C37.1,34,20,33.9,2.8,33.8    c-3.9,0,0.3-3,2.3-3C21.6,30.9,38,31,54.4,31.2c-5-4.6-9.8-9.4-14.5-14.3c-1.4-1.5,4.1-3.6,5.4-2.2c5.6,5.9,11.4,11.5,17.4,17    C63.4,32.3,62.3,33.2,61.8,33.5z" />
                  </svg>
                  
                </div>
              </button>
      </div>
    )}
    {currentStep === 5 && (
      <>

      {/* <h2 className="text-2xl font-bold text-left" >Nachricht:</h2>
      <p className="text-lg text-left mb-10">Hier kannst du deine Nachricht nochmal kontrollieren oder uns eine freie Nachricht schreiben.</p> */}
       <div className='flex flex-col w-full'> 
      <div className="label">
        <span className="label-text hidden md:block">Hier kannst du deine Nachricht nochmal kontrollieren oder uns eine freie Nachricht schreiben</span>
      </div>
     
      <div className="form-control mb-0">
      <textarea
        ref={textareaRef}
        className="textarea textarea-bordered w-full max-h-[435px] md:max-h-[330px] xl:max-h-[320px]"
        name="editableMessage"
        value={editableMessage}
        onChange={handleEditableMessageChange}
        placeholder="Deine Nachricht hier..."
      />
    </div>
    {/* <h2 className="text-2xl font-bold text-left mt-5 >E-Mail-Adresse:</h2> */}
    <div className="label">
       
      </div>
      <div className="flex flex-row flex-grow form-control gap-2 mb-5">
        <input
          type="email"
          className="input w-2/3 input-bordered"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Deine E-Mail-Adresse"
        />
        <button
              type="submit"
              className={`btn btn-ghost items-center hover:bg-base-content hover:text-base-100 md:hidden`}
              >

                  <div >
                  <svg
                    style={{ fill: 'currentColor', height: '20px' }}
                    version="1.1"
                    viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M511.3519592,77.4833527c-1.9008789-4.8930206-7.4077148-7.3180542-12.2982178-5.4159164L3.748394,264.5420227  l-0.0890443,0.0328369c-1.7872009,0.70224-3.1828597,2.2785339-3.5605085,4.3044434  c-0.5835242,3.1222229,1.4764931,6.1282654,4.5993586,6.709259l142.6236877,26.6122437l0.0833588,0.0151672  c0.1686096,0.030304,0.3429108-0.0126343,0.5140533,0c3.3224335,21.2923279,7.0395508,42.4936829,10.5470123,63.7456055  l12.2596893,67.9035339c0.3858643,2.0941162,1.5882721,4.0619202,3.4986267,5.3375854  c3.7493286,2.5058899,8.821701,1.5004883,11.3282013-2.2507324l0.4761658-0.7123413l7.6508636-11.4456787  c8.2141724-4.7161865,16.3967743-9.4778442,24.6229553-14.1763611l38.2637787-23.0908813  c12.6758728-7.8106384,26.3811035-14.1536255,37.6682739-23.9396362  c8.9233704-7.6060486,17.5158081-15.6819153,25.1117249-25.1799622  c29.4023132,5.9489136,58.815979,11.8371887,88.2946777,17.3844604c4.9978638,0.9295959,10.0973816-1.8844299,11.8359375-6.8305054  l23.4414063-66.0493774l23.0176086-66.1959076l45.50354-132.5787354l0.0473633-0.1389313  C512.1875,81.9519806,512.1969604,79.655777,511.3519592,77.4833527z M147.3635559,292.6497192L26.7451859,268.2806091  L452.3509827,109.802002L147.3635559,292.6497192z M168.5996704,363.6527405  c-6.0436401-20.6607971-11.8776093-41.3721313-18.1062927-61.9899902c0.054306-0.030304,0.1155701-0.0328369,0.1692505-0.0656738  l316.1507874-197.1806641l12.0014038-4.4661102c-36.1065063,31.0050888-72.084198,62.1491165-107.7170715,93.6720657  c-43.3380432,38.0301208-86.5422058,76.2067413-129.3365021,114.8304901  c-1.3596649,1.2276917-2.3517914,2.8873291-2.7357483,4.8222961c-0.5500488,2.7736206,0.3770142,5.4083252,2.0985413,7.3887634  c-13.7658691,14.967041-25.5746613,31.0834045-36.7159271,47.5938721  c-6.2678375,9.4450073-11.9988708,19.2032471-17.1943817,29.2797852l-6.0183868,11.710907L168.5996704,363.6527405z   M282.3382874,346.6547546c-13.0326843,7.302887-23.646637,18.0462952-35.2899628,27.324585l-34.6938019,28.1708374  c-2.6927948,2.2962036-5.404541,4.5646362-8.1099701,6.8406372l0.6858215-1.0256042  c6.2880402-9.432373,12.0386658-19.1805115,17.2512207-29.2469482  c9.0111694-17.7229614,17.3560638-35.8399963,23.7539978-55.1064148c0,0,0.0069427,0.0050659,0.0107269,0.0050659  l0.1566162,0.0328369c19.495636,3.8648987,38.9717102,7.8308411,58.4509583,11.7765808  C296.8461914,338.7380066,289.4990845,342.565033,282.3382874,346.6547546z M446.09198,209.7488403l-23.4091797,66.0595093  L402.6251221,333.57724c-45.2698669-8.4548035-90.6628723-16.2528076-136.0148315-24.2705688  c37.7181396-35.4156189,75.173584-71.1192322,112.4768066-106.9895477  c35.9353638-34.2763672,71.5038452-68.9543762,106.9270325-103.7864838L446.09198,209.7488403z" />
                  </svg>
                </div>
            </button>
      
      <div className="form-control w-1/3 hidden md:block">
        <button type="submit" className="btn w-full btn-primary">Deine Nachricht senden
        
        <div >
                  <svg
                    style={{ fill: 'currentColor', height: '20px' }}
                    className='pl-2'
                    version="1.1"
                    viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M511.3519592,77.4833527c-1.9008789-4.8930206-7.4077148-7.3180542-12.2982178-5.4159164L3.748394,264.5420227  l-0.0890443,0.0328369c-1.7872009,0.70224-3.1828597,2.2785339-3.5605085,4.3044434  c-0.5835242,3.1222229,1.4764931,6.1282654,4.5993586,6.709259l142.6236877,26.6122437l0.0833588,0.0151672  c0.1686096,0.030304,0.3429108-0.0126343,0.5140533,0c3.3224335,21.2923279,7.0395508,42.4936829,10.5470123,63.7456055  l12.2596893,67.9035339c0.3858643,2.0941162,1.5882721,4.0619202,3.4986267,5.3375854  c3.7493286,2.5058899,8.821701,1.5004883,11.3282013-2.2507324l0.4761658-0.7123413l7.6508636-11.4456787  c8.2141724-4.7161865,16.3967743-9.4778442,24.6229553-14.1763611l38.2637787-23.0908813  c12.6758728-7.8106384,26.3811035-14.1536255,37.6682739-23.9396362  c8.9233704-7.6060486,17.5158081-15.6819153,25.1117249-25.1799622  c29.4023132,5.9489136,58.815979,11.8371887,88.2946777,17.3844604c4.9978638,0.9295959,10.0973816-1.8844299,11.8359375-6.8305054  l23.4414063-66.0493774l23.0176086-66.1959076l45.50354-132.5787354l0.0473633-0.1389313  C512.1875,81.9519806,512.1969604,79.655777,511.3519592,77.4833527z M147.3635559,292.6497192L26.7451859,268.2806091  L452.3509827,109.802002L147.3635559,292.6497192z M168.5996704,363.6527405  c-6.0436401-20.6607971-11.8776093-41.3721313-18.1062927-61.9899902c0.054306-0.030304,0.1155701-0.0328369,0.1692505-0.0656738  l316.1507874-197.1806641l12.0014038-4.4661102c-36.1065063,31.0050888-72.084198,62.1491165-107.7170715,93.6720657  c-43.3380432,38.0301208-86.5422058,76.2067413-129.3365021,114.8304901  c-1.3596649,1.2276917-2.3517914,2.8873291-2.7357483,4.8222961c-0.5500488,2.7736206,0.3770142,5.4083252,2.0985413,7.3887634  c-13.7658691,14.967041-25.5746613,31.0834045-36.7159271,47.5938721  c-6.2678375,9.4450073-11.9988708,19.2032471-17.1943817,29.2797852l-6.0183868,11.710907L168.5996704,363.6527405z   M282.3382874,346.6547546c-13.0326843,7.302887-23.646637,18.0462952-35.2899628,27.324585l-34.6938019,28.1708374  c-2.6927948,2.2962036-5.404541,4.5646362-8.1099701,6.8406372l0.6858215-1.0256042  c6.2880402-9.432373,12.0386658-19.1805115,17.2512207-29.2469482  c9.0111694-17.7229614,17.3560638-35.8399963,23.7539978-55.1064148c0,0,0.0069427,0.0050659,0.0107269,0.0050659  l0.1566162,0.0328369c19.495636,3.8648987,38.9717102,7.8308411,58.4509583,11.7765808  C296.8461914,338.7380066,289.4990845,342.565033,282.3382874,346.6547546z M446.09198,209.7488403l-23.4091797,66.0595093  L402.6251221,333.57724c-45.2698669-8.4548035-90.6628723-16.2528076-136.0148315-24.2705688  c37.7181396-35.4156189,75.173584-71.1192322,112.4768066-106.9895477  c35.9353638-34.2763672,71.5038452-68.9543762,106.9270325-103.7864838L446.09198,209.7488403z" />
                  </svg>
                </div></button>
      </div>
      </div>
      </div>
      </>
    )}
    {currentStep === 6 && (
    <div>
          <p className="text-lg text-left mb-10">Danke für deine Nachricht, wir werden uns so bald wie möglich bei dir mit Entwürfen für dein SchnitzStück melden!</p>
          <button type="button" className='btn btn-primary' onClick={resetForm}>
            Neue Nachricht senden
          </button>
        </div>
    )}
    </div>
    </form>
  );
};

export default NachrichtForm;


