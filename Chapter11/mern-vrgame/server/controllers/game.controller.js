import Game from '../models/game.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'


const create = (req, res, next) => {
  const game = new Game(req.body)
  game.maker= req.profile
  game.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(result)
  })
}

const list = (req, res) => {
  Game.find({}).populate('maker', '_id name').sort('-created').exec((err, games) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(games)

  })
}

const listByMaker = (req, res) => {
  Game.find({maker: req.profile._id}, (err, games) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(games)
  }).populate('maker', '_id name')
}

const gameByID = (req, res, next, id) => {
  Game.findById(id).populate('maker', '_id name').exec((err, game) => {
    if (err || !game)
      return res.status('400').json({
        error: "Game not found"
      })
    req.game = game
    next()
  })
}

const read = (req, res) => {
  return res.json(req.game)
}

const update = (req, res) => {
  let game = req.game
  game = _.extend(game, req.body)
  game.updated = Date.now()
  game.save((err) => {
    if (err) {
      return res.status(400).send({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(game)
  })
}

const remove = (req, res) => {
  let game = req.game
  game.remove((err, deletedGame) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(deletedGame)
  })
}

const isMaker = (req, res, next) => {
  let isMaker = req.game && req.auth && req.game.maker._id == req.auth._id
  if(!isMaker){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const playGame = (req, res) => {
  res.sendFile(process.cwd()+'/server/vr/index.html')
}

export default {
  create,
  list,
  listByMaker,
  gameByID,
  read,
  update,
  remove,
  isMaker,
  playGame
}
