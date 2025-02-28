import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.mjs';
import userRouter from './routes/user.routes.mjs';

dotenv.config()

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev')); // Or 'dev', 'common', 'short', 'tiny' based on your preference

app.use(helmet({
    crossOriginResourcePolicy: false
}))


app.get("/", (request, response) => {
    // server to clinet data 
    response.json({
        message: "Server is Running " + PORT
    })
})
app.use('/api/user', userRouter)


const PORT = 8080 || process.env.PORT;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

