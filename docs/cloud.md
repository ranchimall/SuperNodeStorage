### `K_Bucket(masterID, nodeList)`

This function creates a Kademlia K-bucket structure based on a given master node ID and a list of node IDs. It provides various methods for querying and manipulating nodes within the K-bucket. The K-bucket organizes nodes in a distributed network for efficient peer-to-peer communication and routing.

#### Parameters

- `masterID` (string): The node ID of the master node, used as a reference point for calculating distances between nodes.
- `nodeList` (array): An array of node IDs to be added to the K-bucket.

#### Properties

- `order` (Array): An array containing the node IDs in the K-bucket, sorted based on their proximity to the master node.

#### Methods

- `innerNodes(id1, id2)`: Returns an array of node IDs that are between the specified nodes `id1` and `id2` in the K-bucket.
- `outerNodes(id1, id2)`: Returns an array of node IDs that are outside the specified nodes `id1` and `id2` in the K-bucket.
- `prevNode(id, N)`: Returns the previous node ID in the K-bucket relative to the given node `id`. Optionally, you can specify the number `N` of previous nodes to retrieve.
- `nextNode(id, N)`: Returns the next node ID in the K-bucket relative to the given node `id`. Optionally, you can specify the number `N` of next nodes to retrieve.
- `closestNode(id, N)`: Returns the closest node ID(s) to the given node `id` in the K-bucket. Optionally, you can specify the number `N` of closest nodes to retrieve.

#### Example Usage

```javascript
const nodeList = ['node1', 'node2', 'node3', 'node4'];
const masterNodeID = 'masterNode';

const kBucket = new K_Bucket(masterNodeID, nodeList);

const innerNodes = kBucket.innerNodes('node1', 'node3');
console.log('Inner Nodes:', innerNodes);

const outerNodes = kBucket.outerNodes('node1', 'node3');
console.log('Outer Nodes:', outerNodes);

const prevNode = kBucket.prevNode('node3');
console.log('Previous Node:', prevNode);

const nextNode = kBucket.nextNode('node3');
console.log('Next Node:', nextNode);

const closestNode = kBucket.closestNode('node2');
console.log('Closest Node:', closestNode);

```

### `proxyID(address)`

This function generates a proxy ID (public key hash) from a given blockchain address. It supports legacy, Bech32, and public key hex formats and ensures the integrity of the address before generating the proxy ID.

#### Parameters

- `address` (string): The blockchain address from which the proxy ID is generated.

#### Returns

- `proxyID` (string): The generated proxy ID (public key hash) derived from the provided address.

#### Throws

- `Error`: Throws an error if the input address is invalid.

#### Example Usage

```javascript
const address = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // Example Bitcoin address
try {
    const proxyId = proxyID(address);
    console.log('Proxy ID:', proxyId);
} catch (error) {
    console.error('Error:', error.message);
}
```

### Mechanism of Generating `proxyID`

The `proxyID(address)` function generates a proxy ID (public key hash) from a given blockchain address using a specific mechanism. Here's how it works:

1. **Address Validation:**
   - The function first validates the input `address` to determine its format (legacy, Bech32, or public key hex).

2. **Address Decoding:**
   - If the input `address` is in legacy format (34 characters), the function decodes the address using Base58 encoding and removes the last 4 checksum bytes to obtain the raw public key.
   - If the address is in Bech32 format (42 or 62 characters), it decodes the address, converts it to raw bytes, and adjusts the size if necessary.
   - If the address is in public key hex format (66 characters), the function converts the hexadecimal representation to bytes.

3. **Prefix Addition:**
   - The function adds the blockchain-specific prefix (e.g., Bitcoin's prefix) to the beginning of the raw public key bytes. This prefix indicates the network and ensures uniqueness.

4. **Double Hashing:**
   - The concatenated bytes (public key with prefix) undergo a double hashing process.
   - First, the bytes are hashed using the SHA-256 (Secure Hash Algorithm 256-bit).
   - The resulting hash is hashed again using SHA-256, creating a double hash of 256 bits.

5. **Checksum Addition:**
   - The first 4 bytes of the double hash result are added as a checksum to the end of the original bytes.
   - This ensures the integrity of the proxy ID and helps detect errors or tampering.

6. **Base58 Encoding:**
   - The final bytes, including the prefix and checksum, are encoded using Base58 encoding to generate the proxy ID.
   - Base58 encoding ensures a more compact representation of the data, removing ambiguous characters like '0', 'O', 'I', and 'l'.

7. **Proxy ID Output:**
   - The generated Base58-encoded string represents the proxy ID, which is a unique and secure identifier derived from the original blockchain address.

This mechanism guarantees the integrity of the proxy ID and its association with the given blockchain address. It allows systems to use proxy IDs for various purposes, such as identity verification and secure communication.

**Note:** The specific blockchain prefix and checksum bytes ensure that the proxy ID is compatible with the target blockchain network and can be used reliably in decentralized applications.
