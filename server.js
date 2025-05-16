const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const students = require('./public/student.json');


const app=express()
app.use(cors())
app.use(express.json())
const port=2000

app.get('/',(req,res) => {
res.send('Hello World')
})


const uri = "mongodb+srv://shanto:cBNV5fVcTybbMiFU@cluster0.f1kjav4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    // app.get('/coffees',(req,res) => {
      
    // })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





app.listen(port,() => {
    console.log('http://localhost:'+port);
})