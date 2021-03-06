import React from 'react';
import IntlMixin from 'react-intl';
import Email from '../components/email-input.jsx';
import {PrivacyPolicyCheckbox} from '../components/checkbox.jsx';
import SubmitButton from '../components/submit-button.jsx';

var Form = React.createClass({
  mixins: [IntlMixin, require('../mixins/form.jsx')],
  render: function() {
    return (
      <div>
        <div className="container">
          <div className="wrap">
            <div className="row">
              <h2>{this.getIntlMessage('working_hard_to_protect_the_web')}</h2>
            </div>
          </div>
          <div className="wrap">
            <div className="row">
              <Email name="email-test"/>
              <PrivacyPolicyCheckbox name="privacyPolicy-test"/>
              <SubmitButton
                submitting={this.state.submitting}
                validate={["email-test", "privacyPolicy-test"]}
                onSubmit={this.signup}
                submit={["email-test"]}
              >
                {this.getIntlMessage('sign_up_now')}
              </SubmitButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Form;
