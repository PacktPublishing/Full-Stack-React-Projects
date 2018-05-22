import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import {list} from '../game/api-game.js'
import GameDetail from '../game/GameDetail'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '10px 24px',
  }
})

class Home extends Component {
  state={
    games: []
  }
  componentDidMount = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({games: data})
      }
    })
  }
  updateGames = (game) => {
    const updatedGames = this.state.games
    const index = updatedGames.indexOf(game)
    updatedGames.splice(index, 1)
    this.setState({games: updatedGames})
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        {this.state.games.map((game, i) => {
          return <GameDetail key={i} game={game} updateGames={this.updateGames}/>
        })}
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
