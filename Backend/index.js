const connectToMongo=require('./db')
connectToMongo()
const cors=require('cors')

const express=require('express')
const app = express()
const port =5000
app.use(cors())

app.use(express.json())
app.use('/api/todos', require('./Routes/todoTask'))
app.use('/',(req,res)=>{
    res.json({msg:"todo list backend is working"})
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })