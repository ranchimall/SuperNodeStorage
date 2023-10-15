'use strict';

function K_Bucket(masterID, nodeList) {

    const decodeID = function(floID) {
        let k = bitjs.Base58.decode(floID);
        k.shift();
        k.splice(-4, 4);
        const decodedId = Crypto.util.bytesToHex(k);
        const nodeIdBigInt = new BigInteger(decodedId, 16);
        const nodeIdBytes = nodeIdBigInt.toByteArrayUnsigned();
        const nodeIdNewInt8Array = new Uint8Array(nodeIdBytes);
        return nodeIdNewInt8Array;
    };

    const _KB = new BuildKBucket({
        localNodeId: decodeID(masterID)
    });
    nodeList.forEach(id => _KB.add({
        id: decodeID(id),
        floID: id
    }));
    const _CO = nodeList.map(sn => [_KB.distance(decodeID(masterID), decodeID(sn)), sn])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);

    const self = this;

    Object.defineProperty(self, 'order', {
        get: () => Array.from(_CO)
    });

    self.innerNodes = function(id1, id2) {
        if (!_CO.includes(id1) || !_CO.includes(id2))
            throw Error('Given nodes are not in KB');
        let iNodes = [];
        for (let i = _CO.indexOf(id1) + 1; _CO[i] != id2; i++) {
            if (i < _CO.length)
                iNodes.push(_CO[i]);
            else i = -1;
        };
        return iNodes;
    };

    self.outterNodes = function(id1, id2) {
        if (!_CO.includes(id1) || !_CO.includes(id2))
            throw Error('Given nodes are not in KB');
        let oNodes = [];
        for (let i = _CO.indexOf(id2) + 1; _CO[i] != id1; i++) {
            if (i < _CO.length)
                oNodes.push(_CO[i]);
            else i = -1;
        };
        return oNodes;
    };

    self.prevNode = function(id, N = 1) {
        let n = N || _CO.length;
        if (!_CO.includes(id))
            throw Error('Given node is not KB');
        let pNodes = [];
        for (let i = 0, j = _CO.indexOf(id) - 1; i < n; j--) {
            if (j == _CO.indexOf(id))
                break;
            else if (j > -1)
                pNodes[i++] = _CO[j];
            else j = _CO.length;
        };
        return (N == 1 ? pNodes[0] : pNodes);
    };

    self.nextNode = function(id, N = 1) {
        let n = N || _CO.length;
        if (!_CO.includes(id))
            throw Error('Given node is not KB');
        let nNodes = [];
        for (let i = 0, j = _CO.indexOf(id) + 1; i < n; j++) {
            if (j == _CO.indexOf(id))
                break;
            else if (j < _CO.length)
                nNodes[i++] = _CO[j];
            else j = -1;
        };
        return (N == 1 ? nNodes[0] : nNodes);
    };

    self.closestNode = function(id, N = 1) {
        let decodedId = decodeID(id);
        let n = N || _CO.length;
        let cNodes = _KB.closest(decodedId, n)
            .map(k => k.floID);
        return (N == 1 ? cNodes[0] : cNodes);
    };
}

const blockchainPrefix = 0x23;

function proxyID(address) {
    if (!address)
        return;
    var bytes;
    if (address.length == 34) { //legacy encoding
        let decode = bitjs.Base58.decode(address);
        bytes = decode.slice(0, decode.length - 4);
        let checksum = decode.slice(decode.length - 4),
            hash = Crypto.SHA256(Crypto.SHA256(bytes, {
                asBytes: true
            }), {
                asBytes: true
            });
        hash[0] != checksum[0] || hash[1] != checksum[1] || hash[2] != checksum[2] || hash[3] != checksum[3] ?
            bytes = undefined : bytes.shift();
    } else if (address.length == 42 || address.length == 62) { //bech encoding
        if (typeof coinjs !== 'function')
            throw "library missing (lib_btc.js)";
        let decode = coinjs.bech32_decode(address);
        if (decode) {
            bytes = decode.data;
            bytes.shift();
            bytes = coinjs.bech32_convert(bytes, 5, 8, false);
            if (address.length == 62) //for long bech, aggregate once more to get 160 bit 
                bytes = coinjs.bech32_convert(bytes, 5, 8, false);
        }
    } else if (address.length == 66) { //public key hex
        bytes = ripemd160(Crypto.SHA256(Crypto.util.hexToBytes(address), {
            asBytes: true
        }));
    } else if ((address.length == 42 && address.startsWith("0x")) || (address.length == 40 && !address.startsWith("0x"))){ //Ethereum Address
        if (address.startsWith("0x")) { address = address.substring(2);}
        bytes = Crypto.util.hexToBytes(address);
    }
    
    if (!bytes)
        throw "Invalid address: " + address;
    else {
        bytes.unshift(blockchainPrefix);
        let hash = Crypto.SHA256(Crypto.SHA256(bytes, {
            asBytes: true
        }), {
            asBytes: true
        });
        return bitjs.Base58.encode(bytes.concat(hash.slice(0, 4)));
    }
}

var kBucket;
const cloud = module.exports = function Cloud(masterID, nodeList) {
    kBucket = new K_Bucket(masterID, nodeList);
}

cloud.proxyID = (a) => proxyID(a);
cloud.closestNode = (id, N = 1) => kBucket.closestNode(proxyID(id), N);
cloud.prevNode = (id, N = 1) => kBucket.prevNode(id, N);
cloud.nextNode = (id, N = 1) => kBucket.nextNode(id, N);
cloud.innerNodes = (id1, id2) => kBucket.innerNodes(id1, id2);
cloud.outterNodes = (id1, id2) => kBucket.outterNodes(id1, id2);
Object.defineProperties(cloud, {
    kb: {
        get: () => kBucket
    },
    order: {
        get: () => kBucket.order
    }
});
