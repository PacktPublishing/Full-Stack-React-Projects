import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Link} from 'react-router-dom'
import Divider from 'material-ui/Divider'
import VRObjectForm from './VRObjectForm'
import AddBoxIcon from 'material-ui-icons/AddBox'
import {read} from './api-game.js'

const styles = theme => ({
  card: {
    maxWidth: 1000,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle,
    fontSize: '1.1em'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  spacingTop: {
    marginTop: '10px'
  },
  heading: {
    width: '130px',
    padding:'10px'
  },
  objectDetails: {
    overflow: 'scroll'
  },
  imgPreview: {
    width:"300px",
    display:'block',
    margin:'auto'
  }
})

class GameForm extends Component {
  state = {
    game: {name: '', clue:'', world:'', answerObjects:[], wrongObjects:[]},
    readError: ''
  }
  componentDidMount = () => {
    if(this.props.gameId){
      read({gameId: this.props.gameId}).then((data) => {
        if (data.error) {
          this.setState({readError: data.error})
        } else {
          this.setState({game: data})
        }
      })
    }
  }
  handleChange = name => event => {
    const newGame = this.state.game
    newGame[name] = event.target.value
    this.setState({game: newGame})
  }
  addObject = name => event => {
    const newGame = this.state.game
    newGame[name].push({})
    this.setState({game: newGame})
  }
  handleObjectChange = (index, type, name, val) => {
    var newGame = this.state.game
    newGame[type][index][name] = val
    this.setState({game: newGame})
  }

  removeObject = (type, index) => event => {
    const newGame = this.state.game
    newGame[type].splice(index, 1)
    this.setState({game: newGame})
  }

  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            {this.props.gameId? 'Edit': 'New'} Game
          </Typography>
          <img src={this.state.game.world} className={classes.imgPreview}/>
          <TextField id="world" label="Game World Equirectangular Image (URL)" className={classes.textField} value={this.state.game.world} onChange={this.handleChange('world')} margin="normal"/><br/>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.game.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="multiline-flexible" label="Clue Text" multiline rows="2" value={this.state.game.clue} onChange={this.handleChange('clue')} className={classes.textField} margin="normal"/><br/>
          <Divider className={classes.spacingTop}/>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>VR Objects to collect</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.objectDetails}>
              {
                this.state.game.answerObjects.map((item, i) => {
                  return <div key={i}>
                    <VRObjectForm handleUpdate={this.handleObjectChange} index={i} type={'answerObjects'} vrObject={item} removeObject={this.removeObject}/>
                  </div>
                })
              }
              <Button color="primary" variant="raised" onClick={this.addObject('answerObjects')}><AddBoxIcon color="secondary" style={{marginRight: '8px'}}/> Add Object</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Other VR objects</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {
                this.state.game.wrongObjects.map((item, i) => {
                  return <div key={i}>
                    <VRObjectForm handleUpdate={this.handleObjectChange} index={i} type={'wrongObjects'} vrObject={item} removeObject={this.removeObject}/>
                  </div>
                })
              }
              <Button color="primary" variant="raised" onClick={this.addObject('wrongObjects')}><AddBoxIcon color="secondary" style={{marginRight: '8px'}}/> Add Object</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {
            (this.props.errorMsg || this.state.readError)
            && (<Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error</Icon>
                  {this.props.errorMsg || this.state.readError }
               </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.props.onSubmit(this.state.game)} className={classes.submit}>Submit</Button>
          <Link to='/' className={classes.submit}>
            <Button variant="raised">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
}

GameForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  gameId: PropTypes.string
}

export default withStyles(styles)(GameForm)
