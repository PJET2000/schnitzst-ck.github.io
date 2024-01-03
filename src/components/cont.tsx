import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editableMessage, setEditableMessage] = useState('');

  const handleSatisfactionClick = (level: string) => {
    const satisfactionText = `Gefühlslage: ${level}`;
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
    setEditableMessage(`${satisfactionText}\nFreestyle-Feedback: ${userFeedback}`);
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
    .then(() => alert("Dein sagenhaftes Feedback ist unterwegs zu den Sternen!"))
    .catch(error => alert("Ups, da ist wohl was schiefgegangen: ", error));
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 max-w-4xl mx-auto my-8" name="feedback" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="feedback" />
      <h2 className="text-2xl font-bold mb-4">Was hältst du bisher von SchnitzStück?</h2>
      <p>Deine Meinung bringt uns von "Mäh" zu "Yay"!</p>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Wie fühlst du dich auf unserer Seite?</span>
        </label>
        <div className="flex gap-2">
          {['Mega!', 'Naja...', 'Das wird nix!'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleSatisfactionClick(level)}
              className="btn btn-outline"
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Freestyle-Feedback:</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          name="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Hier kannst du mal so richtig die Sau rauslassen..."
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Noch was auf dem Herzen?</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          name="editableMessage"
          value={editableMessage}
          onChange={handleEditableMessageChange}
          placeholder="Feuer frei! Gib uns noch mehr Feedback..."
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">Ab damit ins Universum!</button>
      </div>
    </form>
  );
};

export default FeedbackForm;
