// Connexion au serveur WebSocket
var socket = new WebSocket('ws://localhost:8080');

// Événement déclenché lors de la connexion au serveur
socket.onopen = function() {
    console.log("Connecté au serveur");
};

// Événement déclenché lors de la réception d'un message
socket.onmessage = function(event) {
    var message = JSON.parse(event.data);
    afficherMessage(message.username, message.text);
};

// Événement déclenché lors de la déconnexion du serveur
socket.onclose = function() {
    console.log("Déconnecté du serveur");
};

// Fonction pour envoyer un message au serveur
function envoyerMessage() {
    var username = document.getElementById("username").value;
    var message = document.getElementById("message").value;
    var data = { username: username, text: message };
    socket.send(JSON.stringify(data));
    document.getElementById("message").value = "";
}

// Fonction pour afficher un message dans la zone de chat
function afficherMessage(username, message) {
    var chat = document.getElementById("chat");
    var div = document.createElement("div");
    div.innerHTML = "<strong>" + username + "</strong>: " + message;
    chat.appendChild(div);
}
