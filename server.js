import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import '../Lab-14.1/userAuth.js'
import mongoose from 'mongoose'


const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json())

app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
    
  }catch(e) {
    console.error(e)
    res.status(400).json({ message: 'Something went wrong'})
  }
});



app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log(`Listening on port: httpL//localhost:${port}!`))