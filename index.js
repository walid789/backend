const express=require('express')
const app=express();
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = process.env.PORT || 5000;


app.use(express.urlencoded({extended: true})); 

app.use(express.json());

const pool  = mysql.createPool({
    connectionLimit : 15,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'tam1'
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
       const date=req.body.date;
       const adresse=req.body.adresse;
        connection.query('INSERT INTO user (nom,mail,pass_word,numro,date,adresse) VALUES (?,?,?,?,?,?)', [name,email,password,phone,date,adresse], (err, rows) => {
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
        connection.query('INSERT INTO panier (nom,prix,image,dim,matriel,quantite,id_user,id_produit)  VALUES (?,?,?,?,?,?,?,?) ',[nom,prix,image,dim,mat,quanite,id_user,id_produit], (err, rows) => {
         

        connection.release() // return the connection to pool
        if (!err) {
            res.send(`produit ajouter a panier  avec succes`)
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
         const quanite=req.body.quanite;
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
  
        connection.query('INSERT INTO produit (nom,prix,categorie,image,dim,matriel,sous_image1,sous_image2,sous_image3,sous_image4,quanite)  VALUES (?,?,?,?,?,?,?,?,?,?,?) ',[nom,prix,cat,url,dim,mat,url1,url2,url3,url4,quanite], (err, rows) => {
         

        connection.release() // return the connection to pool
        if (!err) {
            res.send(`produit ajouter avec succes`)
        } else {
            console.log(err)
        }
   //     console.log('The data from beer table are:11 \n', prix)
        })
    })
});

app.post('/addCommande', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
         const quantite=req.body.quantite;
         const  id_produit=req.body.id_produit;
         const id_user=req.body.id_user;
        const date=req.body.date;
  
        connection.query('INSERT INTO commande (id_user,id_produit,quantite,date)  VALUES (?,?,?,?) ',[id_user,id_produit,quantite,date], (err, rows) => {
         

        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Commande ajouter avec succes`)    
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


app.get('/getBestSales', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT p.* ,sum(c.quantite) as count FROM produit As p, commande As c  WHERE c.id_produit=p.id   GROUP by p.nom ORDER BY count DESC', (err, rows) => {
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


app.get('/getCommande', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from commande', (err, rows) => {
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


app.post('/FrogetPassword', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        //console.log('connected as id ' + connection.threadId)
     
        connection.query('SELECT * FROM user WHERE mail=?', [req.body.mail],(err, rows) => {
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

app.post('/getUserById', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
      console.log(req.body.id)
        connection.query('SELECT * FROM user WHERE id=?', [req.body.id],(err, rows) => {
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


app.get('/getAllUser', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
    
        connection.query('SELECT * FROM user ', [],(err, rows) => {
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

app.post('/getProduitById', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
      console.log(req.body.id)
        connection.query('SELECT * FROM produit WHERE id=? ', [req.body.id_produit],(err, rows) => {
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


app.post('/DeletProduit', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
     
        connection.query('DELETE FROM Produit WHERE id=?', [req.body.id],(err, rows) => {
            connection.release() 
            if (!err) {
                res.send('Produit supprimer !')
            } else {
                console.log(err) 
            }
            if(err) throw err
     
        })
    })
})




app.post('/DeletPanier', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
     
        connection.query('DELETE FROM panier WHERE id_user=? AND id=?', [req.body.id_user,req.body.id],(err, rows) => {
            connection.release() 
            if (!err) {
                res.send("produit supprimer de la panier !!")
            } else {
                console.log(err) 
            }

         if(err) throw err
         //console.log('The data from beer table are: \n', rows)
        })
    })
})




app.post('/DeletCommande', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
     
        connection.query('DELETE FROM commande WHERE id=?', [req.body.id],(err, rows) => {
            connection.release() 
            if (!err) {
                res.send('commande supprimer !')
            } else {
                console.log(err) 
            }
            if(err) throw err

        
     
        })
    })
})

app.put('/UpdateProduit', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const { id, nom, prix, selcted,dim,mat, url,url1, url2,url3 ,url4,quanite} = req.body

        connection.query('UPDATE produit SET nom = ?, prix = ?, categorie = ?, image = ?,  dim = ?, matriel = ?, sous_image1 = ? , sous_image2 = ? , sous_image3 = ? , sous_image4 = ?,quanite= ? WHERE id = ?', [nom, prix, selcted,url,dim,mat, url1, url2,url3 ,url4, quanite,id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`produit modifier avec succes !`)
            } else {
                console.log(err)
            }
            
        })
        console.log(req.body)
    })
})




app.put('/UpdateStockProduit', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err

        const { id,stock} = req.body
        
        connection.query('UPDATE produit SET quanite=quanite - ? WHERE id = ?', [stock,id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`produit update avec succes !`)
            } else {
                console.log(err)
            }
            
        })
        console.log(req.body)
    })
})




app.put('/UpdateCommande', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        const { id, Payment} = req.body

        connection.query('UPDATE commande SET Payement = ?  WHERE id = ?', [Payment, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`commande update avec succes !`)
            } else {
                console.log(err)
            }
            
        })
        console.log(req.body)
    })
})


const multer=require('multer')
const cors =require('cors');

const storage=multer.diskStorage({
    destination:'../pfe/src/assets/image',
    filename:function(req,file,cb){
       // console.log(file.mimetype)
        let i=file.originalname.indexOf(".");
        let ch=file.originalname.slice(0,i);
        //console.log(ch)
        
        let type2=file.originalname.substr(i,4);
        console.log('valeur'+type2)
    cb(null,ch+'.'+file.mimetype.split('/')[1])
    }
})


const upload=multer({storage: storage})
app.use(cors());
app.post('/addImage',upload.single('file'),(req,res)=>{
    res.send('image ajouter avec succes')
})


app.listen(port, () => console.log(`Listening on port ${port}`))