// Make connection
var socket = io.connect('http://192.168.1.128:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});
message.addEventListener('keydown', function(){
	if (event.key === "Enter") {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
	}
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
	var message = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	var handle = data.handle.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + handle + ': </strong>' + message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
