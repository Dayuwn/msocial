import React from 'react';
import EmailPasswordForm from './EmailPasswordForm.jsx';

export default class LoginForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.submitAction} className='form-horizontal'>
                <EmailPasswordForm />
                <div className='form-actions'>
                    <button type='submit' className='btn btn-primary'>
                        Login
                    </button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    submitAction: React.PropTypes.func.isRequired,
}
