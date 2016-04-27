var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants'),
    UserStore = new Store(Dispatcher),
    _currentUser = { username: null },
    _authErrors = [];

function setCurrentUser(user) {
  _currentUser = user;
}

function resetErrors(errs) {
  _authErrors = errs;
}

function logoutUser() {
  _currentUser = { username: null };
}

UserStore.allErrors = function() {
  return _authErrors.slice();
};

UserStore.getCurrentUser = function() {
  return Object.assign({}, _currentUser);
}

UserStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_ERRORS:
      resetErrors(payload.errors);
      UserStore.__emitChange();
      break;
    case UserConstants.RECEIVE_CURRENT_USER:
      setCurrentUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.LOGOUT_CURRENT_USER:
      logoutUser();
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
