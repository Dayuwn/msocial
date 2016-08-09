import React from 'react';

export default class AppHeader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              {this.props.navTitle}
            </a>
          </div>
          {this.props.userNav}
        </div>
      </nav>
    );
  }
}

AppHeader.defaultProps = {
  pageTitle: "Title",
  navTitle: "Nav Title",
  userNav: null,
};
