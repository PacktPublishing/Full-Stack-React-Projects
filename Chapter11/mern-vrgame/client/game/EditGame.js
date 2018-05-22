import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'
import {update} from './api-game.js'
import {Redirect} from 'react-router-dom'
import GameForm from './GameForm'

class EditGame extends Component {
  constructor({match}) {
    super()
    this.state = {
      redirect: false,
      error: '',
    }
      this.match = match
  }

  clickSubmit = game => event => {
    const jwt = auth.isAuthenticated()
    update({
      gameId: this.match.params.gameId
    }, {
      t: jwt.token
    }, game).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', redirect: true})
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/user/'+auth.isAuthenticated().user._id}/>)
    }
    const {classes} = this.props
    return (
      <GameForm gameId={this.match.params.gameId} onSubmit={this.clickSubmit} errorMsg={this.state.error}/>
    )
  }
}

export default EditGame
