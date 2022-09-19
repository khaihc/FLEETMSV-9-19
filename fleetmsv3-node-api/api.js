const client = require("./connectionDB.js");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
});

client.connect();

app.get("/countries", (req, res) => {
  client.query(`Select * from country`, (error, result) => {
    if (!error) {
      res.json({ data: result.rows });
    } else {
      res.json({ error: error.message });
    }
  });
  client.end;
});

app.get("/countries/:id", (req, res) => {
  client.query(
    `Select * from country where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        res.json({ error: err.message });
      }
    }
  );
  client.end;
});

app.post('/countries', (req, res)=> {
    const country = req.body;
    let insertQuery = `INSERT INTO country(id, capital, code, continent, description, nationality) VALUES ('${country.id}', '${country.capital}', '${country.code}', '${country.continent}', '${country.description}', '${country.nationality}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.json({
                message: 'Insertion was successful',
                data: result
            })
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/countries/:id', (req, res)=> {
    let country = req.body;
    let updateQuery = `update country
                       set capital = '${country.capital}',
                       code = '${country.code}',
                       continent = '${country.continent}',
                       description = '${country.description}',
                       nationality = '${country.nationality}'
                       where id = ${country.id}`
    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/countries/:id', (req, res)=> {
    let insertQuery = `delete from country where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
