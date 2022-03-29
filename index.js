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
            //console.log('The data from beer table are: \n', rows)
        })
    })
})
app.get('/data/:cat', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
       // console.log('connected as id ' + connection.threadId)
       
       // console.log(req.params.cat);
        var cat =req.params.cat;
        connection.query('SELECT * from produit WHERE categorie= ?', [cat],(err, rows) => {
            connection.release()
            
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

           if(err) throw err
           // console.log('The data from beer table are: \n', rows)
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
            res.send(`user add succeful`)
        } else {
            console.log(err)
        }
        
       // console.log('The data from beer table are:11 \n', rows)

        })
    })
});
app.post('/addPanier', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
         const id=req.body.id;
         const nom=req.body.nom;
         const prix=req.body.prix;
        const image=req.body.image;
        const dim=req.body.dim;
        const mat=req.body.mat;
        const quanite=req.body.quanite;
        const id_user=req.body.id_user;
        const id_produit=req.body.id_produit;
        //console.log(nom+ 'heloo')
        connection.query('INSERT INTO panier (nom,prix,image,dim,matriel,quantite,id_user,id_produit)  VALUES (?,?,?,?,?,?,?,?) ',[nom,prix,image,dim,mat,quanite,id_user,id_produit], (err, rows) => {
            //INSERT INTO panier (id,nom,prix,image,dim,matriel,quantite,id_user)
            // SELECT id,nom,prix,image,dim,matriel,quantite FROM produit WHERE id=? ;

        connection.release() // return the connection to pool
        if (!err) {
            res.send(`panier ajouter avec succes`)
        } else {
            console.log(err)
        }
   //     console.log('The data from beer table are:11 \n', prix)
        })
    })
});




app.post('/addProduit', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
         const nom=req.body.nom;
         const prix=req.body.prix;
        const url=req.body.url;
        const url1=req.body.url1;
        const url2=req.body.url2;
        const url3=req.body.url3;
        const url4=req.body.url4;
        const dim=req.body.dim;
        const mat=req.body.mat;
        const cat=req.body.selcted;
  
        connection.query('INSERT INTO produit (nom,prix,categorie,image,dim,matriel,sous_image1,sous_image2,sous_image3,sous_image4)  VALUES (?,?,?,?,?,?,?,?,?,?) ',[nom,prix,cat,url,dim,mat,url1,url2,url3,url4], (err, rows) => {
         

        connection.release() // return the connection to pool
        if (!err) {
            res.send(`panier ajouter avec succes`)
        } else {
            console.log(err)
        }
   //     console.log('The data from beer table are:11 \n', prix)
        })
    })
});



app.post('/getUser', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)

        var mail =req.body.mail;
        var pass=req.body.pass;
      //  console.log("mail="+mail);
        connection.query('SELECT * FROM user WHERE mail=? AND pass_word=?', [mail,pass],(err, rows) => {
            connection.release()
            
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

           if(err) throw err
           // console.log('The data from beer table are: \n', rows)
        })
    })
})


// retourne tous les donne du produit 
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
           // console.log('The data from beer table are: \n', rows)
        })
    })
})

//retourne tous les donne du panier 
app.post('/getPanier', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
     
        connection.query('SELECT * FROM panier WHERE id_user=?', [req.body.id],(err, rows) => {
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
app.post('/DeletPanier', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
     
        connection.query('DELETE FROM panier WHERE id_user=? AND id=?', [req.body.id_user,req.body.id],(err, rows) => {
            connection.release() 
            if (!err) {
                res.send(rows)
            } else {
                console.log(err) 
            }

         if(err) throw err
         //console.log('The data from beer table are: \n', rows)
        })
    })
})


const multer=require('multer')
const cors =require('cors');

const storage=multer.diskStorage({
    destination:'../../my-app1/src/assets/image',
    filename:function(req,file,cb){
       const name=file.originalname.replace(".jpg","")
       console.log(name);
       console.log(file.mimetype.split('/')[1])
    cb(null,name+'.'+file.mimetype.split('/')[1])
    }
})


const upload=multer({storage: storage})
app.use(cors());
app.post('/addImage',upload.single('file'),(req,res)=>{})


app.listen(port, () => console.log(`Listening on port ${port}`))