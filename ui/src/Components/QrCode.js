import React, { Component } from 'react';

class QrCode extends Component {
  render() {
    return (
      <div>
        <img src={"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(window.location.href)} />
        <br />
        <br />
        <h3>
          <a href={window.location.href}>{window.location.href}</a>
        </h3>
      </div>
    );
  }
}

export default QrCode;
