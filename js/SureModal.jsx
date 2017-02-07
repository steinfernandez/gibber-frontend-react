import React from 'react';

class SureModal extends React.Component {
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
                        <i className="close icon" onClick={this.activateModal}></i>
                        <div className="ui modal">
                                <i className="close icon"></i>
                                <div className="header">
                                        Save before closing?
                                </div>
                                <div className="image content">
                                        <div className="image">
                                                <i className="archive icon"></i>
                                        </div>
                                        <div className="description">
                                                Would you like to save before closing?
                                        </div>
                                </div>
                                <div className="actions">
                                        <div className="ui button" onClick={this.closeModal}>Close without saving</div>
                                        <div className="ui button">Save</div>
                                </div>
                        </div>
                </div>
        );
    }
}

export default SureModal;
