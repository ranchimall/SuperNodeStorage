## `startNode()`

This function initializes the Node application, performing necessary setup procedures and connecting to the database.

### Parameters

None

### Usage

```javascript
startNode();
```

### Description

The `startNode()` function performs a series of crucial operations to initialize the Node application:

1. **Read Configuration:**
   - Reads configuration settings from the `../args/config.json` file, providing essential parameters for the application's behavior.

2. **Retrieve Password:**
   - Parses command line arguments to extract the password provided via the `-password=` flag. This password is used for decrypting sensitive information.

3. **Load Private Key:**
   - Loads private keys from the `../args/keys.json` file. These keys are then decrypted using the password obtained from the command line arguments. The decrypted keys are essential for secure communication and data integrity.

4. **Database Connection:**
   - Initializes a connection to the database using the credentials provided in the configuration file. This step is vital for storing and retrieving data during the application's runtime.

5. **Load Base Data:**
   - Retrieves essential base data from the database. This data includes critical information necessary for the application's core functionality. The retrieved data is then set in `floGlobals` variables, making it accessible throughout the application.

6. **Refresh Data:**
   - Initiates a data refresh process, ensuring that the application's data remains up-to-date and synchronized with the database. This step is essential for maintaining the integrity of the information used by the application.

7. **Start Server:**
   - Instantiates a server using the port specified in the configuration file. The server acts as a communication interface, allowing clients to interact with the application. Proper configuration of the server is fundamental for handling incoming requests and responses effectively.

These operations collectively prepare the Node application for execution, ensuring that it is properly configured, securely authenticated, and connected to the necessary data sources. Each step is essential for the application to function smoothly and provide the intended services.

### Important Notes

- **Ensure Configuration Files:** Make sure that the necessary configuration files (`config.json` and `keys.json`) are present in the specified paths. These files contain crucial settings and cryptographic keys required for the proper functioning of the application.

- **Implement Proper Error Handling:** Proper error handling mechanisms should be implemented for real-world applications. This ensures graceful handling of errors and prevents unexpected failures, providing a better user experience and easier troubleshooting.

- **Logging:** Implement a robust logging system to track the application's behavior, errors, and other relevant events. Logging is invaluable for debugging and monitoring the application in production environments.

### Dependencies

The `startNode()` function relies on the following dependencies:

- **floCrypto:** This dependency is used for retrieving and decrypting Shamir secrets. It plays a vital role in securely handling sensitive information within the application.

- **Crypto:** This is presumed to be either a custom or an external library for cryptographic operations. Cryptographic operations are essential for ensuring data security, integrity, and authentication.

- **DB:** This is presumed to be a custom module responsible for handling database operations. It likely includes functionalities for creating, retrieving, updating, and deleting data in the connected database.

- **Server:** This is presumed to be a custom module used for setting up a server. The server module facilitates communication between clients and the application, handling incoming requests and providing appropriate responses.

- **intra:** This is presumed to be a custom module designed for handling internal communication within the application. Internal communication modules are essential for components within the application to exchange data and coordinate activities.

These dependencies are crucial components of the application architecture, each serving a specific purpose in ensuring the application's functionality, security, and efficiency.


## `DB.createBase()`

This function initializes the creation of base tables in the database.

### Description

The `DB.createBase` function performs the following operations:

- **Table Creation:**
  - Iterates through the `Base_Tables` object, which presumably contains table names as keys and corresponding column definitions as values.
  - Constructs SQL `CREATE TABLE` statements based on the `Base_Tables` object.
  - Executes SQL statements to create tables in the database if they do not already exist.

### Parameters

None

### Returns

A Promise that resolves when all the table creation statements are successfully executed. The promise resolves with an array of results for each executed SQL statement.

### Important Notes

- Ensure that the `Base_Tables` object is properly defined with table names as keys and corresponding column definitions as values.
- Proper error handling and logging should be implemented for real-world applications to handle any database-related issues.
- Database connection and query execution methods (`queryResolve` in this case) should be appropriately implemented for this function to work as intended.

### `selfDiskMigration(node_change)`

Migrates data from nodes that have undergone changes as per the provided `node_change` object.

**Parameters:**
- `node_change` (object): An object indicating changes in nodes.

**Explanation:**
- The `selfDiskMigration` function migrates data from nodes that have undergone changes as specified in the `node_change` object. It performs the following operations for each node in the provided list of tables:
  1. If the node is marked as `false` in the `node_change` object, it drops the corresponding table from the database.
  2. It reads all data from the node's table and identifies the closest cloud node using the `cloud.closestNode()` function.
  3. If the closest cloud node is different from the current node, it deletes the data entry from the current node's table.

**Usage:**
```javascript
const DB = require('your-database-module');
const cloud = require('your-cloud-module');

function selfDiskMigration(node_change) {
    DB.listTable("SHOW TABLES")
        .then(disks => {
            disks.forEach(n => {
                if (node_change[n] === false)
                    DB.dropTable(n)
                        .then(_ => null)
                        .catch(e => console.error(e));

                DB.readAllDataStream(n, 0, d => {
                    let closest = cloud.closestNode(d.receiverID);
                    if (closest !== n)
                        DB.deleteData(n, d.vectorClock)
                            .then(_ => null)
                            .catch(e => console.error(e));
                })
                    .then(result => console.debug(`Completed self-disk migration for ${n}`))
                    .catch(error => console.error(error));
            });
        })
        .catch(error => console.error(error));
};
```

## `diskCleanUp(base)`

Cleans up data based on the provided base configuration.

**Parameters:**
- `base` (object): The base configuration object containing necessary data for cleanup.

**Explanation:**
- The `diskCleanUp` function cleans up data based on the provided base configuration. It performs the following operations for each serving supernode:
  1. Deletes all unauthorized app data for the given supernode and authorized applications.
  2. For each authorized application:
     - Deletes unofficial data entries (untagged, unknown sender/receiver) for the specified supernode.
  3. Resolves the promise when the cleanup process is finished.

**Note:**
- Ensure that the necessary database and intra-modules are properly imported and initialized in your application.
- Customize the logic inside the function based on your specific use case and database configuration.
- Proper error handling is crucial for robust cleanup functionality. Make sure to handle errors and exceptions as per your application's requirements.

## `base` Object Properties

The `base` object returned after loading data from the database contains the following properties:

#### `base.supernodes`

- **Type**: `object`
- **Description**: Information about supernodes in the system.

#### `base.sn_config`

- **Type**: `object`
- **Description**: Configuration settings for supernodes.

#### `base.appList`

- **Type**: `object`
- **Description**: List of applications in the system.

#### `base.appSubAdmins`

- **Type**: `object`
- **Description**: Sub-admins for applications.

#### `base.appTrustedIDs`

- **Type**: `object`
- **Description**: Trusted IDs for applications.

**Note:**
- The properties of the `base` object contain essential data loaded from the database and are used throughout the application for various functionalities.
- Make sure to handle these properties appropriately in your application logic and error scenarios.
- Customize the usage of these properties based on your specific application requirements.

## `refreshData` Object

The `refreshData` object is responsible for managing the refreshing process in the application. It contains the following properties and methods:

#### `refreshData.count`

- **Type**: `number`
- **Description**: Represents the countdown value for refreshing data. It decrements with each iteration of the refresh process.

#### `refreshData.base`

- **Type**: `object`
- **Description**: Contains the base data for the refresh process, including supernodes, configurations, applications, sub-admins, and trusted IDs.

#### `refreshData.refresh_instance`

- **Type**: `object`
- **Description**: Represents the interval instance for the refresh process. It is used to manage the interval at which data is refreshed.

#### `refreshData.invoke(flag = true)`

- **Parameters**:
  - `flag` (boolean, optional): A flag indicating whether to force the refresh (default is `true`).

- **Returns**: `Promise<boolean>`
- **Description**: Initiates the refresh process. It refreshes blockchain data, performs disk clean-up, and manages the refreshing interval.

#### `refreshData.countdown`

- **Description**: Decrements the countdown value. When the countdown reaches zero or below, it triggers the `invoke()` method to refresh the data.

**Note:**
- The `refreshData` object is essential for maintaining the consistency of data in the application.
- Ensure that the countdown value and refresh intervals are configured appropriately based on your application requirements.
- Handle errors and warnings from the refresh process to maintain the application's stability and reliability.

### `refreshBlockchainData(base, flag)`

This function is responsible for refreshing blockchain data for the application. It communicates with external APIs, updates supernode configurations, and retrieves application sub-admin lists. The function operates asynchronously using promises and provides detailed logs for debugging purposes.

#### Parameters

- `base` (object): The base data for the refresh process, including supernodes, configurations, applications, sub-admins, and trusted IDs.
- `flag` (boolean): A flag indicating whether to force the refresh.

#### Returns

- **Type**: `Promise<string>`
- **Description**: A promise that resolves with a string indicating the status of the data refresh process.

#### Explanation

1. The function initiates the data refresh process by calling external APIs and updating the supernode configurations based on the provided `base` data.

2. It logs the result of the supernode configuration update, including any errors or warnings encountered during the process.

3. The function then communicates with the cloud service using the provided supernode storage ID and a list of supernodes obtained from the `floGlobals` object.

4. It logs the ordered list of nodes obtained from the cloud service, providing insights into the current node configuration.

5. The function retrieves the application sub-admin lists from the blockchain using the `base` data, ensuring the application has the latest sub-admin information.

6. It logs the result of the application sub-admin list update, including any warnings or errors. If there are errors, they are captured as warnings to avoid disrupting the refresh process.

7. Finally, the function resolves the promise with a message indicating that the data has been successfully refreshed from the blockchain. If there are errors during the process, they are captured and passed to the rejection handler of the promise.

#### Note

- Handle any errors or warnings returned during the blockchain data refresh process to maintain the stability and reliability of the application.
- Ensure that the provided `base` data is accurate and up-to-date to obtain the latest information from the blockchain.

## `readSupernodeConfigFromAPI(base, flag)`

This function reads supernode configurations from an external API and updates the local database and application state accordingly. It processes data related to new nodes, updated nodes, removed nodes, configuration settings, and application entries. The function operates asynchronously using promises and provides detailed logs for debugging purposes.

#### Parameters

- `base` (object): The base data for the application, including supernodes, configurations, applications, sub-admins, and trusted IDs.
- `flag` (boolean): A flag indicating whether the data read operation is forced or not.

#### Returns

- **Type**: `Promise<string>`
- **Description**: A promise that resolves with a string indicating the status of the supernode configuration update process.

#### Explanation

1. The function constructs query options for reading data from the blockchain API. It includes parameters such as `sentOnly` to retrieve sent data only, `pattern` to specify the data pattern (in this case, "SuperNodeStorage"), and `after` to fetch data after a specific transaction ID.

2. It calls the external blockchain API to read data related to supernode configurations. The received data is processed to identify new nodes, updated nodes, removed nodes, configuration changes, and application entry modifications.

3. For each type of data change, the function updates the local database using appropriate database operations (e.g., `DB.rmSuperNode` to remove nodes, `DB.addSuperNode` to add new nodes, etc.). It also updates the corresponding entries in the `base` object to reflect the changes in the application state.

4. The function ensures that all database operations are executed successfully. If any operation fails, it captures the errors as warnings, indicating that some data might not have been saved correctly.

5. If there are changes in supernodes (new nodes, updated nodes, or removed nodes), the function triggers data migration processes. The specific data migration method (`selfDiskMigration` or `intra.dataMigration`) is chosen based on the presence of the `flag` parameter. If `flag` is `null`, it implies that the migration process has already taken place, so only node changes are processed using `selfDiskMigration`. If `flag` is provided, indicating a forced update, it triggers `intra.dataMigration` to handle the migration process.

6. Finally, the function resolves the promise with a message indicating that the supernode configuration has been successfully updated. If there are errors during the process, they are captured and passed to the rejection handler of the promise.

#### Note

- Handle any errors or warnings returned during the supernode configuration update process to maintain the stability and reliability of the application.
- Ensure that the provided `base` data is accurate and up-to-date to obtain the latest information from the blockchain.

## `readAppSubAdminListFromAPI(base)`

This function reads sub-administrator lists and trusted IDs for all registered applications from an external API. It processes data related to adding and removing sub-administrators and trusted IDs for each application. The function operates asynchronously using promises and provides detailed logs for debugging purposes.

#### Parameters

- `base` (object): The base data for the application, including supernodes, configurations, applications, sub-admins, and trusted IDs.

#### Returns

- **Type**: `Promise<string>`
- **Description**: A promise that resolves with a string indicating the status of the sub-administrator and trusted ID list loading process.

#### Explanation

1. The function iterates through each registered application in the `base.appList` object. For each application, it constructs query options for reading data from the blockchain API. The options include parameters such as `sentOnly` to retrieve sent data only, `pattern` to specify the application name, and `after` to fetch data after a specific transaction ID.

2. It calls the external blockchain API to read data related to sub-administrator lists and trusted IDs for the current application. The received data is processed to identify added and removed sub-administrators and trusted IDs.

3. For each application, the function updates the local database using appropriate database operations (e.g., `DB.setSubAdmin` and `DB.setTrustedIDs`) to reflect the changes in sub-administrator lists and trusted IDs. It also updates the corresponding entries in the `base` object to maintain the application state.

4. The function ensures that all database operations are executed successfully. If any operation fails, it captures the errors as warnings, indicating that the sub-administrator or trusted ID list might not have been saved correctly.

5. After processing data for all applications, the function resolves the outer promise with a message indicating that the sub-administrator and trusted ID lists have been successfully loaded for all applications. If there are errors during the process, they are captured and passed to the rejection handler of the outer promise.

#### Note

- Handle any errors or warnings returned during the sub-administrator and trusted ID list loading process to maintain the accuracy of application permissions and security.
- Ensure that the provided `base` data is accurate and up-to-date to obtain the latest information from the blockchain.

