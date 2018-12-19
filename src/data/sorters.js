const sorters = {
  "sorters": [{
      "name": "MountainSort4-thr3",
      "processor_name": "MountainSort4",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 100,
        "detect_threshold": 3
      }
    },
    {
      "name": "IronClust-tetrode",
      "processor_name": "IronClust",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 100,
        "detect_threshold": 5,
        "prm_template_name": "tetrode_template.prm"
      }
    },
    {
      "name": "SpykingCircus",
      "processor_name": "SpykingCircus",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 100
      }
    }
  ]
}

export default sorters;