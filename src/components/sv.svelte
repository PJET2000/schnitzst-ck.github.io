<script>
    let satisfaction = '';
    let feedback = '';
    let editableMessage = '';
  
    const handleSatisfactionClick = (level) => {
      const satisfactionText = `Bewertung: ${level}`;
      satisfaction = satisfactionText;
      editableMessage = `${satisfactionText}\nSags frei heraus: ${feedback}`;
    };
  
    const handleFeedbackChange = (event) => {
      feedback = event.target.value;
      editableMessage = `Bewertung: ${satisfaction}\nSags frei heraus: ${feedback}`;
    };
  
    const handleEditableMessageChange = (event) => {
      editableMessage = event.target.value;
    };
  
    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = {
        "form-name": "feedback",
        satisfaction,
        feedback,
        editableMessage
      };
  
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode(formData)
        });
        if (response.ok) {
          alert("Dein Feedback wurde erfolgreich gesendet!");
        } else {
          throw new Error('Fehler beim Senden des Feedbacks');
        }
      } catch (error) {
        alert("Ups, da ist wohl was schiefgegangen: " + error);
      }
    };
  </script>
  
  <form on:submit={handleSubmit} class="card bg-base-100 shadow-xl p-6 max-w-4xl mx-auto my-8 text-center" name="feedback" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="feedback" />
    <h2 class="text-2xl font-bold mb-4">Deine Meinung zählt!</h2>
    <!-- ... restlichen Formular-Elemente ... -->
  </form>
  