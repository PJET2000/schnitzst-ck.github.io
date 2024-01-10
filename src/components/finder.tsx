import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const FeedbackForm: React.FC = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editableMessage, setEditableMessage] = useState('');
  const [showMegaOptions, setShowMegaOptions] = useState(false); // Neue Zustandsvariable

  const handleSatisfactionClick = (level: string) => {
    const satisfactionText = `Bewertung: ${level}`;
    setSatisfaction(satisfactionText);
    setEditableMessage(`${satisfactionText}\nSags frei heraus: ${feedback}`);
    if (level === 'Mega! 😍') {
      setShowMegaOptions(true); // Zeige weitere Optionen, wenn "Mega! 😍" gewählt wird
    } else {
      setShowMegaOptions(false);
    }
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
      <input type="hidden" name="form-name" value="feedback" />
      <h2 className="text-2xl font-bold mb-4">Deine Meinung zählt!</h2>
      <p className="mb-4">Was hältst du bisher von SchnitzStück?</p>
      <div className="form-control">
        <div className="flex gap-2 justify-center">
          {!showMegaOptions && (
            <>
              <button
                type="button"
                onClick={() => handleSatisfactionClick('Mega! 😍')}
                className="btn btn-outline flex-1"
              >
                Mega! 😍
              </button>
              <button
            type="button"
            onClick={() => handleSatisfactionClick('Naja... 🤔')}
            className="btn btn-outline flex-1"
          >
            Naja... 🤔
          </button>
          <button
            type="button"
            onClick={() => handleSatisfactionClick('Das wird nix! 😒')}
            className="btn btn-outline flex-1"
          >
            Das wird nix! 😒
          </button>
            </>
          )}
          {showMegaOptions && (
            <>
              <button
                type="button"
                onClick={() => handleSatisfactionClick('Super Mega! 🌟')}
                className="btn btn-outline flex-1"
              >
                Super Mega! 🌟
              </button>
              <button
                type="button"
                onClick={() => handleSatisfactionClick('Normal Mega! 👍')}
                className="btn btn-outline flex-1"
              >
                Normal Mega! 👍
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
