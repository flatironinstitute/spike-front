## Scripts for spike sorting of {studyName}/{recordingName} using {sorterName}.

| Study | Recording | Sorter name | Version | Container |
| ----------- | ------- | --------- | --------- | --------- |
| {studyName} | {recordingName} | {processorName}  | {processorVersion} | {container} |

#### Prerequisites

At this point, SpikeForest has only been tested in Linux and OSX. It is also
possible to use Linux within Windows.

#### Installation

The first step is to install SpikeForest2. You should follow the installation
instructions here: https://github.com/flatironinstitute/spikeforest2

In the future this will be pip-installable to a particular version of SpikeForest2,
but for now you will need to install the development version.

#### Downloading and running the sorting

The following script may be used to reproduce this result by running the sorting
and comparing with ground truth.

```python
import numpy as np
from spikeforest2 import sorters
from spikeforest2 import processing
import hither
import kachery as ka

recording_path = '{recordingDirectory}'
sorting_true_path = '{sortingTruePath}'

sorter_name = '{processorName}'
sorter = getattr(sorters, sorter_name)
params = {params}

# Determine whether we are going to use gpu based on the name of the sorter
gpu = sorter_name in ['kilosort2', 'kilosort', 'tridesclous', 'ironclust']

# In the future we will check whether we have the correct version of the wrapper here
# Version: {processorVersion}

# Download the data (if needed)
ka.set_config(fr='default_readonly')
ka.load_file(recording_path + '/raw.mda')

# Run the spike sorting
with hither.config(container='{container}', gpu=gpu):
  sorting_result = sorter.run(
    recording_path=recording_path,
    sorting_out=hither.File(),
    **params
  )
assert sorting_result.success
sorting_path = sorting_result.outputs.sorting_out

# Compare with ground truth
with hither.config(container='default'):
  compare_result = processing.compare_with_truth.run(
    sorting_path=sorting_path,
    sorting_true_path=sorting_true_path,
    json_out=hither.File()
  )
assert compare_result.success
obj = ka.load_object(compare_result.outputs.json_out._path)

accuracies = [float(obj[i]['accuracy']) for i in obj.keys()]
print('ACCURACIES:')
print(accuracies)
print('')

average_accuracy = np.mean(accuracies)
print('AVERAGE-ACCURACY:', average_accuracy)
```