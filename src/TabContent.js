import { h, Component } from 'preact';
import { GLOBALS } from './Globals';
import countries from './utils/countries';
import Modal from './Modal';

class TabContent extends Component {
  state = {
    modalOpen: false,
    item: {}
  };

  handleModalToggle = (item) => {
    const active = this.state.modalOpen;
    this.setState({modalOpen: !active, item: item});
    document.body.style.overflow = !active ? 'hidden' : '';
  }

  render ({ tabContent }) {
    return (
      <div class="tabs__content">
        {
          tabContent.map(item => {
            const imgData = item.relationships.field_picture.data.meta;
            const imgSrc = imgData.derivatives.grid_item.url;
            const imgAlt = imgData.alt;
            const countryCode = item.attributes.field_country && item.attributes.field_country;

            return (
              <div class="tabs__item" onClick={() => this.handleModalToggle(item)}>
                <img src={`${GLOBALS.domain}${imgSrc}`} alt={imgAlt}/>
                <h2>{item.attributes.field_name}</h2>
                <div>{countries[countryCode]}</div>
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
