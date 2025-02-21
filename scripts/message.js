document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert die Weiterleitung

    let formData = new FormData(this);
    let messageBox = document.getElementById("messageBox");

    fetch(this.action, {
        method: this.method,
        body: formData
    }).then(response => {
        if (response.ok) {
            // **Felder sofort leeren**
            document.getElementById("name").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("message").value = "";

            // Erfolgsmeldung grün anzeigen
            messageBox.style.display = "block";
            messageBox.style.backgroundColor = "green";
            messageBox.textContent = "❤️ Deine Nachricht wurde gesendet!";
            
            // Erfolgsnachricht nach 3 Sekunden ausblenden
            setTimeout(() => {
                messageBox.style.display = "none";
            }, 3000);
        } else {
            // Fehlermeldung rot
            messageBox.style.display = "block";
            messageBox.style.backgroundColor = "red";
            messageBox.textContent = "💔 Fehler beim Senden. Bitte versuche es erneut!";
        }
    }).catch(error => {
        // Netzwerkfehler rot
        messageBox.style.display = "block";
        messageBox.style.backgroundColor = "red";
        messageBox.textContent = "💔 Netzwerkfehler. Bitte überprüfe deine Internetverbindung.";
    });
});