import React from "react";
import ScrapeContainer from "../scrape/ScrapeContainer";
import logo from "../../img/skrapio_logo_md.png";

const Landing = () => {
  return (
    <section className='hero is-white'>
      <div className='hero-body'>
        <div className='container has-text-centered'>
          <h1 className='title'>
            <img src={logo} width='400' />
          </h1>
          <h2 className='subtitle'>
            <strong>Scrape the Web of Tech News</strong>
          </h2>
          <h2 className='subtitle'>Built with Cheerio</h2>
        </div>
        <br />
        <ScrapeContainer />
      </div>
      <div className='hero-foot'>
        <div className='container has-text-centered'>
          <h2 className='subtitle footer-text'>&copy; Jonas Hellstrom</h2>
        </div>
      </div>
    </section>
  );
};

export default Landing;
