const  http = require('http');

 const Server = http.createServer((req , res)=>{
		console.log('Server is running');
});

Server.listen(5000)
