# Jury Lookup Backend
Nodejs backend that utilize a MongoDB

To install dependencies run:
`npm install`

Open your favorite text editor and create a new file named `.env` in root directory
- Add `DATABASE_URL = [MONGODB URL]`
- Generate a JWT Secret by running `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
 in your terminal
- Add `SECRET_KEY = [REPLACE THIS WITH GENERATED SECRET]`
Save the file.


To start dev server run:
`npm run dev`
