import React from 'react';

import {
  Icon,
  Modal,
  Header,
  Content,
  Actions,
  Button
} from 'semantic-react'

class SureModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
    
    onCloseModal() {
        this.setState({
            active: false
        });
    }
        
    render() {
        return (
            <div>
                <Icon name="delete" onClick={() => this.setState({ active: true })}/>
                <Modal basic onRequestClose={this.onCloseModal.bind(this)} active={this.state.active}>
                    <Header icon="save">Closing unsaved file</Header>
                    <Content>
                        <p>Warning: This file has not been saved. Would you like to close this file?</p>
                    </Content>
                    <Actions>
                        <Button color="green"
                                inverted 
                                onClick={this.onCloseModal.bind(this)}
                        >
                            <Icon name="checkmark"/>
                            Yes
                       </Button>
                        <Button color="red" 
                                basic 
                                inverted 
                                onClick={this.onCloseModal.bind(this)}
                        >
                            <Icon name="remove"/>
                            No
                        </Button>
                    </Actions>
                </Modal>
             </div>
        );
    }
}

export default SureModal;
