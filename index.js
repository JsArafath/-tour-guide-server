const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5002;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running Yo');
});

app.use(cors());
app.use(express.json());

const users = [

];





const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0dynz3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// 

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorized access' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: 'Forbidden access' })
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
    try{
        const serviceCollection = client.db('tour').collection('services'); 
        const reviewCollection = client.db('tour').collection('review'); 

        // app.get( '/services', async (req, res) =>{
        //     const cursor = serviceCollection.find({});
        //     const services = await cursor.toArray();
        //     res.send(services);
        // })



// service post api 
app.post('/services' , async (req, res) => {
  const data =  req.body;
  const result = await serviceCollection.insertOne(data);
  console.log(result);
  res.send(result);
})

// review post api 
app.post('/review' , async (req, res) => {
  const data =  req.body;
  const result = await reviewCollection.insertOne(data);
  console.log(result);
  res.send(result);
})


// GET API 
// service get api
app.get('/services', async (req, res) => {
  const cursor = serviceCollection.find({});
  const data = await cursor.toArray();
  res.json(data);
})

// service details 
app.get('/service/:id', async(req, res) => {
   const id = req.params.id;
   const query = {_id: ObjectId(id)};
   const booking = await serviceCollection.findOne(query);
   res.send(booking);
})

// review get api 
app.get('/review', async (req, res) => {
  const cursor = reviewCollection.find({});
  const data = await cursor.toArray();
  res.json(data);
})

    }
    finally{

    }
}

run().catch(err =>console.log(err))




app.listen(port, () => {
    console.log(`Simple not server running on port ${port}`);
})



