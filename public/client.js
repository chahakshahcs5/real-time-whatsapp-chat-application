const socket = io();

const inputMessage = document.getElementById('inputMessage');
const messageSection = document.querySelector('.message-section');

let name;

do {
   name =  prompt('Enter your name:')
} while (!name);


const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
    sendMessage();
});

function sendMessage() {
    let msg = {
        user: name,
        message: inputMessage.value
    };

    appendMessage(msg, 'incoming-message');

    inputMessage.value = '';

    socket.emit('sendMessage', msg);

    socket.on('sendMessage' , (msg) => {
        appendMessage(msg, 'outgoing-message')
    });
}

function appendMessage(message, type) {
    let div = document.createElement('div');

    let className = type;

    div.classList.add(className);

    let markUp = `<h4>${message.user}</h4>
                  <p>${message.message}</p>`;

    div.innerHTML = markUp;

    messageSection.appendChild(div);
}
