import React from 'react';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
    
    closeModal() {
        $('.ui.modal').hide();
    }

    activateModal() {
        $('.ui.modal').show();
    }
        
    render() {
        return (
                <div>
                        <i className="sign in icon" onClick={this.activateModal}></i>
                        <div className="ui modal">
                                <i className="close icon"></i>
                                <div className="header">
                                        Sign in to Gibber
                                </div>
                                <div className="image content">
                                        <div className="image">
                                                An image can appear on left or an icon
                                        </div>
                                        <div className="description">
                                                A description can appear on the right
                                        </div>
                                </div>
                                <div className="actions">
                                        <div className="ui cancel button" onClick={this.closeModal}>Cancel</div>
                                        <div className="ui approve button">Sign In</div>
                                </div>
                        </div>
                </div>
        );
    }
}

export default LoginModal;
