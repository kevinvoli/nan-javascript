const express= require('express')
const bodyParser = require('body-parser') 
const morgan = require('morgan')('dev')
const twig = require('twig')
const mysql= require('mysql')
const session = require('express-session')
const verificationForm = require('./views/dossier/fonction/verifieForm') 

// CONNECTION A LA BASE DE DONNE

let bd= mysql.createConnection({

	'host' : 'localhost',
	'database' :'db_chocolat',
	'user' : 'root',
	'password' : ''
});

bd.connect((err)=>{
	if (err) {
		console.log('echec de connection a la base de donne' + err.stack)
		return
	}else{
		console.log('connection reussie')
		const app = express()
		const port = 8080

		//moddlewares

		
		// MES MIDDLEWARE


		
		app.use(morgan)
		app.use(express.static('views'))
		app.use(bodyParser.urlencoded({extended: false}))
		app.use(bodyParser.json())
		
		app.use(session({
		  	secret: 'szfrhrbfdfcfbn',
		  	resave: false,
		  	saveUninitialized: true,
		  	cookie: { secure: false }
		}))

		app.get('/', (req,res)=>{
		    res.render('index.twig',{
		        name: req.params.name
		    })
		})

		app.get('/page/inscription.html',(req,res)=>{
		    res.render('page/inscription.twig')
		    	 
		})

		app.post('/page/inscription.html',(req,res)=>{
			
			 var values = [req.body.nom, req.body.prenom, req.body.email, req.body.numero, req.body.password, req.body.confirm] 
			 console.log(values)
			  let verification = verificationForm.verifForm(values)
			  console.log(verification)
			if (verification==false) {
				res.redirect('/page/inscription.html')
			}else{
				values.pop()
				console.log(values)
				 bd.query("INSERT INTO mambre(id,nom,prenom,email,numero,password) VALUES (NULL,?,?,?,?,?)",values,(err, result) => {
			   	if(err){
			   			console.log(err.message)
					  	res.send('erreur lors de l\'enregistrement des donnes dans la base de donnee')
				
 
				}
				else{
					values.length()==0
					console.log(values)
						res.redirect('/page/connection.html')


					   	
				   	}
				})
			}
			

		})
		app.get('/page/connection.html',(req,res)=>{
			
			if (req.session.error) {
				res.locals.error = req.session.error

				req.session.error=undefined
			}
			res.render('page/connection.twig')
		})
		app.post('/page/connection.html',(req,res)=>{

			var data = [req.body.emails, req.body.passwords]

			console.log(data)
			
			
			if (data.emails==='' || data.passwords==='') 
			{

				req.session.error = "erreur de la session"
				console.log(req.session.error)
				res.redirect('/page/connection.html')
			
			}else 
			
			{
				bd.query('SELECT email,password FROM mambre WHERE email=? AND password=?',data,(err,result)=>{
					if (err) {
						console.log(err)
					}else{
						let bonne=result
						console.log(bonne[0])
						res.redirect('/membre/client/client.twig')
					}
				})
				

			
			}







		})




		
		app.get('/page/admin.html', (req,res)=>{
		    res.render('page/admin.twig')
		    
		})


		
		app.listen(8080, ()=>console.log('vous ecoutez sur le pout 8080'))
		}
})

