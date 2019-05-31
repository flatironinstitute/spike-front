Scripts for spike sorting of {studyName}/{recordingName} using {sorterName}.

This will only work if the recording has been made public (we have made a subset of recordings public) or if you already have the recording on your computer.

## Prerequisites

At this point, SpikeForest has only been tested in Linux. In the future we will support OSX. It is also possible to use Linux within Windows.

## Installation

The first step is to install spikeforest and mountaintools. The easiest way is to use
the PyPI packages as follows.

```bash
pip install --upgrade spikeforest==0.8.0
pip install --upgrade mountaintools==0.4.0
```

To use the containerized versions of the spike sorters (recommended), you should
[install singularity 2.6.1](https://www.sylabs.io/guides/2.6/user-guide/quick_start.html#quick-installation-steps).
This will work for all of the non-Matlab spike sorters (in the future we will
also containerize the Matlab packages).

## Downloading and running the sorting

Making use of [SpikeInterface](https://github.com/SpikeInterface/), we can load the recording and the above ground truth sorting in Python:

```python
from spikeforest import SFMdaRecordingExtractor, SFMdaSortingExtractor
from mountaintools import client as mt

# Configure to download from the public spikeforest kachery node
mt.configDownloadFrom('spikeforest.public')

# Load the recording with its ground truth
# You can also substitute any of the other available recordings
recdir = '{recordingDirectory}'

print('Loading recording...')
# The following will only work if the recording has been made public
# (we have made a subset of recordings public) or if you
# already have the recording on your computer.
recording = SFMdaRecordingExtractor(dataset_directory=recdir, download=True)
sorting_true = SFMdaSortingExtractor(firings_file=recdir + '/firings_true.mda')

# This will automatically download the necessary files and you now have objects
# representing the recording and ground truth sorting which you can manipulate
# using the tools of [SpikeInterface](https://github.com/SpikeInterface/).

# Running the sorting

# For our purposes, we will operate directly on the recording directory in order
# to take advantage of the MountainTools caching and container capabilities. But
# in the future we will be able to perform these operations directly using the
# extractor objects.

# import a spike sorter from the spikesorters module of spikeforest
from spikesorters import {processorName}
import os
import shutil

# clear and create an empty output directory (keep things tidy)
if os.path.exists('test_outputs'):
    shutil.rmtree('test_outputs')
os.makedirs('test_outputs', exist_ok=True)

# Run spike sorting in the default singularity container
print('Spike sorting...')
params = {params}
{processorName}.execute(
    recording_dir=recdir,
    firings_out='test_outputs/firings.mda',
    **params,
    _container='default'
)

# Load the result into a sorting extractor
sorting = SFMdaSortingExtractor(firings_file='test_outputs/firings.mda')
```

When using MountainTools processors (via `execute()`), results are
automatically cached. To force rerun, use the `_force_run=True` option.

To run outside the container (without singularity), use `_container=None`. In this case you will need to install the spike sorting software locally on your system.

You can use any of the SpikeForest-wrapped
sorting algorithms in place of {processorName}.

## Comparison with ground truth

Next, we can compare the result with ground truth

```python
# import from the spikeforest package
import spikeforest_analysis as sa

# write the ground truth firings file
SFMdaSortingExtractor.write_sorting(
    sorting=sorting_true,
    save_path='test_outputs/firings_true.mda'
)

# run the comparison
print('Compare with truth...')
sa.GenSortingComparisonTable.execute(
    firings='test_outputs/firings.mda',
    firings_true='test_outputs/firings_true.mda',
    units_true=[],  # use all units
    json_out='test_outputs/comparison.json',
    html_out='test_outputs/comparison.html',
    _container=None
)

# we may also want to compute the SNRs of the ground truth units
# together with firing rates and other information
print('Compute units info...')
sa.ComputeUnitsInfo.execute(
    recording_dir=recdir,
    firings='test_outputs/firings_true.mda',
    json_out='test_outputs/true_units_info.json'
)

import numpy as np

# Load and consolidate the outputs
true_units_info = mt.loadObject(path='test_outputs/true_units_info.json')
comparison = mt.loadObject(path='test_outputs/comparison.json')
true_units_info_by_unit_id = dict()
for unit in true_units_info:
  true_units_info_by_unit_id[unit['unit_id']] = unit
for unit in comparison.values():
  unit['true_unit_info'] = true_units_info_by_unit_id[unit['unit_id']]
  
# Print SNRs and accuracies
for unit in comparison.values():
  print('Unit {}: SNR={}, accuracy={}'.format(unit['unit_id'], unit['true_unit_info']['snr'], unit['accuracy']))
  
# Report number of units found
snrthresh = 8
units_above = [unit for unit in comparison.values() if float(unit['true_unit_info']['snr'] > snrthresh)]
print('Avg. accuracy for units with snr >= {}: {}'.format(snrthresh, np.mean([float(unit['accuracy']) for unit in units_above])))

```
