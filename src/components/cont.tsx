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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4" name="feedback-form" method="POST" data-netlify="true">
      <h2 className="text-xl font-semibold mb-4">Feedback für SchnitzStück</h2>
      <div className="mb-4">
        <p className="mb-2">Was halten Sie bisher von SchnitzStück?</p>
        <div className="flex gap-2">
          {['Mega!', 'Ganz ok', 'Das wird nix...'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleSatisfactionClick(level)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          name="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Ihr Feedback hier..."
        />
      </div>
      <div className="mb-4">
        <p className="mb-2">Ihre Nachricht zur Überprüfung:</p>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows={6}
          name="editableMessage"
          value={editableMessage}
          onChange={handleEditableMessageChange}
        />
      </div>
      <div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Feedback senden</button>
      </div>
    </form>
  );
};

export default FeedbackForm;
