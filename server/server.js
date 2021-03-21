const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");
const questions = require('./questions');
//const questions = require('./q');


// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, ()=> {
 console.log(`app is running on port ${process.env.PORT}`);
})

//console.log(questions);

  // app.get('/', (req, res) => {
  //   res.json(questions.questionsSet1)
  // })

 // const uri = "mongodb+srv://revital:0542@cluster0.ybxll.mongodb.net/quiz?retryWrites=true&w=majority";
  const uri = "mongodb+srv://revital:0542@quiz.9fujx.mongodb.net/quiz?retryWrites=true&w=majority"

  MongoClient.connect(uri, { useUnifiedTopology: true  })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('conversation');
    const quizCollection = db.collection('convs');

    //quizCollection.insertOne(questions.questionsSet1);

    // const sub = quizCollection.find({}).project({subject: 1, _id:0}).toArray()
    // .then(res => res.map(x => Object.values(x)[0]));
    //console.log(Object.values(sub));


      app.get('/', (req, res) => {
        const sub =[];
         quizCollection.find({}).project({subject: 1, _id:0}).toArray()
        .then(r => r.map(x => sub.push(Object.values(x)[0])))
        db.collection('convs').find().toArray()
          .then(results => {
            console.log(sub);
            res.json({subjects:sub, q:results[0]});
          })
          .catch(error => console.error(error))
        // ...
      })

      app.post('/qeustionset', (req,res) => {
        console.log('post server')
       // console.log(req.body);
         quizCollection.insertOne(req.body);
      })

  })
  .catch(console.error);




 /* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    Note: __dirname is the current directory you're in. Try logging it and see what you get!
    Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })
*/
  // const uri = "mongodb+srv://revital:0542@cluster0.ybxll.mongodb.net/star-war";

  // MongoClient.connect(uri, { useUnifiedTopology: true })
  // .then(client => {
  //   console.log('Connected to Database');
  //   const db = client.db('star-wars-quotes');

  //   const quizCollection = db.collection('quotes');
  //   app.post('/quotes', (req, res) => {
  //       quizCollection.insertOne(req.body)
  //         .then(result => {
  //           res.redirect('/')
  //         })
  //         .catch(error => console.error(error))
  //     })

  //     app.get('/', (req, res) => {
  //       db.collection('quotes').find().toArray()
  //         .then(results => {
  //           console.log(results)
  //         })
  //         .catch(error => console.error(error))
  //       // ...
  //     })


  // //  app.use(/* ... */);
  // //  app.get(/* ... */);
  //   //app.post(/* ... */);
  //   //app.listen(/* ... */);
  // })
  // .catch(console.error);    