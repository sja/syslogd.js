var config = {
	end:"\n",
	folder:__dirname
}

var dgram = require("dgram");
var fs = require('fs');

var server4 = dgram.createSocket("udp4");
var server6 = dgram.createSocket("udp6");

server4.on("message", function (msg, rinfo) {
	var now = new Date();
	var YY = now.getFullYear();
	var MM = (now.getMonth() + 1);
		if (MM < 10) { MM = '0' + MM; }
	var DD = now.getDate();
		if (DD < 10) { DD = '0' + DD; }
	
	// create folder
	if (!fs.existsSync(config.folder + "\\" + rinfo.address)) {
		fs.mkdirSync(config.folder + "\\" + rinfo.address);
	}
	
	// write message
	fs.appendFileSync(config.folder + "\\" + rinfo.address + "\\" + rinfo.address + "_" + YY + "_" + MM + "_" + DD + ".txt", msg + config.end);
});

server6.on("message", function (msg, rinfo) {
	var now = new Date();
	var YY = now.getFullYear();
	var MM = (now.getMonth() + 1);
		if (MM < 10) { MM = '0' + MM; }
	var DD = now.getDate();
		if (DD < 10) { DD = '0' + DD; }
	
	// replace : in IPv6 address
	var ip = rinfo.address.replace(/:/g, ".");
	
	// create folder
	if (!fs.existsSync(config.folder + "\\" + ip)) {
		fs.mkdirSync(config.folder + "\\" + ip);
	}
	
	// write message
	fs.appendFileSync(config.folder + "\\" + ip + "\\" + ip + "_" + YY + "_" + MM + "_" + DD + ".txt", msg + config.end);
});

server4.on("listening", function () {
  var address = server4.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server6.on("listening", function () {
  var address = server6.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server4.bind(514);
server6.bind(514);
