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
    <div className="p-4 max-w-lg mx-auto bg-gray-800 text-white">
      <form onSubmit={handleSubmit} name="feedback-form" method="POST" data-netlify="true" className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-center">Feedback für SchnitzStück</h2>
        <div>
          <p>Wie gefällt Ihnen unsere Seite?</p>
          <div className="flex gap-2 justify-center">
            {['Sehr gut', 'Gut', 'Akzeptabel', 'Schlecht'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleSatisfactionClick(level)}
                className="btn btn-primary btn-sm"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          name="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Ihr Feedback hier..."
        />
        <textarea
          className="textarea textarea-bordered h-32"
          name="editableMessage"
          value={editableMessage}
          onChange={handleEditableMessageChange}
          placeholder="Überprüfen und bearbeiten Sie Ihre Nachricht..."
        />
        <button type="submit" className="btn btn-accent">Feedback senden</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
