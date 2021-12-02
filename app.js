const express = require('express')
const app = express()

app.use(express.json())

const herd_routes = require('./routes/herds')
app.use(herd_routes)

const cow_routes = require('./routes/cows')
app.use(cow_routes)

const calciulate_test_routes = require('./routes/calciulate_tests')
app.use(calciulate_test_routes)

const user_routes = require('./routes/users')
app.use(user_routes)

const dotenv = require('dotenv')
dotenv.config()

app.get("/", (req, res) => {
  res.send("ROOT")
})

const PORT = process.env.PORT

if(PORT != undefined){
  app.listen(process.env.PORT, () => {
    console.log("Server is up and listening on " + process.env.PORT)
  })
}
else{
  console.log("PORT is undefined")
}
