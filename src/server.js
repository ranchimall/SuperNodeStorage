const http = require('http')
const WebSocket = require('ws')

const Server = module.exports = function(port, client, intra){
    const server =  http.createServer((req, res) => {
        if (req.method === "GET") {
            //GET request (requesting data)
            req.on('end', () => {
                let i = req.url.indexOf("?");
                if (i) {
                    var request = JSON.parse(req.url.substring(i));
                    client.processRequestFromUser(request)
                        .then(result => res.end(JSON.parse(result[0])))
                        .catch(error => res.end(error))
                }
            })
        }
        if (req.method === "POST") {
            let data = '';
            req.on('data', chunk => data += chunk)
            req.on('end', () => {
                console.log(data);
                //process the data storing
                client.processIncomingData(data).then(result => {
                    res.end(result[0]);
                    if (result[1]) {
                        if (result[1] === 'DATA')
                            sendToLiveRequests(result[0])
                        intra.forwardToNextNode(result[1], result[0])
                    }
                }).catch(error => res.end(error))
            })
        }
    });
    server.listen(port, (err) => {
        if(!err)
            console.log(`Server running at port ${port}`);     
    })
    const wsServer = new WebSocket.Server({
        server
    });
    wsServer.on('connection', function connection(ws) {
        ws.onmessage = function(evt) {
            let message = evt.data;
            if (message.startsWith(intra.SUPERNODE_INDICATOR))
                intra.processTaskFromSupernode(message, ws);
            else {
                var request = JSON.parse(message);
                client.processRequestFromUser(JSON.parse(message))
                    .then(result => {
                        ws.send(JSON.parse(result[0]))
                        ws._liveReq = request;
                    }).catch(error => ws.send(error))
            }
        }
    });
    wsServer.on('connection', function connection(ws) {
        ws.onmessage = function(evt) {
            let message = evt.data;
            if (message.startsWith(intra.SUPERNODE_INDICATOR))
                intra.processTaskFromSupernode(message, ws);
            else {
                var request = JSON.parse(message);
                client.processRequestFromUser(JSON.parse(message))
                    .then(result => {
                        ws.send(JSON.parse(result[0]))
                        ws._liveReq = request;
                    }).catch(error => ws.send(error))
            }
        }
    });

    Object.defineProperty(this, "http", {
        get: () => server
    });
    Object.defineProperty(this, "webSocket", {
        get: () => wsServer
    });
}