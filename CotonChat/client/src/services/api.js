//initating the server to connect to back-End
import io from "socket.io-client";

const socket = io.connect("http://localhost:8585");

export default socket;