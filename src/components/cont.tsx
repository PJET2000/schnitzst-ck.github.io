import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editableMessage, setEditableMessage] = useState('');

  const handleSatisfactionClick = (level: string) => {
    const satisfactionText = `Kundenzufriedenheit: ${level}`;
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
    setEditableMessage(`${satisfactionText}\nPersönliches Feedback: ${userFeedback}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gesendetes Feedback:\n${editableMessage}`);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-4 max-w-4xl mx-auto" name="feedback-form" method="POST" data-netlify="true">
      <h2 className="text-2xl font-bold mb-4">Feedback für SchnitzStück</h2>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Wie gefällt Ihnen unsere Seite?</span>
        </label>
        <div className="flex gap-2">
          {['Sehr gut', 'Gut', 'Akzeptabel', 'Schlecht'].map((level) => (
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
          <span className="label-text">Ihr Feedback:</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          name="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Ihr Feedback hier..."
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Überprüfen und bearbeiten Sie Ihre Nachricht:</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          name="editableMessage"
          value={editableMessage}
          onChange={handleEditableMessageChange}
          placeholder="Überprüfen und bearbeiten Sie Ihre Nachricht..."
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">Feedback senden</button>
      </div>
    </form>
  );
};

export default FeedbackForm;
