const http = require('http')
const WebSocket = require('ws')
const supernode = require('./supernode')
const backupProcess = require('./backupProcess')
const port = 8080;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        //GET request (requesting data)
        req.on('end', () => {
            let i = req.url.indexOf("?");
            if (i) {
                var request = JSON.parse(req.url.substring(i));
                supernode.processRequestFromUser(request)
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
            supernode.processIncomingData(data).then(result => {
                res.end(result[0]);
                if (result[1]) {
                    if (result[1] === 'DATA')
                        sendToLiveRequests(result[0])
                    backupProcess.forwardToNextNode(result[1], result[0])
                }
            }).catch(error => res.end(error))
        })
    }
});
server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

const wsServer = new WebSocket.Server({
    server
});
wsServer.on('connection', function connection(ws) {
    ws.onmessage = function(evt) {
        let message = evt.data;
        if (message.startsWith(backupProcess.SUPERNODE_INDICATOR))
            backupProcess.processTaskFromSupernode(message, ws);
        else {
            var request = JSON.parse(message);
            supernode.processRequestFromUser(JSON.parse(message))
                .then(result => {
                    ws.send(JSON.parse(result[0]))
                    ws._liveReq = request;
                }).catch(error => ws.send(error))
        }
    }
});

function sendToLiveRequests(data) {
    wsServer.clients.forEach(ws => {
        if (supernode.checkIfRequestSatisfy(ws._liveReq, data))
            ws.send(data)
    })
}