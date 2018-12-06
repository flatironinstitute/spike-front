import React, { Component } from "react";

class StudySorterSummary extends Component {
  render() {
    const selectedNode = this.props.selectedNode[0];
    console.log(selectedNode);
    return (
      <div>
        <h4 className="unitdetail__title">Detail View</h4>
        <div className="unitdetail__copy">
          <ul className="unitdetail__list">
            <p>
              Sorter: <a>{selectedNode.sorter}</a>
            </p>
            <li>
              Study: <a>{selectedNode.study}</a>
            </li>
            <li>num_events: 1398</li>
            <li>peak_channel: 0</li>
            <li>recording: "001_synth"</li>
            <li>snr: 25.396783859187707</li>
            <li>sorter: "MountainSort4-thr3"</li>
            <li>study: "magland_synth_noise10_K10_C4"</li>
          </ul>
          <p>
            Boggarts lavender robes, Hermione Granger Fantastic Beasts and Where
            to Find Them. Bee in your bonnet Hand of Glory elder wand,
            spectacles House Cup Bertie Bott’s Every Flavor Beans Impedimenta.
            Stunning spells tap-dancing spider Slytherin’s Heir mewing kittens
            Remus Lupin. Palominos scarlet train black robes, Metamorphimagus
            Niffler dead easy second bedroom. Padma and Parvati Sorting Hat
            Minister of Magic blue turban remember my last.
          </p>
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
