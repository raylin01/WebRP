const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 4000;
const DB_PASS = "<DBPASSWORDHERE>";
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<DBNAMEHERE>:"+DB_PASS+"@cluster0-om1ir.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const directoryName = "/webrp";
client.connect().then();
app.use(express.urlencoded());

const whitelist = [];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1||!origin) {
            callback(null, true)
        } else {
            callback()
        }
    }
};

const hbs = exphbs.create({
    extname      :'hbs',
    layoutsDir   : __dirname+'/views/layout',
    defaultLayout: 'main',
    helpers      : __dirname+'/views/helpers',
    partialsDir  : [
        __dirname+'/views/partials'
    ]
});

app.set('views',path.join(__dirname,"views"));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// set public assets folder
app.use(express.static('assets'));

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.post(directoryName+'/runrequest',(req,res)=> {
    let curObject = req.body;
    let now = new Date();
    let curEpochTime = Math.round(now.getTime() / 1000);
    req.body.time = curEpochTime;
    let curCollection = client.db(<DBNAME>).collection(<COLLECTIONNAME>);
    curCollection.findOne({_id:req.body._id}).then(function(doc) {
        if(!doc) curCollection.insertOne(curObject).then(function(){res.end();}).catch(err => res.send(`Failed to insert item: ${err}`));
      if(req.body.title != doc.title && req.body.url != doc.url){
          if(doc.time < curEpochTime){
            curCollection.update(doc, curObject).then(function(){res.end();}).catch(err => res.send(`Failed to insert item: ${err}`));
          }
      }
      res.end();
  });
});

app.post(directoryName+'/getuserinfo',(req,res)=> {
    let userID = req.body.id;
    let curCollection = client.db(<DBNAME>).collection(<COLLECTIONNAME>);
    curCollection.findOne({_id:userID}).then(function(doc) {
        if(!doc) res.send("{title:'UserID Not Found. Please Check'}");
        else {
            let url = new URL(doc.url)
            let hostname = url.hostname;
            hostname = hostname.split(".");
            if(hostname.length == 1) doc.logo = "default";
            if(hostname[hostname.length-2]=="co"){
                doc.logo = hostname[hostname.length-3];
            }else{
                doc.logo = hostname[hostname.length-2];
            }
            res.send(doc);
        }
      res.end();
  });
});