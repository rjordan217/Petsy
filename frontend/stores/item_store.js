var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ItemConstants = require('../constants/item_constants'),
    ItemStore = new Store(Dispatcher);

var _items = {};
// var _authErrors = [];

// function resetErrors(errs) {
//   _authErrors = errs;
// }

function addItem(item) {
  _items[item.id] = item
}

function resetItems(items) {
  _items = {};
  items.forEach(addItem);
}

function removeItem(item) {
  _items = _.omit(_items, item.id);
}

// ItemStore.allErrors = function() {
//   return _authErrors.slice();
// };

ItemStore.all = function() {
  var itemArray = [];
  Object.keys(_items).forEach(function(itemKey) {
    itemArray.push(_items[itemKey]);
  });
  return itemArray;
};

ItemStore.getItemById = function(id) {
  return _items[id];
};

ItemStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    // case ItemConstants.RECEIVE_ERRORS:
    //   resetErrors(payload.errors);
    //   ItemStore.__emitChange();
    //   break;
    case ItemConstants.RECEIVE_ITEMS:
      resetItems(payload.items);
      ItemStore.__emitChange();
      break;
    case ItemConstants.ITEM_DETAILS_FETCHED:
      addItem(payload.item);
      ItemStore.__emitChange();
      break;
    case ItemConstants.ITEM_DESTROYED:
      removeItem(payload.item);
      ItemStore.__emitChange();
      break;
  }
};

module.exports = ItemStore;
