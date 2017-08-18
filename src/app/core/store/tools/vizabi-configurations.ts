import * as _ from 'lodash';

import * as PopByAgeState from 'vizabi-config-systema_globalis/dist/PopByAge.json';
import * as BarRankChartState from 'vizabi-config-systema_globalis/dist/BarRankChart.json';
import * as BubbleChartState from 'vizabi-config-systema_globalis/dist/BubbleChart.json';
import * as BubbleMapState from 'vizabi-config-systema_globalis/dist/BubbleMap.json';
import * as LineChartState from 'vizabi-config-systema_globalis/dist/LineChart.json';
import * as MountainChartState from 'vizabi-config-systema_globalis/dist/MountainChart.json';

export const DEFAULT_STATE: any = {
  PopByAge: PopByAgeState,
  BarRankChart: BarRankChartState,
  BubbleChart: BubbleChartState,
  BubbleMap: BubbleMapState,
  LineChart: LineChartState,
  MountainChart: MountainChartState
};

const SODERTORN_BUBBLECHART_STATE = {
  'state': {
    'time': {
      'startOrigin': '1993',
      'endOrigin': '2015',
      'value': '2014',
      'dim': 'year',
      'delay': 700
    },
    'entities': {
      'dim': 'basomrade',
      'show': {}
    },
    'entities_colorlegend': {
      'dim': 'municipality'
    },
    'entities_tags': {
      'dim': 'tag'
    },
    'marker': {
      'space': ['entities', 'time'],
      'label': {
        'use': 'property',
        'which': 'name'
      },
      'axis_y': {
        'which': 'higher_education_min_3_years_percent_of_population_aged_25_64',
        'use': 'indicator'
      },
      'axis_x': {
        'which': 'mean_income_aged_lt_20',
        'use': 'indicator',
        'scaleType': 'log'
      },
      'size': {
        'which': 'population_20xx_12_31',
        'use': 'indicator',
        'scaleType': 'linear',
        'extent': [0, 0.4],
        'allow': {
          'scales': ['linear']
        }
      },
      'color': {
        'use': 'property',
        'which': 'municipality',
        'scaleType': 'ordinal',
        'syncModels': ['marker_colorlegend']
      }
    },
    'marker_colorlegend': {
      'space': ['entities_colorlegend'],
      'opacityRegular': 0.8,
      'opacityHighlightDim': 0.3,
      'label': {
        'use': 'property',
        'which': 'name'
      },
      'hook_rank': {
        'use': 'property',
        'which': 'rank'
      },
      'hook_geoshape': {
        'use': 'property',
        'which': 'shape_lores_svg'
      }
    },
    'marker_tags': {
      'space': ['entities_tags'],
      'label': {
        'use': 'property',
        'which': 'name'
      },
      'hook_parent': {
        'use': 'property',
        'which': 'parent'
      }
    },
    'marker_allpossible': {
      'space': ['entities'],
      'label': {
        'use': 'property',
        'which': 'name'
      },
      'skipFilter': true
    }
  },
  'data': {
    reader: 'waffle',
    path: '/api/ddf/ql/',
    dataset: 'open-numbers/ddf--sodertorn--stockholm_lan_basomrade'
  },
  'ui': {
    'datawarning': {
      'doubtDomain': [1993, 2015],
      'doubtRange': [0, 0]
    },
    'chart': {
      'labels': { 'removeLabelBox': true },
      'trails': false
    },
    'splash': true,
    'dialogs': {
      'popup': ['colors', 'show', 'find', 'size', 'zoom', 'moreoptions'],
      'dialog': {
        'show': {
          enablePicker: true
        },
        'find': {
          enablePicker: true
        }
      }
    },
    'buttons': ['colors', 'show', 'find', 'trails', 'lock', 'moreoptions', 'fullscreen', 'presentation']
  }
};

export const SODERTORN_STATE = Object.assign(_.cloneDeep(DEFAULT_STATE), { BubbleChart: SODERTORN_BUBBLECHART_STATE });

export const CLIENT_CONFIGS = {
  sodertorn: SODERTORN_STATE
};

export const AVAILABLE_CLIENTS = new Set(Object.keys(CLIENT_CONFIGS));
