const express = require("express");
const app = express()
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const port = process.env.PORT || 4000;
const cors = require("cors")


app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://sun:ouHnsvdinVSYVFsC@cluster0.qu5ns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect()
    const servicecollection = client.db('GeniusCar').collection('services')
    app.get('/service', async (req, res) => {
      const query = {}
      const cursor = servicecollection.find(query)
      console.log(cursor);

      const services = await cursor.toArray()
      res.send(services)
      console.log(services);

    });
    app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const services = await servicecollection.findOne(query)
      res.send(services);
    })
    app.post('/service', async (req, res) => {
      const newservice = req.body;
      const result = await servicecollection.insertOne(newservice)
      res.send(result)
      console.log(req.body);

    })
    app.delete('/service/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await servicecollection.deleteOne(query)
      res.send(result)
    })
  }
  finally {

  }
}
console.log(uri);
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('processing done')
})
app.listen(port, () => {
  console.log('showing on front ');

})