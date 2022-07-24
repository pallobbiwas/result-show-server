const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middel tair

app.use(cors());
app.use(express.json());

//database info

//name: node-login
//password: 8QDRANpTunyPGHzu

const uri =
  "mongodb+srv://admin:admin@cluster0.lqmxs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);

async function run() {
  try {
    await client.connect();
    const resultCollection = client.db("resultData").collection("result");
    console.log("bd connected");

    // simple get
    app.get("/result", async (req, res) => {
      const result = await resultCollection.find({}).toArray();
      res.send(result);
    });

    //simple post
    /*   app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    }); */

    //simple post
    app.post("/result", async (req, res) => {
      const data = req.body;
      const roll = parseInt(data.roll);
      const regNo = parseInt(data.ragistration);
      const examination = data.examinition;
      const board = data.board;
      const year = parseInt(data.year);

      console.log(roll, regNo, examination, board, year);

      const singleResult = await resultCollection.findOne({ roll: roll });

      console.log(singleResult);

      console.log(
        "signle data",
        singleResult?.roll,
        singleResult?.ragistration,
        singleResult?.examinition,
        singleResult?.board,
        singleResult?.year
      );

      if (singleResult) {
        if (
          roll == singleResult?.roll &&
          regNo == singleResult?.ragistration &&
          examination == singleResult?.examinition &&
          board == singleResult?.board &&
          year == singleResult?.year
        ) {
          res.status(200).send(singleResult);
          console.log("tik ace");
        } else {
          console.log("tik nai");
        }
      } else {
        console.log("no data found");
      }
    });
  } finally {
    //   await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ami calu aci");
});

app.listen(port, () => {
  console.log(`ami calu aci ${port}`);
});
