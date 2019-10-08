import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ScrapeCard = ({ scrape: { title, body, link, image, source } }) => {
  return (
    <article className='media'>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img src={image} />
        </p>
      </figure>
      <div className='media-content'>
        <div className='content'>
          <p className='media-text-size'>
            <strong>{title}</strong> <br />
            <small> From {source}</small>
            <br />
            {body}
          </p>
        </div>
        <a className='button is-small' href={link}>
          <span>Read More</span>
        </a>
      </div>
    </article>
  );
};

ScrapeCard.propTypes = {
  scrape: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(ScrapeCard);
