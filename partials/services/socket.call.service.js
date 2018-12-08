liveStockApp.factory('SocketService', [function () {
    var stack = [];
    var stream = "ws://stocks.mnet.website";
    var onmessageDefer;
    var socket = {
        ws: new WebSocket(stream),
        send: function (data) {
            data = JSON.stringify(data);
            if (socket.ws.readyState == 1) {
                socket.ws.send(data);
            } else {
                stack.push(data);
            }
        },
        onmessage: function (callback) {
            if (socket.ws.readyState == 1) {
                socket.ws.onmessage = callback;
            } else {
                onmessageDefer = callback;
            }
        },
        close: function(){
            socket.ws.close()
            socket.ws =  new WebSocket(stream)
        }
    };
    socket.ws.onopen = function (event) {
        for (i in stack) {
            socket.ws.send(stack[i]);
        }
        stack = [];
        if (onmessageDefer) {
            socket.ws.onmessage = onmessageDefer;
            onmessageDefer = null;
        }
    };
    return socket;
}]);