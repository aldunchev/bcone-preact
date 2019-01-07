import { h } from 'preact';
import { GLOBALS } from './Globals';

const TabContent = ({ tabContent, active }) => (
  <div class={active ? 'active' : 'tab'}>
    {
      tabContent.map(item => {
        let imgSrc = item.relationships.field_picture.data.meta.derivatives.grid_item.url;
        return (
          <div class="tabItem">
            <img src={`${GLOBALS.domain}${imgSrc}`} alt="Alt"/>
            <h2>{item.attributes.field_name}</h2>
          </div>
        )
      })
    }
  </div>
);

export default TabContent;
