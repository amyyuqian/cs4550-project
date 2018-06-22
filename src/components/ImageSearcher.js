import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ImageSearcher extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Enter the number of images you'd like to return (between 1-100):
        </Typography>
        <TextField
          id="number"
          label="Number"
          value={this.props.num}
          onChange={this.props.handleChange('num')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Button onClick={this.props.getImages} variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </Paper>
    )
  }
}

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

ImageSearcher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageSearcher);