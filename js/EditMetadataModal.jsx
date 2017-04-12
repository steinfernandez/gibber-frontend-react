import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {publishGiblet} from './actions/actions.js';

class EditMetadataModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.activateModal = this.activateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        console.log("closing modal with id "+this.props.modalId+" and code: "+this.props.code);
        $('#'+this.props.modalId.toString()).modal('hide');
    }

    activateModal() {
        console.log("opening modal with id "+this.props.modalId+" and code: "+this.props.code);
        $('#'+this.props.modalId.toString()).modal('show');
    }

    componentDidMount() {
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
        $('.tagthing').dropdown({
                allowAdditions: true
        });
        $('form input').on('keypress', function(e) {
            return e.which !== 13;
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
              //console.log(settings.data);
              var tagArray = $(".tagthing option:selected");
              var tagValueArray = [];
              for(var i=0;i<tagArray.length;i++)
              {
                tagValueArray.push(tagArray[i].value);
              }
              console.log(tagValueArray);
              /*settings.data = Object.assign({},settings.data,{code:this.props.code});*/
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

    validationPassed() { console.log("publish validation passed!"); }

    render() {

        let store = this.props.store;

        var formdivStyle = {
                        float: "right",
                        padding: 10,
                        margin: 50,
                };

        return (
                <div>
                        <div className="ui vertical animated editmetadata button" onClick={this.activateModal} tabIndex="0">
                                <div className="hidden content">Publish</div>
                                <div className="visible content"><i className="unordered list icon"/></div>
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
                                                                <select multiple className="tagthing large ui fluid multiple search dropdown" name="tags">
                                                                </select>
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

const mapStateToProps = function (state) {
        return{ tabs: state.tabs };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({publishGiblet: publishGiblet}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMetadataModal);
