import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { AdminRouter } from './routes/AdminRoutes';
import { PORT } from './config';
import { GetInTouchRouter } from './routes/GetInTouchRoutes';
import { PortfolioRouter } from './routes/PortfolioRoutes';

const app = express();

app.use(cookieParser());
app.use(express.json());


const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://ec2-13-60-23-35.eu-north-1.compute.amazonaws.com:3000',
        'https://nuvance-portfolio.vercel.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/api/v1/auth/admin", AdminRouter);
app.use("/api/v1/getintouch", GetInTouchRouter);
app.use("/api/v1/portfolio" , PortfolioRouter)

app.get("/", (req, res) => {
    res.send("NUVANCE TECH SERVER IS UP!!")
})

app.listen(PORT, () => {
    console.log(`BACKEND IS HOSTED : http://localhost:${PORT}`)
});