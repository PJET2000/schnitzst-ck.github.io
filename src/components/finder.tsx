import React, { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ConfigProvider, Slider} from 'antd';


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



  const handleMöbelstückClick = (stück: string) => {
    const möbelstückText = `Möbelstück: ${stück}\n`;
    setMöbelstück(möbelstückText);
    setSelectedMöbelstück(stück);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstückText}${stil}${formattedBudget}
${formattedNachricht}\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
  
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
  };

  const HandleMöbelstückOptionClick = (stück: string) => {
    const möbelstückText = `Möbelstück: ${stück}\n`;
    setMöbelstück(möbelstückText);
    setSelectedMöbelstück(stück);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstückText}${stil}${formattedBudget}${formattedNachricht}\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
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
    return `btn ${isSelectedMöbelstück || isSelectedStil ? 'btn-primary' : 'btn-outline'} flex-1`;
  };

  const handleStilOptionClick = (stil: string) => {
    const stilText = `Stil: ${stil}\n`;
    setStil(stilText);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stilText}${formattedBudget}${formattedNachricht}\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
    setSelectedStil(stil);
  };

// Budget :  
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
    const budgetText = `Budget: ${value[0]}€ - ${value[1]}€\n`;
    setBudget(value);
    setFormattedBudget(budgetText);
    setIsFlexibleBudget(false);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stil}${budgetText}${formattedNachricht}\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
  };

  const handleFlexibleBudgetClick = () => {
    setIsFlexibleBudget(true);
    setBudget([100, 10000]);
    const budgetText = "Flexibles Budget\n";
    setFormattedBudget(budgetText);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stil}${budgetText}${formattedNachricht}\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
  };
// Ende Budget
  const handleNachrichtChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newNachricht = e.target.value;
    setNachricht(newNachricht);
    setFormattedNachricht(`Freie Nachricht: ${newNachricht}\n`);
    setEditableMessage(`Hallo liebes SchnitzStück Team,\n\nich bin auf der Suche nach einem einzigartigen Möbelstück. Hier sind einige Details zu meinem Wunsch:\n\n${möbelstück}${stil}${formattedBudget}${newNachricht}\n\nIch freue mich darauf, von euch zu hören.\n\nMit besten Grüßen`);
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
  }, [editableMessage]); // Dieser Effekt wird ausgeführt, wenn sich `editableMessage` ändert


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
    const formData = {
      "form-name": "nachricht",
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
    .then(() => alert("Dein Nachricht wurde erfolgreich gesendet!"))
    .catch(error => alert("Ups, da ist wohl was schiefgegangen: " + JSON.stringify(error))); // Änderung hier
  };


      return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto my-20 text-center" name="nachricht" method="POST" data-netlify="true">
      <h1 className="text-3xl font-bold text-left" >Mein SchnitzStück:</h1>
      <p className="text-lg text-left mb-10">Egal, ob du schon eine genaue Vorstellung hast oder noch nach Inspiration suchst - bei uns findest du dein persönliches SchnitzStück! Wir möchten deine Träume wahr werden lassen und finden bestimmt einen Weg, deine Vorstellungen in die Realität umzusetzen. Der folgende Pfad soll dir bei der Auswahl und Inspiration behilflich sein. Natürlich kannst du uns aber auch jederzeit direkt kontaktieren. Wir freuen uns darauf, von deinem SchnitzStück-Traum zu hören!</p>
      {/* Möbelstück Auswahl */}
      <div className="form-control">
      <h2 className="text-2xl font-bold text-left" >Möbelstück:</h2>
      <p className="text-lg text-left mb-10">Was für ein Möbelstück suchst du?</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {!showTischOptions && !showStuhlOptions && !showLampeOptions && !showAufbewahrungOptions && (
            <>
              {/* Die ursprünglichen Buttons */}
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Tisch')}
                className={getButtonClass('Tisch')}
              >
                Tisch
              </button>
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Stuhl')}
                className={getButtonClass('Stuhl')}
              >
                Stuhl
              </button>
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Lampe')}
                className={getButtonClass('Lampe')}
              >
                Lampe
              </button>
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Aufbewahrung')}
                className={getButtonClass('Aufbewahrung')}
              >
                Aufbewahrung
              </button>
              <button
                type="button"
                onClick={() => handleMöbelstückClick('Überrascht mich!')}
                className={getButtonClass('Überrascht mich!')}
              >
                Überrascht mich!
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
        <h2 className="text-2xl font-bold text-left mt-20" >Stil:</h2>
        <p className="text-lg text-left mb-10">Welchen Stil hast du dir vorgestellt?</p>
        <div className="flex flex-wrap gap-2 justify-center">
        
          <button
            type="button"
            onClick={() => handleStilOptionClick('Abstrakt')}
            className={getButtonClass('Abstrakt')}
          >
            Abstrakt
          </button>
          <button
            type="button"
            onClick={() => handleStilOptionClick('Detailreich')}
            className={getButtonClass('Detailreich')}
          >
            Detailreich
          </button>
          <button
            type="button"
            onClick={() => handleStilOptionClick('Überrascht mich:)')}
            className={getButtonClass('Überrascht mich:)')}
          >
            Überrascht mich!
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-left mt-20" >Budget:</h2>
      <p className="text-lg text-left mb-10">Gibt es ein Budget für dein SchnitzStück?</p>
      <div className="form-control">
          <ConfigProvider theme={theme}>
              <Slider
                    range
                    defaultValue={[100, 10000]}
                    value={budget}
                    onChange={handleBudgetChange}
                    min={100}
                    max={10000}
                    tipFormatter={tipFormatter}
                />
              <button 
                type="button"
                onClick={handleFlexibleBudgetClick} 
                className={`btn ${isFlexibleBudget ? 'btn-primary' : 'btn-outline'} mt-5`}
              >
                Ich habe kein festes Budget
              </button>
            </ConfigProvider>
      </div>
      <h2 className="text-2xl font-bold text-left mt-20" >Freie Wünsche:</h2>
      <p className="text-lg text-left mb-10">Gibt es ein bestimmtes Thema, das einbezogen werden soll? Hast du spezielle Wünsche bezüglich Formen, Materialien oder besonderen Gestaltungselementen? Lass es uns wissen und wir werden unser Bestes geben, deinen Traum zu verwirklichen!</p>
            <div className="form-control">
        <textarea
          className="textarea textarea-bordered w-full"
          name="nachricht"
          value={nachricht}
          onChange={handleNachrichtChange}
          placeholder="Besondere Wünsche (Optional)."
        />
      </div>
      <h2 className="text-2xl font-bold text-left mt-20" >Nachricht:</h2>
      <p className="text-lg text-left mb-10">Hier kannst du deine Nachricht nochmal kontrollieren oder uns eine freie Nachricht schreiben.</p>
      <div className="form-control">
      <textarea
        ref={textareaRef}
        className="textarea textarea-bordered w-full h-auto"
        style={{ maxHeight: '50vh' }} // Setzt eine maximale Höhe
        name="editableMessage"
        value={editableMessage}
        onChange={handleEditableMessageChange}
        placeholder="Deine Nachricht hier..."
      />
    </div>
    <h2 className="text-2xl font-bold text-left mt-20 mb-10" >E-Mail-Adresse:</h2>
      <div className="form-control mb-10">
        <input
          type="email"
          className="input input-bordered w-full"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Deine E-Mail-Adresse"
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">Deine Nachricht senden</button>
      </div>
    </form>
  );
};

export default NachrichtForm;
