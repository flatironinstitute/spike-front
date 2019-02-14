import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div className="about__body">
        <div className="intro">
          <p className="big">About SpikeForest</p>
          <div className="dividerthick" />
          <p className="subhead">
            Project of the Center for Computational Mathematics, Flatiron
            Institute
          </p>
          <p className="byline">
            Please use the
            <a href="https://github.com/elovero/spike-front/issues">
              Github issues
            </a>{' '}
            page to report website problems or
            <a href="mailto:elovero@flatironinstitute.org">contact</a> us
            directly.
          </p>
          <p className="updated">Updated on February 14, 2019</p>
        </div>
        <div className="opener">
          <div className="prose-container">
            <h3>Credits</h3>
            <p>
              Jeremy Magland (chief infrastructure developer, back-end,
              recording simulation) Liz Lovero, Scientific Computing Core (site
              design and visualizations, front-end) James Jun (infrastructure,
              testing, and recording wrangling and simulation) Alex Barnett
              (concept and site design, testing)
            </p>
            <p>
              We are grateful for many collaborators at other institutions for
              their vital help: Loren Frank (UCSD) Jason Chung (UCSD) Catalin
              Mitelut (Columbia) Dan English (...) [please add!] ETC
            </p>
            <h3>History and Future</h3>
            <p>
              This project is the fruition of a long-term goal within the spike
              sorting effort of CCM, starting in 2014 at what was then the SCDA.
              The original spike sorting effort comprised Jeremy Magland, Alex
              Barnett, and Leslie Greengard, and collaborators in Loren Frank's
              lab.
            </p>
            <p>
              Early design principles were outlined in our{' '}
              <a href="https://github.com/flatironinstitute/spikesortercomparison">
                white paper
              </a>{' '}
              of May 2018. This was inspired in part a spike-sorting community
              discussion at the Janelia spike sorting meeting of 3/22/18.
            </p>
            <p>Influences for the concept and site design include:</p>
            <ul>
              <li>
                <a href="https://clusteval.sdu.dk/">ClustEval website</a> Wiwie,
                C., Röttger, R. & Baumbach, J. Comparing the performance of
                biomedical clustering methods. Nature Methods (2015).
              </li>
              <li>
                <a href="http://neurofinder.codeneuro.org/">NeuroFinder,</a> by
                Jeremy Freeman, for calcium imaging spatial neuron extraction
                comparison.
              </li>
              <li>
                <a href="http://spikefinder.codeneuro.org">SpikeFinder</a>, by
                P. Berens, for extracting spikes from calcium imaging
                fluorescence curves.
              </li>
              <li>
                <a href="http://spike.g-node.org">G-Node</a>. A now-defunct
                2011-2012 project wher the user uploads sorted data, which is
                compared against a hidden ground truth sorting and optionally
                published.
              </li>
              <li>
                <a href="http://phy.cortexlab.net/data/sortingComparison">
                  cortexlab
                </a>
                , by N. Steinmetz. Comparison of several algorithms on hybrid
                data.
              </li>
              <li>
                <a href="http://www.spikesortingtest.com">Spikesortingtest</a>{' '}
                by C. Mitelut.
              </li>
              <li>
                <a href="http://simonster.github.io/SpikeSortingSoftware">
                  SpikeSortingSoftware
                </a>
                Older list of spike sorting codes and their features.
              </li>
            </ul>
            <h3>Changelog for website</h3>
            <p>June 2019 : release v 1.0</p>
            <h3>Future plans</h3>
            <p>
              <ul>
                <li>Hybrid recordings</li>
                <li>
                  Expansion of SNR to other surrogate metrics: noise overlap,
                  etc.
                </li>
                <li>Stability-based quality metrics.</li>
              </ul>
            </p>
            <h3>Related Projects</h3>
            <p>[Links to other repos]</p>
            <h3>Contact</h3>
            <p>[TODO: MOVE TO FORM?]</p>
            <p>
              If you have questions, comments, requests, new algorithms or
              recordings that we should host or incorporate, please use the
              following tool: [Give the URL for posting comments. OR add link to
              usersnap?] If you would like to help develop SpikeForest, please
              contact Jeremy Magland directly, or use its github repo.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
