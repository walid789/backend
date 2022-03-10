const express=require('express')
const app=express();
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = process.env.PORT || 5000;


app.use(express.urlencoded({extended: true})); 

app.use(express.json());

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'tam',
    database        : 'tam'
})


app.get('/getData', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from produit', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

         if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
})
app.get('/getData/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
       
        console.log(req.params.id);
        var id =req.params.id;
        connection.query('SELECT * from produit WHERE id= ?', [id],(err, rows) => {
            connection.release()
            
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

           if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
})
app.get('/data/:cat', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
       
        console.log(req.params.cat);
        var cat =req.params.cat;
        connection.query('SELECT * from produit WHERE categorie= ?', [cat],(err, rows) => {
            connection.release()
            
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

           if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
})
app.post('/addUser', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        const name=req.body.name;
       const email=req.body.email;
       const password=req.body.password;
       const phone=req.body.phone;
        connection.query('INSERT INTO user (nom,mail,pass_word,numro) VALUES (?,?,?,?)', [name,email,password,phone], (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Beer with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from beer table are:11 \n', rows)

        })
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`))