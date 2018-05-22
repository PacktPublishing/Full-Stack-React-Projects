import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'
import {create} from './api-game.js'
import {Redirect} from 'react-router-dom'
import GameForm from './GameForm'

class NewGame extends Component {
  state = {
    redirect: false,
    error: ''
  }
  clickSubmit = game => event => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
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
    return (
      <GameForm onSubmit={this.clickSubmit} errorMsg={this.state.error}/>
    )
  }
}

export default NewGame
