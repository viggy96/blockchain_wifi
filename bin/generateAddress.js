var bitcoin = require('bitcoinjs-lib')
function rng () { return Buffer.from('7ushLATfuRj6pJWKNAoS5ttuds04W0hk') }

var testnet = bitcoin.networks.testnet
var keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng })
var wif = keyPair.toWIF()
var address = keyPair.getAddress()

console.log(address + '\n')
console.log(wif)
