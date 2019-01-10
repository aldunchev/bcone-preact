import { h, Component } from 'preact';
import Tab from './Tab';
import TabContent from './TabContent';

class App extends Component {

  state = {
    sorted: [],
    included: [],
    index: 0,
    id : "",
    tabContent: []
  }

  async componentDidMount() {
    const res = await fetch('https://stage-web03019.microsites03.redbull.com/test/php/winners.php?f=winners');
    const json = await res.json();
    const items = (json && json.data) || [];
    const included = (json && json.included) || [];
    const firstCategoryId = included[0].id;

    const sorted = included.map((category) => {
      let id = category.id;
      return items.reduce((acc, item) => {
        let itemCategories = item.relationships.field_categories.data;
        acc[id] = acc[id] || [];
        itemCategories.forEach((category) => {
          return category.id === id && acc[id].push(item);
        });
        return acc;
      }, {});
    });

    const tabContent = sorted[0][firstCategoryId];
    this.setState({ sorted, included, tabContent, id: firstCategoryId });
  }

  handleTabClick = (index, id) => {
    const newTabContent = this.state.sorted[index][id];
    this.setState({index: index, id: id, tabContent: newTabContent})
  }

  render(props, { included=[], tabContent = [] }) {
    return (
      <div class="container">
        <div class="tabs__nav">
          { included.map( (tab, index) => (
            <Tab tab={tab} handleTabClick={() => this.handleTabClick(index, tab.id)} />
          )) }
        </div>
        {<TabContent tabContent={tabContent} />}
      </div>
    );
  }
}

export default App;
