// per fare questa cosa potrei usare sia supercharge sia crypto
// poi potrei usare sia base64 sia hex, scelgo hex


const crypto = require('crypto')

const id = crypto.randomBytes(5).toString("hex")

console.log(id);
