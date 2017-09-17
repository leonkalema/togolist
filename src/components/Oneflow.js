import React, { Component } from 'react';
import Modal from 'react-modal';
import SelectionPopover from 'react-selection-popover';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


export default class Oneflow extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
      text: "Uganda, formellt Republiken Uganda, är en inlandsstat i Östafrika. Landet gränsar till Kongo-Kinshasa i väster, Sydsudan i norr, Kenya i öster, Tanzania i söder och Rwanda i sydväst. Gränsen till Kenya och Tanzania går delvis genom Victoriasjön.",
      showPopover: false,
      modalIsOpen: false,
      edit:false
    }
  }

  //This function will get selected text and store it in state
  selectText (){
    this.setState({
      showPopover: true,
      selectedText: window.getSelection().toString()
    })
  }

  //This function will  deselect text
  deSelectText (){
    this.setState({
      showPopover: false
    })
  }

  //This function will open modal.
  openModal(type) {
    var obj = {};
    obj.modalIsOpen=true;
    if(type=="edit"){
      obj.edit=true;
    }
    this.setState(obj);
  }

  //This function will close modal.
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  //This function will replace the selected text with user input.
  editText(e){
    var text = this.state.text;
    this.setState({text:this.state.text.replace(this.state.selectedText,e.target.value)})
  }

  //This function will add comment with selected text
  addComment(e){
    var text = this.state.text;
    var comment = `<u style='color:red' title='${e.target.value}'>${this.state.selectedText}</u>`;
    this.setState({text:this.state.text.replace(this.state.selectedText,comment)})
  }
  render() {
    return (
       <div style={{
        position: 'relative'
      }}>
        <div>
          <h3 >
            Select text to edit or comment. For comments hover over to see comments.
          </h3>

          <p>
            <div data-selectable>
              <p dangerouslySetInnerHTML={{ __html:this.state.text}}/>
            </div>
          </p>
          <SelectionPopover
            showPopover={this.state.showPopover}
            onSelect={ e => this.selectText(e)}
            onDeselect={ e => this.deSelectText(e)}
          >
            <button onClick={ e => this.openModal('edit')}>Edit</button>
            <button onClick={ e => this.openModal('comment')}>comment</button>
          </SelectionPopover>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          {
          (this.state.edit)&&(
            <div>
              <h2>Update Contract section</h2>
              <form>
                <textarea  style={{ height: 300, width:300 }} onBlur={e =>this.editText(e)} placeholder="Insert Text to Replace" defaultValue = {this.state.selectedText} />
              </form>
              <button onClick={ e => this.closeModal(e)}>Replace</button>
              <button onClick={ e => this.closeModal(e)}>close</button>
            </div>
          )
         }
         {
          (!this.state.edit)&&(
            <div>
              <h2>Add Comment for this text : {this.state.selectedText}</h2>
              <form>
                <textarea style={{ height: 300, width:300 }} onBlur={e =>this.addComment(e)} placeholder="Insert Text for Comment "/>
              </form>
              <button onClick={ e => this.closeModal(e)}>Add Comment</button>
              <button onClick={ e => this.closeModal(e)}>Close</button>
            </div>
          )
         }
        </Modal>
      </div>
    )
  }
}
