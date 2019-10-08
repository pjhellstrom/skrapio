import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ScrapeCard from "./ScrapeCard";
import { scrapeSite } from "../../actions/scrape";

const ScrapeContainer = ({ scrapeSite, scrape: { scrapeResult, loading } }) => {
  return (
    <Fragment>
      <div className='container has-text-centered'>
        <a
          className='button is-dark is-rounded scrape-button'
          onClick={() => {
            scrapeSite("techcrunch");
          }}>
          <strong>Scrape TechCrunch</strong>
        </a>
        <a
          className='button is-dark is-rounded scrape-button'
          onClick={() => {
            scrapeSite("macrumors");
          }}>
          <strong>Scrape MacRumors</strong>
        </a>
        {/* <a
          className='button is-outlined is-rounded'
          onClick={() => {
            scrapeSite("technewsworld");
          }}>
          Scrape TechNewsWorld
        </a> */}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container scrape-container'>
            {scrapeResult.length > 0 ? (
              scrapeResult.map(scrape => (
                <ScrapeCard key={scrape._id} scrape={scrape} />
              ))
            ) : (
              <Fragment>
                <p>You have not yet scraped, please start a new scraper</p>
                <Link to='/' className=''>
                  Scrape
                </Link>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ScrapeContainer.propTypes = {
  scrapeSite: PropTypes.func.isRequired,
  scrape: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scrape: state.scrape
});

export default connect(
  mapStateToProps,
  { scrapeSite }
)(ScrapeContainer);
