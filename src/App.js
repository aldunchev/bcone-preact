import { h, Component } from 'preact';
import Tab from './Tab';
import TabContent from './TabContent';

class App extends Component {

  state = {
    items: [],
    sorted: [],
    included: [],
    index: 0
  }

  async componentDidMount() {
    const res = await fetch('https://stage-web03019.microsites03.redbull.com/test/php/winners.php?f=winners');
    const json = await res.json();
    const items = (json && json.data) || [];
    const included = (json && json.included) || [];

    const sorted = included.map((category) => {
      let id = category.id;
      return items.reduce((acc, item) => {
        let itemCategories = item.relationships.field_categories.data;
        acc[id] = acc[id] || [];
        itemCategories.forEach((category) => {
          category.id === id && acc[id].push(item);
        });
        return acc;
      }, {});
    });
    
    this.setState({ items, sorted, included });
  }

  handleTabClick = index => this.setState({index: index})

  render(props, { included=[], sorted=[] }) {

    return (
      <div>
        <div class="tabsNav">
          { included.map( (tab, index) => (
            <Tab tab={tab} handleTabClick={() => this.handleTabClick(index)} />
          )) }
        </div>

        <div class="tabsContent">
          {
            included.map((element, index) => (
              <TabContent tabContent={sorted[index][element.id]} active={this.state.index === index}/>
            ))
          }
        </div>

      </div>
    );
  }
}

export default App;

const modal = ({props}) => {
  <div class="modal">
    <img src="http://192.168.3.199/sites/default/files/styles/grid_item/public/2019-01/cico.jpg?itok=Dhj1MFA0" alt="asd"/>
    <h2>Name</h2>
    <p>Bio</p>
    <p>Career</p>
  </div>
}
