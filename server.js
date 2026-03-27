import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import '../Lab-14.1/userAuth.js'
import mongoose from 'mongoose'

const experation = '24h'
const secret = process.env.JWT_SECRET

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json())

app.post('/api/users/register', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)

  } catch (e) {
    console.error(e)
    res.status(400).json({ message: 'Something went wrong' })
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(400).json({ message: "Incorrect email or password, try again." })
    }

    const correct = await user.isCorrectPassword(req.body.password)
    if (!correct) {
      res.status(400).json({ message: "Incorrect email or password, try again." })
    }
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username
    }
    const token = jwt.sign({ data: payload }, secret, { expiresIn: experation })

    console.log(token)

    res.status(200).json({ token })
  } catch (e) {
    console.error(e)
    res.status(400).json({ message: "Something went wrong." })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log(`Listening on port: httpL//localhost:${port}!`))