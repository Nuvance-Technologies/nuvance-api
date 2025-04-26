import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { AdminRouter } from './routes/AdminRoutes';
import { PORT } from './config';

const app = express();

app.use(cookieParser());
app.use(express.json());


const corsOptions = {
    origin: [
        'http://localhost:3000',
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/api/v1/auth/admin", AdminRouter)

app.get("/", (req, res) => {
    res.send("NUVANCE TECH SERVER IS UP!!")
})

app.listen(PORT, () => {
    console.log(`BACKEND IS HOSTED : http://localhost:${PORT}`)
});