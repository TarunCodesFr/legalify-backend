# Legalify SaaS

- This is a Software as a Service (SaaS) what this does is basically it gets your legal document (pdf) from the frontend and in the backend it extracts the text from it and feed it to the gemini ai and the ai finds for loopholes & risks in the legal document. After that the ai's response is rendered to the frontend page, Basically a learning project to learn the gemini api and authentication with JWT. 

# api route for authentication

`'/api/auth/register'`
`'/api/auth/login'`

# api route for uploading pdf

`'/api/post/document'`

# api route for getting ai's answer

`'/api/content'`

# techs used in backend

```
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "fs-extra": "^11.3.3",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.1.0",
    "pdf-parse": "^1.1.1",
    "pg": "^8.19.0",
    "typescript": "^5.9.3",
    "zod": "^4.3.6"
```

# Gemini api key

in `.env` add a value with `GEMINI_API_KEY= YOUR_API_KEY`

# Prisma & Postgres Database

in `.env` add a value with `DATABASE_URL= YOUR_DATABASE_URL`

# Authentication

in `.env` add a value with `JWT_SECRET = YOUR_SECRET`

to generate a jwt secret just run: ```node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"``` in terminal of your app and it will provide you an key just paste it in the `.env`

lazy to document
