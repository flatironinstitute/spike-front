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
            <Tab>Info</Tab>
            <Tab>Scatterplot</Tab>
            <Tab disabled>Yoshi</Tab>
            <Tab disabled>Toad</Tab>
          </TabList>
          <TabPanel>
            <h6>Sorter: {selectedNode.sorter}</h6>
            <p>
              <a className="button button-primary" href="/study">
                View Sorter
              </a>
            </p>
            <h6>Study: {selectedNode.study}</h6>
            <p>
              {" "}
              <a className="button button-primary" href="/study">
                View Study
              </a>
            </p>
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
              <b>Yoshi</b> (<i>ヨッシー Yosshī, [joɕ.ɕiː]</i>) (
              <i>English: /ˈjoʊʃi/ or /ˈjɒʃi/</i>), once romanized as Yossy, is
              a fictional anthropomorphic dinosaur who appears in video games
              published by Nintendo. Yoshi debuted in Super Mario World (1990)
              on the Super Nintendo Entertainment System as Mario and Luigi's
              sidekick. Yoshi later starred in platform and puzzle games,
              including Super Mario World 2: Yoshi's Island, Yoshi's Story and
              Yoshi's Woolly World. Yoshi also appears in many of the Mario
              spin-off games, including Mario Party and Mario Kart, various
              Mario sports games, and Nintendo's crossover fighting game series
              Super Smash Bros. Yoshi belongs to the species of the same name,
              which is characterized by their variety of colors.
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
