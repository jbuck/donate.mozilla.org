import React from 'react';

module.exports = React.createClass({
  mixins: [require('react-intl').IntlMixin],
  render: function() {
    var appURL = process.env.APPLICATION_URI;
    var twitterShareURL = 'http://twitter.com/share?url=' + appURL +'/' + this.props.language + '/&text=' + this.getIntlMessage('i_donated_to_mozilla');
    var facebookShareURL = 'http://www.facebook.com/sharer/sharer.php?u=' + appURL + '/' + this.props.language + '/';
    return (
      <div className="share-page">
        <div className="container">
          <h2>{this.getIntlMessage('share')}</h2>
          <div className="row">
            <div className="half" id="facebook">
              <a href={facebookShareURL} target="_blank">
                <i className="fa fa-facebook fa-5x"></i>

                <p>facebook</p>
              </a>
            </div>
            <div className="half" id="twitter">
              <a href={twitterShareURL} target="_blank">
                <i className="fa fa-twitter fa-5x"></i>

                <p>twitter</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
