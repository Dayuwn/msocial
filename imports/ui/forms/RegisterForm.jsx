import React from 'react';
import EmailPasswordForm from './EmailPasswordForm.jsx';
import {populateCountries} from './countries.js';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            errorMessages: [],
        };
    }

    mapErrors() {
        return this.state.errorMessages.map((item, index) => {
            return <li key={index}>{item}</li>
        });
    }
    renderErrorMessages() {
        if(this.state.errorMessages.length > 0) {
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong><br />
                    <ul>
                        {this.mapErrors()}
                    </ul>
                </div>
            );
        }
        else {
            return '';
        }
    }

    render() {
        return (
        <div className='col-xs-6 col-sm-6 col-md-offset-3'>
            {this.renderErrorMessages()}
            <form onSubmit={this.validateForm.bind(this)}
                  className='form-horizontal'>
                <div className='form-group'>
                    <div className='col-xs-6'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' placeholder='Name'
                               className='form-control' id='name' required
                        />
                    </div>
                    <div className='col-xs-6'>
                        <label htmlFor='last-name'>Last Name:</label>
                        <input type='text' placeholder='Last Name'
                               className='form-control' id='last-name' required
                        />
                    </div>
                </div>

                <div className='form-group'>
                    <div className='col-xs-4'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' placeholder='Username'
                               className='form-control' id='username' required
                        />
                    </div>
                    <div className='col-xs-4'>
                        <label htmlFor='country'>Country:</label>
                        <select className='form-control' id='country'
                                name='country' required>
                        </select>
                    </div>
                    <div className='col-xs-4'>
                        <label htmlFor='birhtday'>Age:</label>
                        <input type='text' id='birthday' placeholder='yyyy/mm/dd'
                               className='form-control' required />
                    </div>
                </div>

                <EmailPasswordForm />

                <div className='form-group'>
                    <div className='col-xs-12'>
                        <label htmlFor='password-confirm'>
                            Password Confirmation:
                        </label>
                        <input type='password' id='password-confirm'
                               className='form-control'
                               placeholder='Password Confirmation' required
                        />
                    </div>
                </div>
                <div className='form-actions text-center'>
                    <button type='submit' className='btn btn-primary'>
                        Register
                    </button>
                </div>
            </form>
        </div>
        );
    }

    validateForm(e) {
        var errors = [];
        e.preventDefault();
        this.setState({errorMessages: errors});

        // Double checks if no field is empty
        let allFieldsFilled = true;
        let formControls = document.getElementsByClassName('form-control');
        for(let i = 0; i < formControls.length; i++) {
            if(formControls[i].value.length === 0){
                allFieldsFilled = false;
                errors.push('Some fields are empty.');
                this.setState({errorMessages: errors});
                break;
            }
        }

        // Checks if passwords match
        if($('#password').val() !== $('#password-confirm').val()) {
            errors.push("Passwords don't match.");
            this.setState({errorMessages: errors});
        }

        // Check if the date is in the good format
        let birthRegex = /^\d{4}\/\d{1,2}\/\d{1,2}$/
        if(!birthRegex.exec($('#birthday').val())) {
            errors.push('Birthdate is in a wrong format.');
            this.setState({errorMessages: errors});
        }

        // Password too short ?
        if($('#password').val().length < 8) {
            errors.push('Password is too short.');
            this.setState({errorMessages: errors});
        }

        // TODO : Check if the username is already used

        // Submit form.
        if(errors.length === 0) {
            this.props.submitAction(e);
            console.log('ok');
        }
    }

    componentDidMount() {
        populateCountries('country');
    }
}
RegisterForm.propTypes = {
    submitAction: React.PropTypes.func.isRequired,
}
