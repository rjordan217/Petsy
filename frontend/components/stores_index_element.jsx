var React = require('react'),
    FavoriteButton = require('./favorite_button'),
    CurrentUserStateMixin = require('../mixins/current_user_state'),
    HashHistory = require('react-router').hashHistory;

var StoresIndexElement = React.createClass({
  mixins: [CurrentUserStateMixin],

  getInitialState: function() {
    return {
      hovered: false
    };
  },

  _clickedForDetail: function (e) {
    // TODO: Have this return item details
    e.preventDefault();
    HashHistory.push('stores/' + this.props.store.id);
  },

  _setHovered: function() {
    this.setState({hovered: true});
  },

  _resetHovered: function() {
    this.setState({hovered: false});
  },

  render: function() {
    var store = this.props.store;
    return (
      <div className="store-index-el liftable"
        onClick={this._clickedForDetail}
        onMouseEnter={this._setHovered}
        onMouseLeave={this._resetHovered}>
        <img src={store.main_pic_url} />
        <h3>{store.store_name}</h3>
        {this.state.currentUser.username ? <FavoriteButton favorites={store.favorites}
          favoritable={{type: "Store", id: store.id}}
          storeName={store.store_name}
          showAll={this.state.hovered} /> : null}
      </div>
    );
  }

});
// {store.main_pic_url}
module.exports = StoresIndexElement;
