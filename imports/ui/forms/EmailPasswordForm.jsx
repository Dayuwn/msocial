import React from 'react';

export default class EmailPasswordForm extends React.Component {
  render() {
      return (
        <form onSubmit={this.props.submitAction}>
          <div className="form-group">
            <label htmlFor='email'>Email:</label>
            <input type='email' placeholder='Email' id='email'
                   className='form-control' />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Password' id='password'
                   className='form-control' />
          </div>
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
};
