
var router = require('express').Router()
var extend = require('xtend')
var bitcoinTransaction = require('bitcoin-transaction')

var user = require('./models/user')
var schema = require('./schema')

var from = 'n3d83oMpyMapBu3FWUbq5AbcQV9jj7Lrit'
var privKeyWIF = 'cPSWKQ2W5aWJ3y5MvCi1SFKQKdrPcfRDfgWV1obKNxZM2MbcLVyk'
var satoshi = 0.00000001

function routeHandler (req, res, callback) {
  var postdata = extend(req.params, req.query, req.body)
  if (Object.keys(postdata).length < 1) {
    res.json({
      'error': 'No query found',
      'origin': 'index'
    })
  } else {
    try {
      callback(postdata, res)
    } catch (err) {
      res.json({
        'error': err.message,
        'origin': 'index'
      })
    }
  }
}

// connect
router.post('/connect/:address', function (req, res, next) {
  var input = extend(req.params, req.query, req.body)
  if (input.address) {
    bitcoinTransaction.getBalance(from, { network: 'testnet' }).then(function () {
      return bitcoinTransaction.sendTransaction({
        from: from,
        to: input.address,
        privKeyWIF: privKeyWIF,
        btc: satoshi,
        network: 'testnet'
      })
    }).then(function (transaction) {
      console.log(transaction)
    })
  } else {
    res.json({
      'error': 'RequiredParamNotFound',
      'origin': 'connect.post'
    })
  }
})

// user
router.use('/user/:username?', function (req, res, next) {
  routeHandler(req, res, user[req.method.toLowerCase()])
})

module.exports = router
