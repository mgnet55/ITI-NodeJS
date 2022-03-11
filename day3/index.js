const express = require('express');
const fs = require('fs').promises;
const morgan = require('morgan');
let db = require('./db.json');
const app = express();
const port = 9999;


app.use(express.json());
app.use(express.urlencoded());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//insert new
app.post('/add', async (req, res) => {
  const [name, age] = [req.body.name, +req.body.age];
    db.push({name,age});
    fs.writeFile('./db.json', JSON.stringify(db, null, 2)).then(() => {
      res.statusCode = 200;
      res.json({ success: true });
    }).catch(() => {
      res.statusCode = 404;
      res.json({ success: false });
    });

});

//edit with query string
app.patch('/edit/:id', async (req, res) => {
  const { id } = req.params
  const [name, age] = [req.body.name, +req.body.age];
  if (!name || !age) {
    res.statusCode = 400;
    res.json({ success: false });
  }
  else {
    const item = { name, age };
    console.log(item);
    db[id] = item;
    fs.writeFile('./db.json', JSON.stringify(db, null, 2)).then(() => {
      res.statusCode = 200;
      res.json({ success: true });
    }).catch(() => {
      res.statusCode = 404;
      res.json({ success: false });
    });
  }
});

app.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  db.splice(id,1);
  console.log(db);
  fs.writeFile('./db.json', JSON.stringify(db, null, 2)).then(() => {
    res.statusCode = 200;
    res.json({ success: true });
  }).catch((error) => {
    res.statusCode = 404;
    res.json({ success: false });
  });

});


app.use(express.static('public', {
  index: 'home.html'
}));


app.get('/show/:id', (req, res) => {
  const { id } = req.params;
  res.json(db[id]);
});

app.get('/show', (req, res) => {
  res.json(db);
})

app.listen(port, () => {

})
