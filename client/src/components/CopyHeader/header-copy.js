const headers = {
  about: {
    id: "head01",
    name: "About",
    paragraphs: [
      "Basic background information on the methods, data, and collaborators to come"
    ]
  },

  algos: {
    id: "head02",
    name: "Algorithms",
    paragraphs: [
      "Entries indicated with a check are actively available for comparison on this site. Other entries are forthcoming."
    ]
  },

  recordings: {
    id: "head03",
    name: "",
    paragraphs: [
      "Below are the types of data being analyzed. Add more text here please."
    ]
  },

  home: {
    id: "head04",
    image: "../logo.svg",
    paragraphs: [
      "SpikeForest is a website and open source computing framework for evaluating and comparing spike sorting algorithms for neurophysiology data analysis.",
      "The system includes a collection of standard electrophysiology datasets together with ground truth information and a collection of spike sorting algorithms. Each algorithm is run against all datasets, and the results are updated on a daily basis as needed. You can browse all datasets, algorithms, sorting results, and comparisons, and inspect the source code used to generate these data."
    ]
  },

  studies: {
    id: "head05",
    name: "Studies",
    paragraphs: []
  }
};

export default headers;
