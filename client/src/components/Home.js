import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="App container container--lg">
        <h1>About SpikeForest</h1>
        {/* Link to List.js */}
        <Link to={"./datasets"}>
          <button>The Datasets</button>
        </Link>
      </div>
    );
  }
}

export default Home;

//import logo from "./logo.svg";
//     <div className="App container container--lg">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1>SpikeForest</h1>
//         <p>
//           SpikeForest is a website and open source computing framework for
//           evaluating and comparing spike sorting algorithms for
//           neurophysiology data analysis.
//         </p>
//         <p>
//           The system includes a collection of standard electrophysiology
//           datasets together with ground truth information and a collection of
//           spike sorting algorithms. Each algorithm is run against all
//           datasets, and the results are updated on a daily basis as needed.
//           You can browse all datasets, algorithms, sorting results, and
//           comparisons, and inspect the source code used to generate these
//           data.
//         </p>
//         <a
//           className="App-link"
//           href="https://www.simonsfoundation.org/flatiron/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn More
//         </a>
//       </header>
//     </div>
//   );
