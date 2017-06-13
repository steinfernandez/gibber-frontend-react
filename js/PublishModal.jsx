import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {publishGiblet} from './actions/actions.js';
import {updateGibletFileData} from './actions/actions.js';


class PublishModal extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active: false };
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
                $('form input').on('keypress', function(e) {
                    return e.which !== 13;
                });
                $('.publishtags').dropdown({
                        allowAdditions: true
                });
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
                    url: window.location.origin+"/publish",
                    method: 'POST',
                    serializeForm: true,
                    beforeSend: (settings) =>
                    {
                      //TODO: language
                      //settings.data.tags = settings.data.tags.split(",");
                      console.log(settings.data);
                      var tagArray = $('#'+this.props.modalId.toString()+' form .publishtags option:selected');
                      var tagValueArray = [];
                      for(var i=0;i<tagArray.length;i++)
                      {
                        tagValueArray.push(tagArray[i].value);
                      }
                      console.log(tagValueArray);
                      settings.data = Object.assign({},settings.data,{code:this.props.code, tags: tagValueArray});
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
                    onSuccess: (response) =>
                    {
                        console.log("onsuccess");
                        console.log(response.filedata);
                        this.props.updateGibletFileData(parseInt(this.props.modalId[2]),response.filedata);
                        this.props.publishGiblet(parseInt(this.props.modalId[2]),response.filename);
                        this.closeModal();
                    }
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
                                <div className="ui vertical animated publish button" onClick={this.activateModal} tabIndex="0">
                                        <div className="hidden content">Publish</div>
                                        <div className="visible content"><i className="save icon"/></div>
                                </div>
                                <div className="ui modal" id={this.props.modalId}>
                                        <i className="close icon"></i>
                                        <div className="header">
                                                Publish file
                                        </div>
                                        <div className="image content">
                                                <div className="image">
                                                        <i className="sign in icon"/>
                                                </div>
                                                <div className="formdiv" style={formdivStyle}>
                                                        <form className="ui form">
                                                        <div className="ui stacked segment">
                                                                <div className="field">
                                                                        <div className="ui left icon input">
                                                                                <i className="file text icon"></i>
                                                                                <input type="text" name="filename" placeholder="Giblet Filename"/>
                                                                        </div>
                                                                </div>
                                                                <div className="field">
                                                                        <div className="ui left icon input">
                                                                                <i className="comment outline icon"></i>
                                                                                <input type="text" name="notes" placeholder="Giblet Notes"/>
                                                                        </div>
                                                                </div>
                                                                <div className="field">
                                                                                <select multiple className="publishtags large ui fluid multiple search selection dropdown" name="tags">
                                                                                          <option value="">Giblet Tags</option>
                                                                                </select>
                                                                </div>
                                                                <div className="field">
                                                                        <div className="ui checkbox">
                                                                          <input type="checkbox" name="ispublic"/>
                                                                          <label>Make this giblet public.</label>
                                                                        </div>
                                                                </div>
                                                                <div className="ui fluid large teal submit button">Publish</div>
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
        return bindActionCreators({publishGiblet: publishGiblet, updateGibletFileData: updateGibletFileData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishModal);
