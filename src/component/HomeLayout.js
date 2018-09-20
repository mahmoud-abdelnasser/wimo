
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from './NavBar';
import {fetchTasks} from '../actions/tasks';
import CustomList from './CustomList';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    color: theme.palette.secondary.main
  },
  appFrame: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto'
  },
  contentWithSidebar: {
    display: 'flex',
    flexGrow: 1,
    color: '#fff',
    margin:'20px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('xs')]: {
      marginTop: '3em',
      paddingLeft: 5
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '3.5em'
    }
  },
  error:{
    color:'red',
    textAlign:'center',
    display: 'block',
    width: '100%'
  }
});

class HomeLayout extends Component {

  componentDidMount(){
    this.props.fetchTasks();
  }

  render() {
    const {
      classes,
      className,
      listData,
      loading,
      errorMessage,
      ...props
    } = this.props;
    return (
      <div className={classnames('layout', classes.root, className)}>
        <div className={classes.appFrame}>
        <NavBar/>
          <main className={classes.contentWithSidebar}>
            {loading ? <CircularProgress className={classes.progress} size={50} /> : null}
            {listData ? <CustomList data={listData}/> : <p className={classes.error}>{errorMessage}</p>}
          </main>
        </div>
      </div>
    );
  }
}

HomeLayout.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  listData: PropTypes.array,
  errorMessage:PropTypes.string
};

const mapStateToProps = state => {
  return {
    listData: state.tasks.payload,
    loading: state.tasks.loading,
    errorMessage: state.tasks.error
  };
};

const enhance = compose(
  connect(mapStateToProps , { fetchTasks }),
  withStyles(styles),
);

export default enhance(HomeLayout);

