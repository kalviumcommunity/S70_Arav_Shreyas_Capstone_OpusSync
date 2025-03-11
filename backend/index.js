const express = require('express')
const app = express()

const PORT = 8000

app.get('/', (req, res) => {
 res.status(200).send('Welcome to Opus Sync.')
})

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})