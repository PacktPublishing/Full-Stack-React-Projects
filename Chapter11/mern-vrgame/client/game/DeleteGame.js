import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import auth from './../auth/auth-helper'
import {remove} from './api-game.js'

class DeleteGame extends Component {
  state = {
    open: false
  }
  clickButton = () => {
    this.setState({open: true})
  }
  deleteGame = () => {
    const jwt = auth.isAuthenticated()
    remove({
      gameId: this.props.game._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.removeGame(this.props.game)
        this.setState({open: false})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    return (<span>
      <Button variant="raised" onClick={this.clickButton} style={{width: '50%', margin: 'auto'}}>
        Delete
      </Button>
      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete "+this.props.game.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your game {this.props.game.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteGame} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}
DeleteGame.propTypes = {
  game: PropTypes.object.isRequired,
  removeGame: PropTypes.func.isRequired
}

export default DeleteGame
