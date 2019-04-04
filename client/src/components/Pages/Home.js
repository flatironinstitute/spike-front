import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import HomeContentContainer from "../Heatmap/HomeContentContainer";
import { flattenUnitResults, formatUnitResults } from "../../dataHandlers";
import { isEmpty } from "../../utils";
import { Alert, Container, Card } from "react-bootstrap";

import "./pages.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatUnits: {},
      unitsMap: {}
    };
  }

  componentDidMount() {
    if (this.props.groupedURs && this.props.studies) {
      let flatUnits = flattenUnitResults(
        this.props.groupedURs,
        this.props.studies
      );
      this.setState({ flatUnits: flatUnits });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.groupedURs !== prevProps.groupedURs ||
      this.props.studies !== prevProps.studies
    ) {
      if (this.props.groupedURs && this.props.studies) {
        let flatUnits = flattenUnitResults(
          this.props.groupedURs,
          this.props.studies
        );
        this.setState({ flatUnits: flatUnits });
      }
    }
    if (this.state.flatUnits !== prevState.flatUnits) {
      this.mapUnits();
    }
  }

  async mapUnits() {
    let unitsMap = await formatUnitResults(
      this.state.flatUnits,
      this.props.sorters
    );
    this.setState({ unitsMap: unitsMap });
  }

  getStudies() {
    return this.props.studies
      .map(item => item.name)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  getSorters() {
    return this.props.sorters
      .map(item => item.name)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  render() {
    let loading =
      isEmpty(this.state.flatUnits) ||
      isEmpty(this.props.studies) ||
      isEmpty(this.props.sorters);
    let sorters = this.props.sorters ? this.getSorters() : null;
    let studies = this.props.studies ? this.getStudies() : null;
    console.log("🍔grouped urs", this.props.groupedURs);
    if (!isEmpty(this.state.unitsMap)) {
      console.log("🍔 unitsmap", this.state.unitsMap);
    }
    return (
      <div className="page__body page__body--alert ">
        {/* CPU - sum of all cpuTimeSec on every sorting result */}
        {/* Ground truth - count of all true units */}
        {/* Recording data - hard code*/}
        <Alert variant={"success"}>
          <b>Project Totals:</b> 111111 CPU Core Hours, 2222222 Ground Truth
          Units, 1.2TB of recordings
        </Alert>
        {loading ? (
          <Container className="container__heatmap" id="overview">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <HomeContentContainer
            id="overview"
            {...this.props}
            shortStudies={studies}
            shortSorters={sorters}
            // TODO: Reorg
            unitsMap={this.state.unitsMap}
          />
        )}
      </div>
    );
  }
}
export default Home;

// const sampleUnitMap = {
//   magland_synth_noise10_K10_C4: [
//     {
//       accuracies: [1, 0.99, 0.98, 0.98, 0.61, 0.98, 0.99, 0.98, 0.99],
//       color: 89,
//       in_range: 89,
//       is_applied: true,
//       snrs: [
//         12.173096066945002,
//         7.922575105423556,
//         4.998194515488062,
//         5.889166112522549,
//         4.6560610581424235,
//         5.936354250253983,
//         7.882829627604207,
//         5.020894526246758
//       ],
//       sorter: "MountainSort4-thr3",
//       study: "magland_synth_noise10_K10_C4",
//       style: { fill: "white" },
//       true_units: [
//         {
//           accuracy: 1,
//           firing_rate: 2.33,
//           num_events: 1398,
//           peak_channel: 0,
//           recording: "001_synth",
//           snr: 12.173096066945002,
//           sorter: "MountainSort4-thr3",
//           sorting_results: {
//             accuracy: "1.00",
//             best_unit: 2,
//             f_n: "0.00",
//             f_p: "0.00",
//             matched_unit: 2,
//             num_matches: 1398,
//             unit_id: 1
//           },
//           study: "magland_synth_noise10_K10_C4",
//           unit_id: 1
//         },
//         {
//           accuracy: 1,
//           firing_rate: 2.33,
//           num_events: 1398,
//           peak_channel: 0,
//           recording: "001_synth",
//           snr: 12.173096066945002,
//           sorter: "MountainSort4-thr3",
//           sorting_results: {
//             accuracy: "1.00",
//             best_unit: 2,
//             f_n: "0.00",
//             f_p: "0.00",
//             matched_unit: 2,
//             num_matches: 1398,
//             unit_id: 1
//           },
//           study: "magland_synth_noise10_K10_C4",
//           unit_id: 1
//         },
//         {
//           accuracy: 1,
//           firing_rate: 2.33,
//           num_events: 1398,
//           peak_channel: 0,
//           recording: "001_synth",
//           snr: 12.173096066945002,
//           sorter: "MountainSort4-thr3",
//           sorting_results: {
//             accuracy: "1.00",
//             best_unit: 2,
//             f_n: "0.00",
//             f_p: "0.00",
//             matched_unit: 2,
//             num_matches: 1398,
//             unit_id: 1
//           },
//           study: "magland_synth_noise10_K10_C4",
//           unit_id: 1
//         }
//       ],
//       x: "MountainSort4-thr3",
//       y: "magland_synth_noise10_K10_C4"
//     }
//   ]
// };
