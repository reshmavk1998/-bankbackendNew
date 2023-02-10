//import express inside index.js
const express = require('express')

// import cors in index.js
const cors = require('cors')

// import dataservices
// const dataservices= require('./services/dataservices')
const dataService=require('./services/dataservices')

// import jsonwebtoken
const jwt= require('jsonwebtoken')

//  create server using express
const server = express()

// use cors
server.use(cors({
    origin:'http://localhost:4200'
}))

// to parse json data
server.use(express.json())

// set up port number for server app
server.listen(3000,()=>{
    console.log('server started at 3000');
})

// application specific Middleware
const appMiddleware= (req,res,next)=>{
    console.log('inside application specific middleware');
    next()
}
server.use(appMiddleware)


// bankapp front end request resolving

// token verify middleware
const jwtMiddleware= (req,res,next)=>{
    console.log('inside router specific middleware');
    // get token from req headers
    const token= req.headers['access-token']
    console.log(token);
try {
     // verify token
const data =  jwt.verify(token,'supersecretkey123')
console.log(data);
req.fromAcno= data.currentAcno
console.log('Valid Token');
next()
} 
catch {
    console.log('Invalid Token');
    res.status(401).json({
        message:'please login!!'
    })
    
}
    }

// register api call 
server.post('/register',(req,res)=>{
    console.log('inside register function');
    console.log(req.body);
    // asynchronous function
dataService.register(req.body.uname,req.body.acno,req.body.pswd)
.then((result)=>{
    res.status(result.statusCode).json(result)

})
})

// login api call 
server.post('/login',(req,res)=>{
    console.log('inside login function');
    console.log(req.body);
    // asynchronous function
dataService.login(req.body.acno,req.body.pswd)
.then((result)=>{
    res.status(result.statusCode).json(result)

})
})

// getbalance api
server.get('/getBalance/:acno',jwtMiddleware,(req,res)=>{
console.log('inside getBalance Api');
console.log(req.params.acno);
// asynchronous function
dataService.getBalance(req.params.acno)
.then((result)=>{
   res.status(result.statusCode).json(result)

})
})

// deposit api
server.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log('inside deposit Api');
    console.log(req.body);
    // asynchronous function
    dataService.deposit(req.body.acno,req.body.amount)
    .then((result)=>{
       res.status(result.statusCode).json(result)
    
    })
    })

    // fundtransfer api
server.post('/fundTransfer',jwtMiddleware,(req,res)=>{
    console.log('inside fundTransfer Api');
    console.log(req.body);
    // asynchronous function
    dataService.fundTransfer(req,req.body.toAcno,req.body.pswd,req.body.amount)
    .then((result)=>{
          res.status(result.statusCode).json(result)
    
    })
    })

    // getAllTransactions
    server.get('/all-transactions',jwtMiddleware,(req,res)=>{
      console.log('inside getAllTransactions api');
      dataService.getAllTransactions(req)
      .then((result)=>{
        res.status(result.statusCode).json(result)
      })
    })

    // delete-account api
    server.delete('/delete-account/:acno',jwtMiddleware,(req,res)=>{
        console.log('inside  delete-account Api');
        console.log(req.params.acno);
        // asynchronous function
        dataService.deleteMyAccount(req.params.acno)
        .then((result)=>{
           res.status(result.statusCode).json(result)
        
        })
        })