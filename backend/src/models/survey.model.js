import mongoose from 'mongoose'

const surveySchema = new mongoose.Schema({
    sessionId: String,
    answers: Map,
    status: String,
})

export const Survey = mongoose.model('Survey', surveySchema);