import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {Survey} from './models/survey.model.js'; 

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))

app.use(express.static("public"));
app.use(cookieParser())

app.post('/api/surveys', async (req, res) => {
    const { sessionId, answers, status } = req.body;

    try {
        const survey = new Survey({ sessionId, answers, status });
        await survey.save();
        res.status(201).json({ message: 'Survey data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving survey data' });
    }
});



export { app };