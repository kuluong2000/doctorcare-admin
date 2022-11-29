import { combineReducers } from 'redux';
import { sidebarToggle } from './reducer/toggleSidebar';
import { modal } from './reducer/modal';
import { userReducer } from './reducer/userReducer';
import { adminReducer } from './reducer/adminReducer';
import { accountReducer } from './reducer/accountReducer';
export default combineReducers({
  sidebarToggle: sidebarToggle,
  modal: modal,
  user: userReducer,
  admin: adminReducer,
  account: accountReducer,
});
