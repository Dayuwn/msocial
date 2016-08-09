import React from 'react';

export default class RegisterForm extends React.Component {
    render() {
        return (
            <div className='col-xs-12 col-sm-12'>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type='email' placeholder='Email' id='email'
                           className='form-control' name=''
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='Password'
                           id='password' className='form-control' name=''
                    />
                </div>
            </div>
        );
    }
}
