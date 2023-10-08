### CheckDB Function Documentation

#### Overview

The `CheckDB` function is a JavaScript function that checks the integrity of a database by performing CRC32 checksum calculations on specified columns in specified tables. It returns a Promise that resolves to `true` if the operation is successful, and rejects with an error if there's any issue during the process.

#### Description

The function performs the following steps:

1. Reads configuration from `../args/config.json`.
2. Initializes a database connection using the provided configuration.
3. Reads data structure from `../src/data_structure.json`.
4. Constructs a checksum query for specified columns.
5. Retrieves a list of tables from the database.
6. Performs checksum calculations on each table using the constructed query.
7. Logs the results in a tabular format.
8. Resolves the Promise with `true` if the operation is successful.

#### Notes

- Make sure the necessary configuration files (`config.json` and `data_structure.json`) are present in the specified paths.
- The function uses promises for asynchronous operations. Handle the resolved and rejected states accordingly in your code.
- Ensure proper error handling and logging for production use.

Feel free to modify the function according to your specific requirements.

**Note:** This documentation assumes that the necessary dependencies (`Database` and related functions) are properly imported and available in the codebase.
