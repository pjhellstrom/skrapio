import { combineReducers } from "redux";
import alert from "./alert";
import scrape from "./scrape";

export default combineReducers({
  alert,
  scrape
});
