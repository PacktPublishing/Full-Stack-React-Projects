import React, {Component} from 'react'
import Card from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'

const styles = theme => ({
  card: {
    marginRight:'12px',
    marginLeft: '12px',
    padding: '10px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  numberField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 70
  }
})

class VRObjectForm extends Component {
  state = {
    objUrl: '',
    mtlUrl: '',
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    color:'white'
  }
  componentDidMount = () => {
    if(this.props.vrObject && Object.keys(this.props.vrObject).length != 0){
      const vrObject = this.props.vrObject
      this.setState({
        objUrl: vrObject.objUrl,
        mtlUrl: vrObject.mtlUrl,
        translateX: Number(vrObject.translateX),
        translateY: Number(vrObject.translateY),
        translateZ: Number(vrObject.translateZ),
        rotateX: Number(vrObject.rotateX),
        rotateY: Number(vrObject.rotateY),
        rotateZ: Number(vrObject.rotateZ),
        scale: Number(vrObject.scale),
        color:vrObject.color
      })
    }
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    this.props.handleUpdate(this.props.index, this.props.type, name, event.target.value)
  }
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <TextField
          id="obj"
          label=".obj url"
          value={this.state.objUrl}
          onChange={this.handleChange('objUrl')}
          className={classes.textField}
          margin="normal"
        /><br/>
        <TextField
          id="mtl"
          label=".mtl url"
          value={this.state.mtlUrl}
          onChange={this.handleChange('mtlUrl')}
          className={classes.textField}
          margin="normal"
        /><br/>
        <TextField
          value={this.state.translateX}
          label="TranslateX"
          onChange={this.handleChange('translateX')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={this.state.translateY}
          label="TranslateY"
          onChange={this.handleChange( 'translateY')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={this.state.translateZ}
          label="TranslateZ"
          onChange={this.handleChange('translateZ')}
          type="number"
          className={classes.numberField}
          margin="normal"
        /><br/>
        <TextField
          value={this.state.rotateX}
          label="RotateX"
          onChange={this.handleChange('rotateX')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={this.state.rotateY}
          label="RotateY"
          onChange={this.handleChange('rotateY')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={this.state.rotateZ}
          label="RotateZ"
          onChange={this.handleChange('rotateZ')}
          type="number"
          className={classes.numberField}
          margin="normal"
        /><br/>
        <TextField
          value={this.state.scale}
          label="Scale"
          onChange={this.handleChange('scale')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={this.state.color}
          label="Color"
          onChange={this.handleChange('color')}
          className={classes.numberField}
          margin="normal"
        />
        <Button onClick={this.props.removeObject(this.props.type, this.props.index)}>
          <Icon style={{marginRight: '5px'}}>cancel</Icon> Delete
        </Button><br/>
     </Card>)
  }
}

VRObjectForm.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  vrObject: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  removeObject: PropTypes.func.isRequired
}

export default withStyles(styles)(VRObjectForm)
