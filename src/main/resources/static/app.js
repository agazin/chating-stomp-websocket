var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
		$("#chat-form").show();
		$("#login-form").hide();
    }
    else {
        $("#conversation").hide();
		$("#chat-form").hide();
		$("#login-form").show();
    }
    $("#chatings").html("");
}

function connect() {
    var socket = new SockJS('/agazin-chat-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chatings', function (greeting) {
			console.log('/topic/chatings ->' + greeting);
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
	$("#name").val('');
	$("#message").val('');
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/app/chat", {}, JSON.stringify({'message': $("#message").val(), 'name': $("#name").val()}));
}

function showGreeting(message) {
	$("#message").val('');
    $("#chatings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});

