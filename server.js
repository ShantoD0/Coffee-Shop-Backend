const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();


const app=express()
app.use(cors())
app.use(express.json())
const port=2000
const name=process.env.NAME
const pass=process.env.PASS


app.get('/',(req,res) => {
res.send('Hello World')
})


const uri = `mongodb+srv://${name}:${pass}@cluster0.f1kjav4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const collection=client.db('coffee_shop').collection('coffee')

    app.post('/coffees',async (req,res) => {
      const result=await collection.insertOne(req.body)
      res.send(result)
    })
    app.get('/coffees',async (req,res) => {
      const result=await collection.find().toArray()
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port,() => {
    console.log('http://localhost:'+port);
})