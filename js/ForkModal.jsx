import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {publishGiblet} from './actions/actions.js';
import {updateGibletFileData} from './actions/actions.js';

class ForkModal extends React.Component
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
                console.log("closing modal with id "+this.props.modalId);
                $('#'+this.props.modalId.toString()).modal('hide');
        }

        activateModal()
        {
                console.log("opening modal with id "+this.props.modalId);
                $('#'+this.props.modalId.toString()).modal('show');
        }

        componentDidMount()
        {
                //validation rules
                $('.forkform')
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
                //submit button api
                function bs(settings)
                {
                      settings.data = Object.assign({},settings.data,{code:this.props.code});
                      console.log(this);
                      return settings;
                }
                bs = bs.bind(this);
                var nameref="";
                $('#'+this.props.modalId.toString()+' form')
                  .api({
                    url: window.location.origin+"/filefork",
                    method: 'POST',
                    serializeForm: true,
                    beforeSend: (settings) =>
                    {
                      nameref = settings.data.newname;
                      settings.data.filename = this.props.tabs[this.props.modalId.toString()[2]]._id.toString();
                      console.log(settings.data);
                      return settings;
                    },
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("server responded with successful fork");
                        return response.success;
                      }
                      return false;
                    },
                    onSuccess: (response) =>
                    {
                        console.log("file forked");
                        $('#browsebutton').api('query');
                        console.log(response);
                        console.log(this.props.modalId[2]);
                        this.props.updateGibletFileData(this.props.modalId[2],response.response);
                        setTimeout(()=>{$('#'+nameref+'loadgiblet').api('query');},1000);
                        this.closeModal();
                    },
                    onFailure: (response) => {  console.log("file not forked due to error"); this.closeModal(); },
                     });
        }

        componentDidUpdate()
        {
        }

        render()
        {
                let store = this.props.store;
                let heartlist2 = null;
                if(this.props.tabs[this.props.modalId.toString()[2]].likedby)
                {
                        heartlist2 = this.props.tabs[this.props.modalId.toString()[2]].likedby.map((user,i)=>{return(<div className="item" key={i}><i className="heart icon"/>{user}</div>);});
                }
                var formdivStyle = {
                                float: "right",
                                padding: 10,
                                margin: 50,
                        };
                console.log(this.props.tabs);
                var dv = this.props.tabs[this.props.modalId.toString()[2]]._id.toString();
                dv = dv.slice(dv.lastIndexOf('/')+1);
                console.log(this.props.tabs[this.props.modalId.toString()[2]].author);
                console.log(this.props.currentUser);
                if(this.props.tabs[this.props.modalId.toString()[2]].author == this.props.currentUser)
                {
                        console.log("setting dv to blank");
                        dv=dv+"_copy";
                }
                return (
                        <div>
                          <button className="ui basic button mini" style={{height:'100%'}} onClick={this.activateModal} tabIndex="0">
                                  <i className="fork icon" /> Fork Modal
                                </button>
                                <div className="ui modal" id={this.props.modalId}>
                                        <i className="close icon"></i>
                                        <div className="header">
                                                Create Forked Giblet
                                        </div>
                                        <div className="image content">
                                                <div className="formdiv">
                                                        <form className="ui form forkform">
                                                        <div className="ui stacked segment">
                                                                <div className="field">
                                                                        <label>Rename Giblet</label>
                                                                        <div className="ui left icon input">
                                                                                <i className="file text icon"></i>
                                                                                <input type="text" name="newname" defaultValue={dv}/>
                                                                        </div>
                                                                </div>
                                                                <div className="ui fluid large teal submit button">Fork Giblet</div>
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
        return{ tabs: state.tabs, currentUser: state.currentUser };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({publishGiblet: publishGiblet, updateGibletFileData: updateGibletFileData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForkModal);
