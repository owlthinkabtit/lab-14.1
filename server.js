import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from './models/User.js'


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
    
  }catch(e) {
    console.error(e)
    res.status(400).json({ message: 'Something went wrong'})
  }
})