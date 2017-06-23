import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {closeTab} from './actions/actions.js';
import {queuePopup} from './actions/actions.js';

class SureModal extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active: false };
                this.activateModal = this.activateModal.bind(this);
                this.closeModal = this.closeModal.bind(this);
                this.closeWithoutSaving = this.closeWithoutSaving.bind(this);
                this.activateSaveAndCloseButton = this.activateSaveAndCloseButton.bind(this);
        }

        componentDidMount()
        {
                this.activateSaveAndCloseButton();
        }

        componentDidUpdate()
        {
                this.activateSaveAndCloseButton();
        }

        activateSaveAndCloseButton()
        {
                var modalid = this.props.modalId;
                var triggersave = function()
                {
                        $('#tabcontent'+modalid[2]).find('.savebutton').first().trigger('click');
                        console.log(modalid);
                        console.log($('#tabcontent'+modalid[2]).find('.savebutton').first());
                }
                if(this.props.currentUser==null)
                {
                        $('#'+this.props.modalId.toString()+' .saveandclose').off()
                        .on('click', (e)=>{
                                this.closeModal();
                                this.props.queuePopup({header:"Unable to save",body:"Please log in to publish and save."});
                        })
                }
                else
                {
                        if(this.props.tabs[parseInt(this.props.modalId[2])].published)
                        {
                                $('#'+this.props.modalId.toString()+' .saveandclose').off()
                                .on('click', (e)=>{
                                        //save
                                        triggersave();
                                        this.closeModal();
                                        this.props.queuePopup({header:"Giblet closed.",body:"Your giblet was saved."});
                                })
                        }
                        else
                        {
                                $('#'+this.props.modalId.toString()+' .saveandclose').off()
                                .on('click', (e)=>{
                                        this.closeModal();
                                        this.props.queuePopup({header:"Unable to save",body:"Please publish your giblet first."});
                                })
                        }
                }
        }

        closeModal()
        {
                console.log("hello?");
                $('#'+this.props.modalId.toString()).modal('hide');
        }

        activateModal()
        {
                $('#'+this.props.modalId.toString()).modal('show');
        }

        closeWithoutSaving()
        {
                this.props.closeTab(this.props.modalId);
                this.closeModal();
                this.props.queuePopup({header:"Giblet closed",body:"Your giblet was not saved."})
        }

        render()
        {
                return (
                        <div>
                                <i className="close icon" onClick={this.activateModal}></i>
                                <div className="ui modal" id={this.props.modalId}>
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
                                                <div className="ui closewithoutsaving button" onClick={()=>{this.closeWithoutSaving()}}>Close without saving</div>
                                                <div className="ui saveandclose button">Save and Close</div>
                                        </div>
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = function (state)
{
        return{ tabs: state.tabs, currentUser: state.currentUser };
}

const mapDispatchToProps = function (dispatch)
{
        return bindActionCreators({ closeTab: closeTab, queuePopup: queuePopup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SureModal);
