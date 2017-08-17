import RelatedItems from '../../related-items';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

import * as PopByAgeState from 'vizabi-config-systema_globalis/dist/PopByAge.json';
import * as BarRankChartState from 'vizabi-config-systema_globalis/dist/BarRankChart.json';
import * as BubbleChartState from 'vizabi-config-systema_globalis/dist/BubbleChart.json';
import * as BubbleMapState from 'vizabi-config-systema_globalis/dist/BubbleMap.json';
import * as LineChartState from 'vizabi-config-systema_globalis/dist/LineChart.json';
import * as MountainChartState from 'vizabi-config-systema_globalis/dist/MountainChart.json';
import { ChangeConfig, SelectTool, ToolsActions, VizabiInstanceCreated, VizabiModelChanged } from './tools.actions';

const TOOLS_STATE: any = {
  PopByAge: PopByAgeState,
  BarRankChart: BarRankChartState,
  BubbleChart: BubbleChartState,
  BubbleMap: BubbleMapState,
  LineChart: LineChartState,
  MountainChart: MountainChartState
};

export interface State {
  tools: any;
  slugs: any;
  defaultTool: string;
  selectedTool: string;
  toolToSlug: any;
  vizabiInstances: any;
  createdTool: string;
  currentHashModel: any;
  initialVizabiInstances: any;
}

const { tools, slugs } = setupItems(RelatedItems);
const { vizabiInstances, toolToSlug } = setupVizabiDataCharts({tools, slugs});

const defaultTool = 'bubbles';

const initialState: State = {
  tools,
  slugs,
  defaultTool,
  toolToSlug,
  selectedTool: defaultTool,
  createdTool: null,
  currentHashModel: {},
  vizabiInstances,
  initialVizabiInstances: _.cloneDeep(vizabiInstances),
};

function setupVizabiDataCharts({tools, slugs}): any {
  return slugs.reduce((result, slug) => {
    const chartType = tools[slug].tool;

    result.toolToSlug[chartType] = slug;

    result.vizabiInstances[slug] = {
      modelHash: '',
      chartType: chartType,
      model: _.cloneDeep(tools[slug].opts),
      instance: {},
      modelInitial: {}
    };

    return result;
  }, { vizabiInstances: {}, toolToSlug: {} });
}

function setupItems(items: any[]): any {
  const itemsCloned = _.cloneDeep(items);
  return itemsCloned.reduce((result: any, toolDescriptor: any) => {
    if (_.has(environment, 'datasetBranch')) {
      toolDescriptor.opts.data.dataset += (environment as any).datasetBranch;
    }

    Object.assign(toolDescriptor.opts, TOOLS_STATE[toolDescriptor.tool]);
    toolDescriptor.opts.data.path = `${environment.wsUrl}${toolDescriptor.opts.data.path}`;
    toolDescriptor.opts.data.assetsPath = `${(environment as any).wsUrlAssets}${toolDescriptor.opts.data.assetsPath}`;

    result.tools[toolDescriptor.slug] = toolDescriptor;
    result.slugs.push(toolDescriptor.slug);
    return result;
  }, { tools: {}, slugs: [] });
}

export function reducer(state: State = initialState, action: ToolsActions): State {
  switch (action.type) {
    case ChangeConfig.TYPE: {
      const config = (action as ChangeConfig).config;
      if (!config) return state;

      const { tools, slugs } = setupItems(config);
      return Object.assign({}, state, { tools, slugs });
    }
    case SelectTool.TYPE: {
      const act = action as SelectTool;
      return act.tool ? Object.assign({}, state, { selectedTool: act.tool }) : state;
    }
    case VizabiModelChanged.TYPE: {
      const act = action as VizabiModelChanged;
      return Object.assign({}, state, { currentHashModel: act.model });
    }
    case VizabiInstanceCreated.TYPE: {
      const act = action as VizabiInstanceCreated;
      return Object.assign({}, state, { createdTool: act.tool }, {
        vizabiInstances: {
          ...state.vizabiInstances,
          [act.tool]: act.vizabiInstance
        }
      });
    }
    default: {
      return state;
    }
  }
}

