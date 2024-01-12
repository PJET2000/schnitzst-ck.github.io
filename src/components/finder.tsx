import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import BudgetSlider from './slider';


const FeedbackForm: React.FC = () => {
  const [möbelstück, setMöbelstück] = useState('');
  const [selectedMöbelstück, setSelectedMöbelstück] = useState('');
  const [showTischOptions, setShowTischOptions] = useState(false);
  const [showStuhlOptions, setShowStuhlOptions] = useState(false);
  const [showLampeOptions, setShowLampeOptions] = useState(false);
  const [showAufbewahrungOptions, setShowAufbewahrungOptions] = useState(false);
  const [stil, setStil] = useState('');
  const [selectedStil, setSelectedStil] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editableMessage, setEditableMessage] = useState('');
 

  const handleMöbelstückClick = (stück: string) => {
    const möbelstückText = `Gewähltes Möbelstück: ${stück}`;
    setMöbelstück(möbelstückText);
    setEditableMessage(`${möbelstückText}\n ${stil}`);
    
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
    const möbelstückText = `Gewähltes Möbelstück: ${stück}`;
    setMöbelstück(möbelstückText);
    setEditableMessage(`${möbelstückText}\n ${stil}`);
    setSelectedMöbelstück(stück);
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
    const stilText = `Gewählter Stil: ${stil}`;
    setStil(stilText);
    setEditableMessage(`${möbelstück}\n Gewählter Stil: ${stil}`);
    setSelectedStil(stil);
  };


  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newFeedback = e.target.value;
    setFeedback(newFeedback);
    setEditableMessage(`${möbelstück}\n ${stil}\nBudget: ${budgetRange[0]}€ - ${budgetRange[1]}€\n Sags frei heraus: ${newFeedback}`);
  };

  const handleEditableMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableMessage(e.target.value);
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      "form-name": "feedback",
      möbelstück,
      feedback,
      editableMessage
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formData)
    })
    .then(() => alert("Dein Feedback wurde erfolgreich gesendet!"))
    .catch(error => alert("Ups, da ist wohl was schiefgegangen: " + JSON.stringify(error))); // Änderung hier
  };


      return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 max-w-4xl mx-auto my-8 text-center" name="feedback" method="POST" data-netlify="true">
      {/* ... (Rest des Formulars bis zu den Buttons) */}
      <div className="form-control">
        <div className="flex gap-2 justify-center">
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
                onClick={() => handleMöbelstückClick('Überraschung')}
                className={getButtonClass('Überraschung')}
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
        <p className="text-lg mt-20">Welchen Stil hast du dir vorgestellt?</p>
        <div className="flex gap-2 justify-center mt-10">
        
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
            onClick={() => handleStilOptionClick('Überraschung2')}
            className={getButtonClass('Überraschung2')}
          >
            Überrascht mich!
          </button>
        </div>
      </div>
      <div className="form-control mt-20">
      <BudgetSlider client:load />
      </div>
            <div className="form-control my-4">
        <label className="label">
          <span className="label-text">Sags frei heraus!</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          name="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Deine ehrliche Meinung..."
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Gibt es noch etwas, das dir besonders gefällt oder was verbessert werden könnte?</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          name="editableMessage"
          value={editableMessage}
          onChange={handleEditableMessageChange}
          placeholder="Deine Gedanken hier..."
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">Dein Feedback senden</button>
      </div>
    </form>
  );
};

export default FeedbackForm;
