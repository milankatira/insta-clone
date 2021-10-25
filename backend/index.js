const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI='mongodb://localhost/insta'

const PORT = 5000

require('./models/user')

require('./models/post')

app.use(express.json())

app.use(require('./routes/auth'))

app.use(require('./routes/Post'))

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
    console.log('home')
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})