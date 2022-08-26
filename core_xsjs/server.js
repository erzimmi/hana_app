/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port  = process.env.PORT || 3000;

// var hana = require("@sap/hana-client");
// var conn_parms_tcp = {
// serverNode : "express.hc0kwpdlqktedg2zxegj4proea.ax.internal.cloudapp.net:39015",
// encrypt : true,
// sslCryptoProvider : "openssl",
// sslTrustStore : "<path-to-home>.ssl/DigiCertGlobalRootCA.pem",
// uid : "<db-user>",
// pwd : "<db-password>"
// };

// var conn = hana.createConnection();
// conn.connect(conn_parms_tcp);

// var connOptions = {
// 	serverNode: "express.hc0kwpdlqktedg2zxegj4proea.ax.internal.cloudapp.net:39015",
// 	UID: "XSA_ADMIN",
//  PWD: ""
// };

// var hana=require("@sap/hana-client");
//    var client=hana.createConnection();
//    client.connect("serverNode=express.hc0kwpdlqktedg2zxegj4proea.ax.internal.cloudapp.net:30015;uid=system;pwd=Sm210000");
    
var options = {
	anonymous : true, // remove to authenticate calls
	auditLog : { logToConsole: true }, // change to auditlog service for productive scenarios
	redirectUrl : "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);
