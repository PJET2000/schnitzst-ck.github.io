import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editableMessage, setEditableMessage] = useState('');

  const handleSatisfactionClick = (level: string) => {
    const satisfactionText = `Bewertung: ${level}`;
    setSatisfaction(satisfactionText);
    updateEditableMessage(satisfactionText, feedback);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newFeedback = e.target.value;
    setFeedback(newFeedback);
    updateEditableMessage(satisfaction, newFeedback);
  };

  const handleEditableMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableMessage(e.target.value);
  };

  const updateEditableMessage = (satisfactionText: string, userFeedback: string) => {
    setEditableMessage(`${satisfactionText}\nSags frei heraus: ${userFeedback}`);
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "feedback", ...{satisfaction, feedback, editableMessage} })
    })
    .then(() => alert("Dein Feedback wurde erfolgreich gesendet!"))
    .catch(error => alert("Ups, da ist wohl was schiefgegangen: ", error));
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 max-w-4xl mx-auto my-8 text-center" name="feedback" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="feedback" />
      <h2 className="text-2xl font-bold mb-4">Deine Meinung zählt!</h2>
      <p className="mb-4">Was hältst du bisher von SchnitzStück?</p>
      <div className="form-control">
        <div className="flex gap-2 justify-center">
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
