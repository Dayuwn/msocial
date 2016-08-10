import React from 'react';
import RegisterForm from '../forms/RegisterForm.jsx';

export default class RegisterPage extends React.Component {
    registerUser(e) {
        e.preventDefault();

        Accounts.createUser({
            profile: {
                name: $('#name').val(),
                lastName: $('#last-name').val(),
                country: $('#country option:selected').text(),
                birthday: $('#birthday').val(),
            },
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        },
        (error) => {
            if(error) {
                sAlert.error('Error !    ' + error.reason,
                {effect: 'stackslide', position: 'top-left', timeout: 10000});
             }
            else { FlowRouter.go('home') }
        });
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
