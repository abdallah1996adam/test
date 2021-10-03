//Initialisation du serveur pour se connecter au back-end
import io from "socket.io-client";

const socket = io.connect("http://localhost:8585");

export default socket;
