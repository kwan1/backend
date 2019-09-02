//setting up configuration for postgresSQL
//jshint esversion:6
const Pool = require('pg').Pool;
const pool = new Pool({

	user: 'postgres',
	host: 'localhost',
	database: 'test',
	password: '123456',
	port : 5432,
})

pool.on('connect',() =>{
	console.log('Successfully connected to database :)');
})
const getUsers = (request,response) => {

	pool.query('SELECT * FROM list ORDER BY id ASC', (error,results) =>{
		if(error){
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getUserById = (request,response) =>{

	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM list WHERE id = $1',[id],(error,results) =>{
		if(error){
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createUser = (request,response) =>{
	
	const {text} =request.body
	const {completed}=request.body
	pool.query('INSERT INTO list (text,completed) VALUES ($1,$2)',[text,completed],(error,results)=>{
		if(error){
			throw error
		}
		response.status(201).send(`List added with ID: ${results.insertId}`)
	})
}

//update a user
const updateUser = (request,response) =>{

	const id = parseInt(request.params.id)
	const {text} = request.body
	const {completed} = request.body
	pool.query(
		'UPDATE list SET text = $1, completed = $2 WHERE id = $3',
		[text,completed,id],
		(error,results)=>{
			if(error){
				throw error
			}
			response.status(200).send(`List modified with ID:${id}`)
		}
		
	)

}

//DELETE a user
const deleteUser = (request,response) =>{
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM list WHERE id = $1',[id], (error,results)=>{
if(error){
	throw error
	}
	response.status(200).send(`List deleted with ID: ${id}`)

	})
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}