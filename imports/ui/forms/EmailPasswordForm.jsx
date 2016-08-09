import React from 'react';

export default class EmailPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordConfirm: '',
            password: '',
            passwordConfirmInvalid: false,
        };
    }

    showConfirmationError() {
        return (
            <div className="alert alert-danger">
                <strong>Error ! </strong> Passwords don't match.
            </div>
        );
    }

    showPasswordConfirmation() {
        return (
            <div className="form-group">
                <label htmlFor='password-confirmation'>
                    Password Confirmation
                </label>
                <input type='password' placeholder='Password Confirmation'
                       id='password-confirmation' className='form-control'
                       value={this.state.passwordConfirm}
                       onChange={this.confirmPasswordChange.bind(this)}
                 />
            </div>
        );
    }

    comparePasswords(password, passwordConfirm) {
        if(password !== passwordConfirm) {
            this.setState({passwordConfirmInvalid: true});
        }
        else {
            this.setState({passwordConfirmInvalid: false});
        }
    }

    confirmPasswordChange(e) {
        let value = e.target.value;
        this.setState({passwordConfirm: value});
        this.comparePasswords(this.state.password, value);
    }

    passwordChange(e) {
        let value = e.target.value;
        this.setState({password: value});
        this.comparePasswords(value, this.state.passwordConfirm);
    }

    render() {
      return (
        <form onSubmit={this.props.submitAction}>

          {this.state.passwordConfirmInvalid ?
              this.showConfirmationError() : null}

          <div className="form-group">
            <label htmlFor='email'>Email:</label>
            <input type='email' placeholder='Email' id='email'
                   className='form-control' />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Password' id='password'
                   className='form-control' value={this.state.password}
                   onChange={this.passwordChange.bind(this)} />
          </div>
          {this.props.addPasswordConfirmation? this.showPasswordConfirmation() : null}
          <div className="form-actions">
            <button type='submit' className='btn btn-primary centered'>
              {this.props.submitBtnLabel}
            </button>
          </div>
        </form>
      )
  }
}

EmailPasswordForm.propTypes = {
  submitAction: React.PropTypes.func.isRequired,
};

EmailPasswordForm.defaultProps = {
  submitBtnLabel: "Submit",
  addPasswordConfirmation: false,
};
