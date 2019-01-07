import { h, Component } from 'preact';

class Tab extends Component {
  render({tab, handleTabClick}, state) {
    return (
      <div id={tab.id} onClick={handleTabClick}>
        <h2>{tab.attributes.name}</h2>
      </div>
    )
  }
}

export default Tab;
