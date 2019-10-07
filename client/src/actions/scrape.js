import axios from "axios";
import { setAlert } from "./alert";

import { SCRAPE_SITE, DELETE_SCRAPE, SCRAPE_ERROR } from "./types";

// Scrape based on selection and return json data
export const scrapeSite = selection => async dispatch => {
  try {
    const res = await axios.get(`/scrape/${selection}`);

    dispatch({
      type: SCRAPE_SITE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SCRAPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete single scrape result
export const deleteScrape = title => async dispatch => {
  try {
    dispatch({
      type: DELETE_SCRAPE,
      payload: title
    });

    dispatch(setAlert("Scrape deleted", "success"));
  } catch (err) {
    dispatch({
      type: SCRAPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
