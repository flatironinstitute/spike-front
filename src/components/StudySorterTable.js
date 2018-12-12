import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class StudySorterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 0
    };
  }
  render() {
    const selectedNode = this.props.selectedNode;
    console.log("selectedNode 🐛", selectedNode);
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
            <p>Items under accuracy threshold: {selectedNode.in_range}</p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Scatterplot</b> (
              <i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (
              <i>English: /luˈiːdʒi/; Italian: [luˈiːdʒi]</i>) is a fictional
              character featured in video games and related media released by
              Nintendo. Created by prominent game designer Shigeru Miyamoto,
              Luigi is portrayed as the slightly younger but taller fraternal
              twin brother of Nintendo's mascot Mario, and appears in many games
              throughout the Mario franchise, often as a sidekick to his
              brother.
            </p>
            <p>
              Source:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Luigi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Details</b>
              <ul>
                <li>Duration</li>
                <li>Number channels</li>
                <li>Sample rate</li>
                <li>File size</li>
                <li>Number groundtruth</li>
              </ul>
            </p>
            <p>
              Source:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Yoshi"
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
