const submit = document.getElementById('submit');
const message = document.getElementById('message');
const feedback = document.createElement('div'); // Feedback-Div erstellen
feedback.style.display = 'none'; // Anfangs versteckt
feedback.style.padding = '10px';
feedback.style.marginTop = '10px';
feedback.style.backgroundColor = 'green';
feedback.style.color = 'white';
feedback.style.textAlign = 'center';
feedback.textContent = 'Nachricht erfolgreich gesendet';

// Feedback nach dem Button hinzufügen
submit.parentElement.insertBefore(feedback, submit);

submit.addEventListener('click', () => {
    const path = '/show-my-skill/nachrichten';

    // Prüfen, ob der Pfad existiert
    fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            // Pfad existiert nicht, also erstelle ihn
            createPathAndSaveMessage(path);
        } else {
            // Pfad existiert, speichere die Nachricht
            saveMessage(path);
        }
    })
    .catch(() => {
        // Fehler beim Abrufen des Pfades, also erstelle ihn
        createPathAndSaveMessage(path);
    });
});

function createPathAndSaveMessage(path) {
    const messageData = {
        datum: new Date().toLocaleDateString(),
        uhrzeit: new Date().toLocaleTimeString(),
        message: message.value,
    };

    // Füge den Code hinzu, um den Pfad zu erstellen und die JSON zu speichern
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage();
        } else {
            console.error('Fehler beim Erstellen des Pfades.');
        }
    })
    .catch(err => {
        console.error('Fehler: ', err);
    });
}

function saveMessage(path) {
    const messageData = {
        datum: new Date().toLocaleDateString(),
        uhrzeit: new Date().toLocaleTimeString(),
        message: message.value,
    };

    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage();
        } else {
            console.error('Fehler beim Speichern der Nachricht.');
        }
    })
    .catch(err => {
        console.error('Fehler: ', err);
    });
}

function showSuccessMessage() {
    // Zeige das Erfolg-Feedback und leere die Nachricht
    feedback.style.display = 'block';
    message.value = ''; // Leere die Textarea
}
