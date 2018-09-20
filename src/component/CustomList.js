import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {desc , stableSort ,getSorting} from '../utils/Helpers'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead , {EnhancedTableToolbar} from './CustomListHead';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Link} from 'react-router-dom';
import PlaceIcon from '@material-ui/icons/Place';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  filters:{
    marginBottom: '20px',
  },
  started:{
    color:'blue',
    fontWeight: 800
  },
  pending:{
    color: '#ff8f00',
    fontWeight: 800
  },
  completed:{
    color:'green',
    fontWeight: 800
  },
  failed:{
    color:'#b71c1c',
    fontWeight: 800
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      order: 'asc',
      orderBy: 'startedAt',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      queryToFilter : '',
      filteredColumn : 'courier', 
    };
  }


  componentDidMount(){
    console.log('backData', this.props.data)
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  render() {
    const { data, classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page ,filteredColumn,queryToFilter} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    let counter = 0;
    const dataByID = Array.isArray(data) && data.map(value => {
      counter+=1;
     return Object.assign({id :counter} , value);
    });


    return (
     
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>     
        
          <div className={classes.filters}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">Filter By</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={filteredColumn}
                onChange={(event , index ,value)=> this.setState({filteredColumn:event.target.value})}
                inputProps={{
                  name: 'filter',
                  id: 'filter-by',
                }}
              >
                <MenuItem value={'driverName'}>Driver Name</MenuItem>
                <MenuItem value={'status'}>Status</MenuItem>
                <MenuItem value={'courier'}>Courier</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="filter-query"
              label="filter query"
              className={classes.textField}
              value={queryToFilter}
              onChange={e => this.setState({queryToFilter : e.target.value})}
              margin="normal"
            />
          </div>

          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={dataByID.length}
            />
            <TableBody>
              {stableSort(dataByID,filteredColumn,queryToFilter, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.courier}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.driverName}</TableCell>
                      <TableCell component="th" scope="row" padding="none"
                       className={classNames({
                            [classes.started]: n.status === 'started',
                            [classes.pending]: n.status === 'pending',
                            [classes.completed]: n.status === 'completed',
                            [classes.failed] : n.status === 'failed'
                        })}
                      >{n.status}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.description}</TableCell>
                      <TableCell numeric>{n.startedAt}</TableCell>
                      <TableCell numeric>{n.finishedAt}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.driverComment}</TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Link to={{
                          pathname:'/maps',
                          state:{
                            from : n.fromLocation,
                            to:n.toLocation
                          }
                        }}>
                          <PlaceIcon/>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={dataByID.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>

    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object
};

export default withStyles(styles)(EnhancedTable);
