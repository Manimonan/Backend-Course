const http = require("http");

const Server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === "/home") {
    res.write("<h1>Welcome to Home Page</h1>");
    return res.end();
  } else if (req.url === "/men") {
    res.write("<h1> Welcome to men section</h1>");
    return res.end();
  } else if (req.url === "/women") {
    res.write("<h1> Welcome to women section</h1>");
    return res.end();
  } else if (req.url === "/kid") {
    res.write("<h1> Welcome to kid section</h1>");
    return res.end();
  }

  res.write(`
			<html lang="en">
<head>
	
	<title>Routing Page to page</title>
</head>
<body>
	<head>
		<nav>
			<ul>
				<li><a href="home">Home</a></li>
				<li><a href="men">Men</a></li>
				<li><a href="women">Women</a></li>
				<li><a href="kid">Kid</a></li>
				<li><a href="cart">Cart</a></li>
			</ul>
		</nav>
	</head>
</body>
`);
  res.end();
});

Server.listen(5001, () => {
  console.log("Server is running on address: http://localhost:5001");
});
