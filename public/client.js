
const socket = io();
const messageArea = document.querySelector('.messageBox');
const textarea = document.querySelector('#textarea');
let name;


do {
    name = prompt('Please enter your name: ');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});


function sendMessage(message) {
    const msg = {
        user: name,
        message: message.trim(),
    };

    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add(type, 'message');

    const markup = `
        <h5>${msg.user}</h5>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
