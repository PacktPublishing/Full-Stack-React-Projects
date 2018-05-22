import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import auth from './../auth/auth-helper'
import DeleteGame from './DeleteGame'

const styles = theme => ({
  card: {
    width: 600,
    margin: theme.spacing.unit * 2,
    display: 'inline-table',
    textAlign: 'center'
  },
  heading: {
    position: 'relative'
  },
  title: {
    position: 'absolute',
    padding: '16px 40px 16px 40px',
    fontSize: '1.15em',
    backgroundColor: '#6f6f6fcf',
    color: '#cddd39',
    left: '-5px',
    top: '14px'
  },
  maker: {
    position: 'absolute',
    top: '-44px',
    right: '0px',
    fontSize: '0.95em',
    fontWeight: '300',
    backgroundColor: '#cddd3985',
    color: 'white',
    padding: '12px 16px'
  },
  media: {
    height: 250
  },
  action: {
    padding: 0
  },
  button: {
    width: '100%',
    height: '42px',
    fontSize: '1em',
    letterSpacing: '2px'
  },
  editbutton: {
    width: '50%',
    margin: 'auto'
  },
  clue: {
    padding: '7px',
    backgroundColor: '#e8eae3'
  }
})
class GameDetail extends Component {
  render() {
    const {classes} = this.props
    return (<Card className={classes.card}>
      <div className={classes.heading}>
        <Typography type="headline" component="h2" className={classes.title}>
          {this.props.game.name}
        </Typography>
      </div>
      <CardMedia className={classes.media} image={this.props.game.world} title={this.props.game.name}/>
      <div className={classes.heading}>
        <Typography type="subheading" component="h4" className={classes.maker}>
          <em>by</em>
          {this.props.game.maker.name}
        </Typography>
      </div>
      <CardContent className={classes.clue}>
        <Typography type="body1" component="p">
          {this.props.game.clue}
        </Typography>
      </CardContent>
      <div className={classes.action}>
        <Link to={"/game/play?id=" + this.props.game._id} target='_self'>
          <Button variant="raised" color="secondary" className={classes.button}>
            Play Game
          </Button>
        </Link>
      </div>
      {
        auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.props.game.maker._id
        && (<div>
              <Link to={"/game/edit/" + this.props.game._id}>
                <Button variant="raised" color="primary" className={classes.editbutton}>
                  Edit
                </Button>
              </Link>
              <DeleteGame game={this.props.game} removeGame={this.props.updateGames}/>
            </div>)
      }
    </Card>)
  }
}
GameDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  updateGames: PropTypes.func.isRequired
}

export default withStyles(styles)(GameDetail)
