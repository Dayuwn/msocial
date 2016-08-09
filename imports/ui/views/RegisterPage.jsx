import React from 'react';
import RegisterForm from '../forms/RegisterForm.jsx';

export default class RegisterPage extends React.Component {
    registerUser(e) {
        e.preventDefault();

        Accounts.createUser({
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
        <div>
            <h1 className='col-md-6 col-md-offset-3'>Register</h1>
            <RegisterForm submitAction={this.registerUser}/>
        </div>
    )
  }
}
