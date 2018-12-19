const sorters = {
  "sorters": [
    {
      "name": "MountainSort4-thr3",
      "processor_name": "MountainSort4",
      "processor_version": "4.1.0",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 50,
        "detect_threshold": 3
      }
    },
    {
      "name": "SpykingCircus",
      "processor_name": "SpykingCircus",
      "processor_version": "0.1.6",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 50
      }
    },
    {
      "name": "IronClust-tetrode",
      "processor_name": "IronClust",
      "processor_version": "4.2.8",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 50,
        "detect_threshold": 5,
        "prm_template_name": "tetrode_template.prm"
      }
    },
    {
      "name": "IronClust-drift",
      "processor_name": "IronClust",
      "processor_version": "4.2.8",
      "params": {
        "detect_sign": -1,
        "adjacency_radius": 50,
        "prm_template_name": "template_drift.prm"
      }
    }
  ]
}
export default sorters