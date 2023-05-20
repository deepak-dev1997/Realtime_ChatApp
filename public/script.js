// fetch -> to get data from my server.
// a loop that runs after every 1 sec. -> fetch this might work.
// socket io cricket score, chat application.

//

const socket = io();
let username = "";
document.getElementById("join-btn").addEventListener("click", (event) => {
  event.preventDefault();
  username = document.getElementById("username-input").value;
  if (username.trim() != "") {
    // username is empty or not;
    // we need to hide the form input;
    document.querySelector(".form-username").style.display = "none";
    // we need to display my chat container;
    document.querySelector(".chatroom-container").className="chat-cont";
    document.querySelector(
      ".chatroom-header"
    ).innerText = `Chatroom - ${username}`;
  }
});

document.getElementById("send-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const data = {
    username: username, // I am getting it from somewhere.
    message: document.getElementById("message-input").value,
  };
  // here I need to inform my socket io(socket will emit the data);
  socket.emit("message",data);
  addMessage(data, true);
});

// receiving message -> do logic
// i get message from my socket io addMessage(data,false);
socket.on("message", (data) => {
  if (data.username !== username) {
    addMessage(data, false);
  }
});

function addMessage(data, check) {
  // true for sent
  // false for recieve
  var msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username}: ${data.message}`;
  if (check) {
    // right
    msgDiv.setAttribute("class", "message sent");
  } else {
    // left
    msgDiv.setAttribute("class", "message recieved");
  }
  document.getElementById("messages-container").appendChild(msgDiv);
  document.getElementById("message-input").value = "";
  let chatContainer = document.getElementById('messages-container');
  chatContainer.scrollTop = chatContainer.scrollHeight;

// Step 3: Optionally, scroll the last message into view
var lastMessage = chatContainer.lastElementChild;
lastMessage.scrollIntoView();
}