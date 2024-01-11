import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const FeedbackForm: React.FC = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editableMessage, setEditableMessage] = useState('');
  const [showMegaOptions, setShowMegaOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSatisfactionClick = (level: string) => {
    const satisfactionText = `Bewertung: ${level}`;
    setSatisfaction(satisfactionText);
    setEditableMessage(`${satisfactionText}\nSags frei heraus: ${feedback}`);
    
    setSelectedOption(level);

    if (level === 'Mega! 😍') {
      setShowMegaOptions(true);
    } else {
      setShowMegaOptions(false);
    }
  };

  const handleMegaOptionClick = (level: string) => {
    const satisfactionText = `Bewertung: ${level}`;
    setSatisfaction(satisfactionText);
    setEditableMessage(`${satisfactionText}\nSags frei heraus: ${feedback}`);
    setSelectedOption(level);
  };

  const handleBackClick = () => {
    setShowMegaOptions(false);
    setSelectedOption(''); // Setzt die Auswahl zurück, damit die ursprünglichen Optionen angezeigt werden
  };

  const getButtonClass = (level: string) => {
    return `btn ${level === selectedOption ? 'btn-primary' : 'btn-outline'} flex-1`;
  };

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newFeedback = e.target.value;
    setFeedback(newFeedback);
    setEditableMessage(`Bewertung: ${satisfaction}\nSags frei heraus: ${newFeedback}`); // Nur ein String-Argument
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
      satisfaction,
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
          {!showMegaOptions && (
            <>
              {/* Die ursprünglichen Buttons */}
              <button
                type="button"
                onClick={() => handleSatisfactionClick('Mega! 😍')}
                className={getButtonClass('Mega! 😍')}
              >
                Mega! 😍
              </button>
              <button
                type="button"
                onClick={() => handleSatisfactionClick('Naja... 🤔')}
                className={getButtonClass('Naja... 🤔')}
              >
                Naja... 🤔
              </button>
              <button
                type="button"
                onClick={() => handleSatisfactionClick('Das wird nix! 😒')}
                className={getButtonClass('Das wird nix! 😒')}
              >
                Das wird nix! 😒
              </button>
            </>
          )}
          {showMegaOptions && (
            <>
              {/* Die Mega-Options-Buttons */}
              <button
                type="button"
                onClick={() => handleMegaOptionClick('Super Mega! 🌟')}
                className={getButtonClass('Super Mega! 🌟')}
              >
                Super Mega! 🌟
              </button>
              <button
                type="button"
                onClick={() => handleMegaOptionClick('Normal Mega! 👍')}
                className={getButtonClass('Normal Mega! 👍')}
              >
                Normal Mega! 👍
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
