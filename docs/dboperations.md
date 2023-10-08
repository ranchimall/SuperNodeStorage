## Database Operations

### `initConnection(user, password, dbname, host = 'localhost')`

Initializes a connection to the database.

### `queryResolve(sql, values)`

Executes a SQL query with optional parameterized values and resolves with the query result.

### `queryStream(sql, values, callback)`

Executes a streaming SQL query with optional parameterized values and a callback function.

### Base Tables

#### `DB.createBase()`

Creates base tables in the database if they do not already exist.

#### `DB.setLastTx(id, n)`

Inserts or updates the last transaction ID for a specified ID.

#### `DB.setConfig(name, value)`

Inserts or updates configuration values in the database.

#### `DB.addSuperNode(id, pubKey, uri)`

Inserts or updates a supernode entry in the database.

#### `DB.rmSuperNode(id)`

Removes a supernode entry from the database.

#### `DB.updateSuperNode(id, uri)`

Updates the URI of a supernode entry in the database.

#### `DB.setSubAdmin(appName, subAdmins)`

Sets sub-admins for an application.

#### `DB.setTrustedIDs(appName, trustedIDs)`

Sets trusted IDs for an application.

#### `DB.addApp(appName, adminID)`

Inserts or updates an application entry in the database.

#### `DB.rmApp(appName)`

Removes an application entry from the database.

#### `DB.getBase()`

Retrieves essential data from base tables.

### Supernode Tables

#### `DB.createTable(snID)`

Creates a table for a specific supernode.

#### `DB.dropTable(snID)`

Drops the table for a specific supernode.

#### `DB.listTable()`

Lists all supernode tables in the database.

#### Data Service (by client)

##### `DB.addData(snID, data)`

Adds data to the supernode table.

##### `DB.editData(snID, vectorClock, comment, newSign)`

Edits existing data in the supernode table.

##### `DB.getData(snID, vectorClock)`

Retrieves data from the supernode table.

##### `DB.tagData(snID, vectorClock, tag, tagTime, tagKey, tagSign)`

Tags data in the supernode table.

##### `DB.noteData(snID, vectorClock, note, noteTime, noteKey, noteSign)`

Adds a note to data in the supernode table.

##### `DB.searchData(snID, request)`

Searches data in the supernode table based on criteria.

#### Backup Service

##### `DB.lastLogTime(snID)`

Retrieves the last log time from the supernode table.

##### `DB.createGetLastLog(snID)`

Creates a function to get the last log time for a specific supernode.

##### `DB.readAllDataStream(snID, logtime, callback)`

Reads all data from a specific log time using a callback function.

##### `DB.storeData(snID, data, updateLogTime = false)`

Stores data in the supernode table with optional log time update.

##### `DB.storeEdit(snID, data)`

Edits and stores existing data in the supernode table.

##### `DB.storeTag(snID, data)`

Stores tagged data in the supernode table.

##### `DB.storeNote(snID, data)`

Stores noted data in the supernode table.

##### `DB.deleteData(snID, vectorClock)`

Deletes data from the supernode table.

#### Data Clearing

##### `DB.clearAuthorisedAppData(snID, app, adminID, subAdmins, timestamp)`

Clears authorized app data based on specified criteria.

##### `DB.clearUnauthorisedAppData(snID, authorisedAppList, timestamp)`

Clears unauthorized app data based on specified criteria.

### Exported Functions

#### `init: initConnection`

Exports the `initConnection` function for initializing database connection.

#### `query: queryResolve`

Exports the `queryResolve` function for executing parameterized SQL queries.

#### `query_stream: queryStream`

Exports the `queryStream` function for executing streaming SQL queries.

#### `DB`

Exports the `DB` object containing various database operations.

### `initConnection(user, password, dbname, host = 'localhost')`

**Parameters:**
- `user` (string): Database username.
- `password` (string): Database password.
- `dbname` (string): Database name.
- `host` (string, optional): Database host (default is 'localhost').

**Return Type:**
- `Promise`: Resolves with the `DB` object upon successful initialization.

**Explanation:**
- Initializes a connection pool to the database using the provided credentials.
- Resolves with the `DB` object that contains various database operations.

---

### `queryResolve(sql, values)`

**Parameters:**
- `sql` (string): SQL query.
- `values` (array, optional): Parameterized values for the SQL query.

**Return Type:**
- `Promise`: Resolves with the result of the executed SQL query.

**Explanation:**
- Executes the provided SQL query with optional parameterized values.
- Resolves with the result of the executed SQL query.

---

### `queryStream(sql, values, callback)`

**Parameters:**
- `sql` (string): SQL query.
- `values` (array, optional): Parameterized values for the SQL query.
- `callback` (function, optional): Callback function to handle streamed results.

**Return Type:**
- `Promise`: Resolves with the result of the streamed SQL query.

**Explanation:**
- Executes a streaming SQL query with optional parameterized values.
- Resolves with the result of the streamed SQL query.

---

### Base Tables

#### `DB.createBase()`

**Return Type:**
- `Promise`: Resolves with the result of table creation statements.

**Explanation:**
- Creates base tables in the database if they do not already exist.

#### `DB.setLastTx(id, n)`

**Parameters:**
- `id` (string): ID for which the last transaction is being set.
- `n` (number): Value of the last transaction.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Inserts or updates the last transaction ID for a specified ID.

#### `DB.setConfig(name, value)`

**Parameters:**
- `name` (string): Name of the configuration setting.
- `value` (string): Value of the configuration setting.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Inserts or updates configuration values in the database.

#### `DB.addSuperNode(id, pubKey, uri)`

**Parameters:**
- `id` (string): ID of the supernode.
- `pubKey` (string): Public key of the supernode.
- `uri` (string): URI of the supernode.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Inserts or updates a supernode entry in the database.

#### `DB.rmSuperNode(id)`

**Parameters:**
- `id` (string): ID of the supernode to be removed.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Removes a supernode entry from the database.

#### `DB.updateSuperNode(id, uri)`

**Parameters:**
- `id` (string): ID of the supernode to be updated.
- `uri` (string): New URI for the supernode.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Updates the URI of a supernode entry in the database.

#### `DB.setSubAdmin(appName, subAdmins)`

**Parameters:**
- `appName` (string): Name of the application.
- `subAdmins` (array): Array of sub-admin IDs for the application.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Sets sub-admins for an application.

#### `DB.setTrustedIDs(appName, trustedIDs)`

**Parameters:**
- `appName` (string): Name of the application.
- `trustedIDs` (array): Array of trusted IDs for the application.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Sets trusted IDs for an application.

#### `DB.addApp(appName, adminID)`

**Parameters:**
- `appName` (string): Name of the application.
- `adminID` (string): ID of the admin for the application.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Inserts or updates an application entry in the database.

#### `DB.rmApp(appName)`

**Parameters:**
- `appName` (string): Name of the application to be removed.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Removes an application entry from the database.

#### `DB.getBase()`

**Return Type:**
- `Promise`: Resolves with an object containing essential data from base tables.

**Explanation:**
- Retrieves essential data from base tables including last transactions, configuration settings, app list, sub-admins, trusted IDs, and supernodes.

---

### Supernode Tables

#### `DB.createTable(snID)`

**Parameters:**
- `snID` (string): ID of the supernode for which the table is created.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Creates a table for a specific supernode in the database.

#### `DB.dropTable(snID)`

**Parameters:**
- `snID` (string): ID of the supernode for which the table is dropped.

**Return Type:**
- `Promise`: Resolves with the result of the SQL operation.

**Explanation:**
- Drops the table for a specific supernode from the database.

#### `DB.listTable()`

**Return Type:**
- `Promise`: Resolves with an array of supernode IDs.

**Explanation:**
- Lists all supernode tables in the database.

---

### Data Service (by client)

#### `DB.addData(snID, data)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `data` (object): Data to be added to the supernode table.

**Return Type:**
- `Promise`: Resolves with the added data.

**Explanation:**
- Adds data to the supernode table. The data object should contain necessary fields according to the table structure.

#### `DB.editData(snID, vectorClock, comment, newSign)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `vectorClock` (string): Vector clock identifying the data entry.
- `comment` (string): New comment for the data entry.
- `newSign` (string): New signature for the data entry.

**Return Type:**
- `Promise`: Resolves with the edited data.

**Explanation:**
- Edits existing data in the supernode table identified by the provided vector clock. Updates the comment and signature.

#### `DB.getData(snID, vectorClock)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `vectorClock` (string): Vector clock identifying the data entry.

**Return Type:**
- `Promise`: Resolves with the retrieved data.

**Explanation:**
- Retrieves data from the supernode table identified by the provided vector clock.

#### `DB.tagData(snID, vectorClock, tag, tagTime, tagKey, tagSign)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `vectorClock` (string): Vector clock identifying the data entry.
- `tag` (string): Tag for the data entry.
- `tagTime` (number): Timestamp for the tag.
- `tagKey` (string): Key for the tag.
- `tagSign` (string): Signature for the tag.

**Return Type:**
- `Promise`: Resolves with the tagged data.

**Explanation:**
- Tags data in the supernode table identified by the provided vector clock. Adds tag, tag time, tag key, and tag signature.

#### `DB.noteData(snID, vectorClock, note, noteTime, noteKey, noteSign)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `vectorClock` (string): Vector clock identifying the data entry.
- `note` (string): Note for the data entry.
- `noteTime` (number): Timestamp for the note.
- `noteKey` (string): Key for the note.
- `noteSign` (string): Signature for the note.

**Return Type:**
- `Promise`: Resolves with the noted data.

**Explanation:**
- Adds a note to data in the supernode table identified by the provided vector clock. Adds note, note time, note key, and note signature.

#### `DB.searchData(snID, request)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `request` (object): Search criteria including vector clocks, timestamps, application name, receiver ID, comment, type, and sender ID.

**Return Type:**
- `Promise`: Resolves with an array of matching data entries.

**Explanation:**
- Searches data in the supernode table based on the provided search criteria.

### Backup Service

#### `DB.lastLogTime(snID)`

**Parameters:**
- `snID` (string): ID of the supernode.

**Return Type:**
- `Promise`: Resolves with the last log time.

**Explanation:**
- Retrieves the last log time from the supernode table.

#### `DB.createGetLastLog(snID)`

**Parameters:**
- `snID` (string): ID of the supernode.

**Return Type:**
- `Promise`: Resolves with a function to get the last log time.

**Explanation:**
- Creates a function to get the last log time for a specific supernode.

#### `DB.readAllDataStream(snID, logtime, callback)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `logtime` (number): Log time to start reading data from.
- `callback` (function): Callback function to handle streamed results.

**Return Type:**
- `Promise`: Resolves with the result of the streamed data.

**Explanation:**
- Reads all data from a specific log time using a callback function.

#### `DB.storeData(snID, data, updateLogTime = false)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `data` (object): Data to be stored in the supernode table.
- `updateLogTime` (boolean, optional): Indicates whether to update the log time (default is `false`).

**Return Type:**
- `Promise`: Resolves with the stored data.

**Explanation:**
- Stores data in the supernode table. Optionally, updates the log time if specified.

#### `DB.storeEdit(snID, data, vectorClock)`

**Parameters:**
- `snID` (string): ID of the supernode.
- `data` (object): Data to be updated in the supernode table.
- `vectorClock` (string): Vector clock identifying the data entry to be updated.

**Return Type:**
- `Promise`: Resolves with the edited data.

**Explanation:**
- Edits existing data in the supernode table identified by the provided vector clock. Updates the data fields.

### Error Handling

#### `DB.handleError(err)`

**Parameters:**
- `err` (Error): Error object.

**Return Type:**
- `void`

**Explanation:**
- Handles errors that occur during database operations. Logs the error for debugging purposes.

---

*Note: All functions return Promises for asynchronous handling. Error handling is crucial; ensure proper handling of Promise rejections and errors for robust application behavior.*

### Usage Snippets

```
const { queryResolve } = require('your-database-module');

// Executing SQL Query
const sqlQuery = 'SELECT * FROM users WHERE id = $1';
const userId = 123;

queryResolve(sqlQuery, [userId])
  .then(result => {
    // Handle query result
    console.log(result);
  })
  .catch(error => {
    // Handle query error
    console.error(error);
  });

  const { queryStream } = require('your-database-module');

// Usage Streaming SQL Query
const sqlQuery = 'SELECT * FROM large_table';
const processData = row => {
  // Process each row of data
  console.log(row);
};

queryStream(sqlQuery, [], processData)
  .then(() => {
    // Streaming query completed
    console.log('Streaming query completed.');
  })
  .catch(error => {
    // Handle streaming query error
    console.error(error);
  });


const { DB } = require('your-database-module');

// Usage : Creating base tables
DB.createBase()
  .then(result => {
    // Base tables created successfully
    console.log(result);
  })
  .catch(error => {
    // Handle error during table creation
    console.error(error);
  });


```