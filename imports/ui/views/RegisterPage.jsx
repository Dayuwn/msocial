import React from 'react';
import EmailPasswordForm from '../forms/EmailPasswordForm.jsx';

export default class RegisterPage extends React.Component {
    registerUser(e) {
        e.preventDefault();

        Accounts.createUser({
            name: 'Lucas',
            last_name: 'Rollet',
            birthday: '10/07/1999',
            email: $('#email').val(),
            password: $('#password').val(),
        },
        (error) => {
            if(error) { console.log('Error: ' + error.reason) }
            else { FlowRouter.go('home') }
        })
    }

  render() {
    return (
        <div className='row'>
            <div className='col-md-6 col-md-offset-3'>
                <h1>Register</h1>
                <EmailPasswordForm
                    submitAction={this.registerUser.bind(this)}
                    submitBtnLabel='Register'
                />
            </div>
        </div>
    )
  }
}
