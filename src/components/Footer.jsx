
import React, { PureComponent } from 'react';

class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: false

    };
  }

    setShowInfo = () => {
      this.setState({ showInfo: !this.state.showInfo });
    }

    render() {
      const { showInfo } = this.state;
      return (

        <div className="pfoot">
          <div>
            <div className="footerContent">
              <div>Harpal Gupta</div>

              <button type="button" className="ShowInfoButton" onClick={this.setShowInfo}>
                    ->
                {showInfo ? 'Hide ' : 'Show '}
                    Source Code Info
              </button>
              <div className={showInfo ? 'srcCode' : 'hidden'}>

                <a href="https://github.com/harpalgupta/fe-news" rel="noopener noreferrer" target="_blank">Frontend Source code</a>
                <a href="https://knews-prod.herokuapp.com/api" rel="noopener noreferrer" target="_blank">Backend Api</a>
                <a href="https://knews-prod.herokuapp.com/swagger" rel="noopener noreferrer" target="_blank">Backend Api Swagger Docs</a>
                <a href="https://github.com/harpalgupta/BE2-NC-Knews-harpal" rel="noopener noreferrer" target="_blank">Source code for Backend URL</a>
              </div>

            </div>
          </div>
        </div>
      );
    }
}

export default Footer;
