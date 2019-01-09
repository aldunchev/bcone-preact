import { h, Component } from 'preact';
import { GLOBALS } from './Globals';

const Modal = (props) => {
  // const {field_name}
  return (
    <div class="modal">
      <img src="http://192.168.3.199/sites/default/files/styles/grid_item/public/2019-01/cico.jpg?itok=Dhj1MFA0" alt="asd"/>
      <h2>Name</h2>
      <p>Bio</p>
      <p>Career</p>
      <div onClick={props.close}>Close</div>
    </div>
  )
}

class TabContent extends Component {
  state = {
    modalOpen: false,
    item: {}
  };

  handleModalToggle = (item) => {
    const active = this.state.modalOpen;
    this.setState({modalOpen: !active, item: item});
  }

  render ({ tabContent, active }) {
    return (
      <div>
        {
          tabContent.map(item => {
            let imgSrc = item.relationships.field_picture.data.meta.derivatives.grid_item.url;
            return (
              <div class="tabItem" onClick={() => this.handleModalToggle(item)}>
                <img src={`${GLOBALS.domain}${imgSrc}`} alt="Alt"/>
                <h2>{item.attributes.field_name}</h2>
              </div>
            )
          })
        }
        {this.state.modalOpen && <Modal close={this.handleModalToggle} item={this.state.item}/>}
      </div>
    )
  }
}

export default TabContent;
