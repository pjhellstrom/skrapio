import { SCRAPE_SITE, SCRAPE_ERROR, DELETE_SCRAPE } from "../actions/types";

const initialState = {
  scrapeResult: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCRAPE_SITE:
      return {
        ...state,
        scrapeResult: payload,
        loading: false
      };
    case DELETE_SCRAPE:
      return {
        ...state,
        scrapeResults: state.scrape.filter(scrape => scrape.title !== payload),
        loading: false
      };
    case SCRAPE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
