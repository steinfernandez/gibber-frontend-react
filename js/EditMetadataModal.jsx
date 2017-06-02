import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {publishGiblet} from './actions/actions.js';

class EditMetadataModal extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active: false }
                this.activateModal = this.activateModal.bind(this);
                this.closeModal = this.closeModal.bind(this);
        }

        closeModal()
        {
                console.log("closing modal with id "+this.props.modalId+" and code: "+this.props.code);
                $('#'+this.props.modalId.toString()).modal('hide');
        }

        activateModal()
        {
                console.log("opening modal with id "+this.props.modalId+" and code: "+this.props.code);
                $('#'+this.props.modalId.toString()).modal('show');
        }

        componentDidMount()
        {
                //validation rules
                $('.ui.form')
                .form({
                  fields: {
                    filename: {
                      identifier  : 'filename',
                      rules: [
                        {
                          type   : 'empty',
                          prompt : 'Please enter the name of your file'
                        }
                      ]
                    }
                  }
                });
                $('.edittags').dropdown({
                        allowAdditions: true
                });
                $('form input').on('keypress', function(e) {
                    return e.which !== 13;
                });
                $('.edittags').dropdown('refresh');
                //populate with pre-existing tags from redux store
                setTimeout(() => {$('#'+this.props.modalId.toString()+' form .edittags').dropdown('set selected',this.props.tabs[this.props.modalId.toString()[2]].tags);},1000);
                //set existing isPublic state
                if(this.props.tabs[this.props.modalId.toString()[2]].isPublic)
                {
                        $('#'+this.props.modalId.toString()+' form .editispublic').checkbox('check');
                }
                else
                {
                        $('#'+this.props.modalId.toString()+' form .editispublic').checkbox('uncheck');
                }
                //submit button api
                function bs(settings)
                {
                      settings.data = Object.assign({},settings.data,{code:this.props.code});
                      console.log(this);
                      return settings;
                }
                bs = bs.bind(this);
                $('#'+this.props.modalId.toString()+' form')
                  .api({
                    url: window.location.origin+"/filesetmetadata",
                    method: 'POST',
                    serializeForm: true,
                    beforeSend: (settings) =>
                    {
                      //TODO: language
                      //settings.data.tags = settings.data.tags.split(",");
                      //console.log(settings.data);
                      var tagArray = $('#'+this.props.modalId.toString()+' form .edittags option:selected');
                      var tagValueArray = [];
                      for(var i=0;i<tagArray.length;i++)
                      {
                        tagValueArray.push(tagArray[i].value);
                      }
                      settings.data = Object.assign({},settings.data,{newtags: tagValueArray, newlanguage: "",  });
                      console.log(settings.data);
                      return settings;
                    },
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("server responded with successful publish");
                        return response.success;
                      }
                      return false;
                    },
                    onSuccess: (response) => {  /*this.props.publishGiblet(parseInt(this.props.modalId[2]),response.filename);*/ this.closeModal(); }
                     });
        }

        render()
        {
                let store = this.props.store;

                var formdivStyle = {
                                float: "right",
                                padding: 10,
                                margin: 50,
                        };

                return (
                        <div>
                                <div className="ui animated fade editmetadata button" onClick={this.activateModal} tabIndex="0">
                                        <div className="hidden content">Metadata</div>
                                        <div className="visible content"><i className="unordered list icon"/></div>
                                </div>
                                <div className="ui modal" id={this.props.modalId}>
                                        <i className="close icon"></i>
                                        <div className="header">
                                                Edit File Metadata
                                        </div>
                                        <div className="image content">
                                                <div className="image">
                                                        <i className="save icon"/>
                                                </div>
                                                <div className="formdiv" style={formdivStyle}>
                                                        <form className="ui form">
                                                        <div className="ui stacked segment">
                                                                <div className="field">
                                                                        <label>Rename Giblet</label>
                                                                        <div className="ui left icon input">
                                                                                <i className="file text icon"></i>
                                                                                <input type="text" name="filename" defaultValue={this.props.tabs[this.props.modalId.toString()[2]]._id.toString()}/>
                                                                        </div>
                                                                </div>
                                                                <div className="field">
                                                                        <label>Edit Giblet Notes</label>
                                                                        <div className="ui left icon input">
                                                                                <i className="file text icon"></i>
                                                                                <input type="text" name="newnotes" defaultValue={this.props.tabs[this.props.modalId.toString()[2]].notes.toString()}/>
                                                                        </div>
                                                                </div>
                                                                <div className="field">
                                                                                <label>Giblet Tags</label>
                                                                                <select multiple className="edittags large ui fluid multiple search selection dropdown" name="newtags">
                                                                                </select>
                                                                </div>
                                                                <div className="field">
                                                                        <div className="editispublic ui checkbox">
                                                                                <input type="checkbox" name="ispublic"/>
                                                                                <label>Is this giblet public?</label>
                                                                        </div>
                                                                </div>
                                                                <div className="ui fluid large teal submit button">Save Changes</div>
                                                        </div>
                                                        <div className="ui error message"></div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = function(state)
{
        return{ tabs: state.tabs };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({publishGiblet: publishGiblet}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMetadataModal);
