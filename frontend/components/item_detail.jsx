var React = require('react'),
    ItemStore = require('../stores/item_store'),
    ItemMiniOrder = require('./item_mini_order'),
    ItemActions = require('../actions/item_actions');


var ItemDetail = React.createClass({
  getInitialState: function() {
    return {
      item: ItemStore.getItemById(this.props.params.item_id)
    };
  },
  updateStore: function() {
    this.setState({item: ItemStore.getItemById(this.props.params.item_id)})
  },
  componentDidMount: function() {
    this.listenerToken = ItemStore.addListener(this.updateStore);
    ItemActions.fetchItemDetail(this.props.params.item_id);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  render: function() {
    var content;
    var item = this.state.item;
    if (item === undefined) {
      content = <div><p>Sorry, the item you requested does not exist.</p></div>;
    } else {
      var fecha = new Date(item.created_at);
      content = (
        <div className="item-detail">
          <img src={item.product_pic_url} />
          <div className="item-data">
            <h2>{item.title}</h2>
            <ItemMiniOrder itemData={{id: item.id, price: item.price}} />
          </div>
          <p>{item.description}</p>
          <p>Added {fecha.toLocaleDateString()}</p>
        </div>
      );
    }
    return content;
  }

});

module.exports = ItemDetail;
