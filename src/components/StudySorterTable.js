import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Scatterplot from "./Scatterplot";

class StudySorterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 0
    };
  }
  render() {
    const selectedNode = this.props.selectedNode;
    return (
      <div style={{ padding: 50, background: "#fff" }}>
        <Tabs>
          <TabList>
            <Tab>Scatterplot</Tab>
            <Tab>Details</Tab>
            <Tab>Configuration</Tab>
            <Tab disabled>Other</Tab>
          </TabList>
          <TabPanel>
            <p>Items above accuracy threshold: {selectedNode.in_range}</p>
            <Scatterplot
              selectedUnits={this.props.selectedNode.true_units}
              accuracy={this.props.accuracy}
            />
          </TabPanel>
          <TabPanel>
            <p>
              <b>Details</b>
            </p>
            <ul>
              <li>
                <b>Duration: </b>1234 milleseconds
              </li>
              <li>
                <b>Number channels: </b>4
              </li>
              <li>
                <b>Sample rate: </b>12344
              </li>
              <li>
                <b>File size: </b>12344
              </li>
              <li>
                <b>Number groundtruth: </b>12344
              </li>
            </ul>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Configuration</b> (<i>Parameters used for this sorting</i>)
            </p>
            <p>
              <b>Requirements</b> (
              <i>Sortware and other containers, GPU, NVIDA</i>)
            </p>
            <p>
              here is something about that fictional character who primarily
              appears in Nintendo's Mario franchise. Created by Japanese video
              game designer Shigeru Miyamoto, he is portrayed as a citizen of
              the Mushroom Kingdom and is one of Princess Peach's most loyal
              attendants; constantly working on her behalf. He is usually seen
              as a non-player character (NPC) who provides assistance to Mario
              and his friends in most games, but there are times when Toad(s)
              takes center stage and appears as a protagonist, as seen in Super
              Mario Bros. 2, Wario's Woods, Super Mario 3D World, and Captain
              Toad: Treasure Tracker.
            </p>
            <p>
              Source:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Toad_(Nintendo)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            </p>
            <p>
              Source:
              <a
                href="https://en.wikipedia.org/wiki/Toad_(Nintendo)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Toad</b> (<i>Japanese: キノピオ Hepburn: Kinopio</i>) is a
              fictional character who primarily appears in Nintendo's Mario
              franchise. Created by Japanese video game designer Shigeru
              Miyamoto, he is portrayed as a citizen of the Mushroom Kingdom and
              is one of Princess Peach's most loyal attendants; constantly
              working on her behalf. He is usually seen as a non-player
              character (NPC) who provides assistance to Mario and his friends
              in most games, but there are times when Toad(s) takes center stage
              and appears as a protagonist, as seen in Super Mario Bros. 2,
              Wario's Woods, Super Mario 3D World, and Captain Toad: Treasure
              Tracker.
            </p>
            <p>
              Source:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Toad_(Nintendo)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            </p>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
export default StudySorterTable;
