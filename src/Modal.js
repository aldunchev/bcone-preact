import { h, Component } from 'preact';
import { GLOBALS } from './Globals';
import { convertStatic } from 'preact-html-converter';
import countries from './utils/countries';

class Modal extends Component {

  render(props) {
    const item = props.item;
    const imgData = item.relationships.field_picture.data.meta;
    const imgSrc = imgData.derivatives.grid_item.url;
    const imgAlt = imgData.alt;
    const {field_name} = item.attributes;
    const biography = item.attributes.field_biography && convertStatic(item.attributes.field_biography.processed);
    const career = item.attributes.field_career_highlights && convertStatic(item.attributes.field_career_highlights.processed);
    const countryCode = item.attributes.field_country && item.attributes.field_country;

    return (
      <div class="modal">
        <div class="modal__inner">
          <div class="modal__content">
            <div class="modal__left">
              <img src={`${GLOBALS.domain}${imgSrc}`} alt={imgAlt}/>
            </div>
            <div class="modal__right">
              <h2>{ field_name }</h2>
              <div>{countries[countryCode]}</div>
              <div>
                <h4>Biography</h4>
                { biography }
              </div>
              <div>
                <h4>Career</h4>
                { career }
              </div>
            </div>
          </div>
        </div>
        <div class="modal__close" onClick={props.close}></div>
      </div>
    )
  }
}

export default Modal;
