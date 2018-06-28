import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import LoginForm from "./components/LoginForm";
import EmployeeList from "./components/EmployeeList";
import NewEmployee from "./components/EmployeeCreation";
import EmployeeEdit from "./components/EmployeeEdit";

const RouterComponent = () => {
  return (
    //prevent navbar at root, use hideNavBar feature
    //prevent navigation btw scenes, nest scenes into separate scene parents.
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene initial key="login" component={LoginForm} title="Log in" />
        </Scene>
        <Scene key="main">
          <Scene
            rightTitle="Add"
            onRight={() => {
              Actions.newEmployee();
            }}
            key="employeeList"
            component={EmployeeList}
            title="Employees"
          />
          <Scene
            key="newEmployee"
            component={NewEmployee}
            title="New Employee"
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
