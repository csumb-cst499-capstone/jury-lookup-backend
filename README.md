# Jury Lookup Backend
Nodejs backend that utilize a MongoDB

To install dependencies run:
`npm install`

Open your favorite text editor and create a new file named `.env` in root directory
- Add `DATABASE_URL = [MONGODB URL]`
- Generate a JWT Secret by running the following in your terminal
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Add `JWT_SECRET= [REPLACE THIS WITH GENERATED SECRET]`
Save the file.


To start dev server run:
`npm run dev`



| Endpoint                    | Method | Headers                                 | Body                                                   | Response                                               |
|-----------------------------|--------|-----------------------------------------|--------------------------------------------------------|--------------------------------------------------------|
| `/api/post`                 | POST   | N/A                                     | N/A                                                    | String: "Post API"                                     |
| `/api/getAll`               | GET    | N/A                                     | N/A                                                    | JSON Array: Juror records                              |
| `/api/getOne/:id`           | GET    | N/A                                     | N/A                                                    | JSON Object: Juror record                              |
| `/api/verify`               | POST   | Authorization: JWT token                | N/A                                                    | JSON Object: Verification result                       |
| `/api/login`                | POST   | N/A                                     | BadgeNumber: string, PinCode: string                   | Headers: Authorization: JWT token, JSON Object: Token  |
| `/api/postpone`             | POST   | Authorization: JWT token                | BadgeNumber: string, PostponeDate: string (YYYY-MM-DD) | JSON Object: Updated juror details                     |
| `/api/changePostponeStatus` | POST   | Authorization: JWT token                | BadgeNumber: string, CanPostpone: boolean              | JSON Object: Updated juror details                     |
| `/api/summon`               | POST   | Authorization: JWT token                | BadgeNumber: string                                    | JSON Object: Juror summon details                      |
| `/api/hello`                | GET    | N/A                                     | N/A                                                    | JSON Object: { "message": "Hello, World!" }            |
