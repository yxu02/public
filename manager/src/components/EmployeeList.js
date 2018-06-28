import React, { Component } from "react";
import { ListView } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { employeesFetch } from "../actions/employeeActionCreator";
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    //async, take some time to fetch
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }
  //to render ListView from state, need to use both componentwillmount and componenntwillreceiveprops methods
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }
  render() {
    console.log(this.props.employees);
    return <ListView dataSource={this.dataSource} renderRow={this.renderRow} />;
  }

  renderRow=(employee)=>{
    return <ListItem employee={employee}/>
  };
}

const mapStateToProps = state => {
  //_.map take a collection as first arg, for the 2nd arg as a callback:
  //the first param is the collection values, the 2nd param is the key
  //then _.map adds the key (uid) to each obj
  const employees = _.map(state.employeeList, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};

export default connect(
  mapStateToProps,
  { employeesFetch }
)(EmployeeList);
