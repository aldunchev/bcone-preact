import { h, Component } from 'preact';

class Tab extends Component {
  render({tab, handleTabClick}, state) {
    return (
      <div id={tab.id} onClick={handleTabClick}>
        <div class="tabsNavItem">{tab.attributes.name}</div>
      </div>
    )
  }
}

export default Tab;
