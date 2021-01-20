const server = require('./api/server.js')
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');



server.listen(port, () => {
	console.log(`Server started on ${port}`);
});
