import React from 'react';
import EmailPasswordForm from '../forms/EmailPasswordForm.jsx';

export default class LoginPage extends React.Component {
    loginWithPassword(e) {
        e.preventDefault();
        const email = $('#email').val()
        const password = $('#password').val()
        Meteor.loginWithPassword(email, password, (error) => {
            if(error) { console.log('Error : ' + error.reason) }
            else { FlowRouter.go('/') }
        })
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-3'>
                    <h1>Login</h1>
                    <EmailPasswordForm
                        submitBtnLabel="Login"
                        submitAction={this.loginWithPassword}
                    />
                </div>
            </div>
        )
    }
}
