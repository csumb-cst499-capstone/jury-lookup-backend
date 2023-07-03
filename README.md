# Jury Lookup Backend

The Jury Lookup Backend is a Node.js application that utilizes MongoDB for data storage.

## Installation

To install the dependencies, run the following command:

```
npm install
```

Next, create a new file named `.env` in the root directory of the project. Add the following content to the file:

```
DATABASE_URL=[MONGODB_URL]
JWT_SECRET=[GENERATED_SECRET]
```

Replace `[MONGODB_URL]` with the URL of your MongoDB database. To generate a JWT secret, run the following command in your terminal:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated secret and replace `[GENERATED_SECRET]` in the `.env` file.

## Usage

To start the development server, run the following command:

```
npm run dev
```

## API Documentation

The following table lists the available API endpoints with their corresponding methods, headers, request bodies, and responses:

| Endpoint                    | Method | Headers                                 | Body                                                   | Response                                               |
|-----------------------------|--------|-----------------------------------------|--------------------------------------------------------|--------------------------------------------------------|
| `/api/getAll`               | GET    | N/A                                     | N/A                                                    | JSON Array: Juror records                              |
| `/api/getOne/:id`           | GET    | N/A                                     | N/A                                                    | JSON Object: Juror record                              |
| `/api/verify`               | POST   | Authorization: JWT token                | N/A                                                    | JSON Object: Verification result                       |
| `/api/login`                | POST   | N/A                                     | BadgeNumber: string, PinCode: string                   | Headers: Authorization: JWT token, JSON Object: Token  |
| `/api/postpone`             | POST   | Authorization: JWT token                | BadgeNumber: string, PostponeDate: string (YYYY-MM-DD) | JSON Object: Updated juror details                     |
| `/api/changePostponeStatus` | POST   | Authorization: JWT token                | BadgeNumber: string, CanPostpone: boolean              | JSON Object: Updated juror details                     |
| `/api/summon`               | POST   | Authorization: JWT token                | BadgeNumber: string                                    | JSON Object: Juror summon details                      |
| `/api/hello`                | GET    | N/A                                     | N/A                                                    | JSON Object: { "message": "Hello, World!" }            |

Please make sure to include the necessary headers and request bodies as specified in the table.

Remember to replace `[MONGODB_URL]` with your MongoDB database URL and `[GENERATED_SECRET]` with the generated JWT secret in the `.env` file.

## Frequenty Asked Questions (FAQ)
### How does the login flow work?
The login flow for the Jury Lookup Backend follows these steps:

1. The client sends a POST request to the `/api/login` endpoint with the following request body:
   ```
   {
     "BadgeNumber": "[badge number]",
     "PinCode": "[pin code]"
   }
   ```
   - The `BadgeNumber` is a string representing the juror's badge number.
   - The `PinCode` is a string representing the juror's pin code.

2. The server verifies the provided credentials by calling the `verifyCredentials` helper function.
   - The function checks if a juror with the given `BadgeNumber` and `PinCode` exists in the database.
   - If the credentials are invalid or the juror does not exist, the server returns a 401 status code with the following response:
     ```
     {
       "message": "Invalid credentials"
     }
     ```

3. If the credentials are valid, the server generates a JWT (JSON Web Token) for the authenticated juror by calling the `JWT.generateToken()` function, passing in the `foundJuror` object.
   - The generated token contains the juror's information and is signed with the JWT secret.

4. The server includes the generated token in the response headers with the key `Authorization`.

5. The server returns a JSON response with the following structure:
   ```
   {
     "token": "[generated token]"
   }
   ```
   - The `[generated token]` is the JWT generated in step 3.

6. The client can then use the received token for subsequent requests by including it in the `Authorization` header.


Feel free to adjust the documentation as needed for your specific application.
