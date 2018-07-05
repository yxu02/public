import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  render() {
    return (
      <nav>
        <div style={{ marginLeft: "10px" }} className="nav-wrapper">
          {/*Link tag of router helps to nav within react contents, */}
          {/*whereas a tag nav out to other servers */}
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            <i className="left material-icons">contact_mail</i>
            e-Survey
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/*header section has space contraint so better to return
            a list if needs to render multiple items*/}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }

  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google" className="btn">
              Login
            </a>
          </li>
        );
      default:
        return [
          <li key="credits" style={{ margin: "0 20px", fontSize: 20 }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="payments">
            <Payments />
          </li>,
          <li key="logout">
            <a
              href="/api/logout"
              className="center btn"
              style={{ padding: "0 10px" }}
            >
              Logout
            </a>
          </li>
        ];
    }
  };
}

const mapStateToProps = ({ auth }) => {
  // console.log(state);
  return { auth };
};

export default connect(mapStateToProps)(Header);
