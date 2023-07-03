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

Feel free to adjust the documentation as needed for your specific application.
