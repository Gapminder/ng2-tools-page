import RelatedItems from '../../related-items';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

import { ChangeConfig, SelectTool, ToolsActions, VizabiInstanceCreated, VizabiModelChanged } from './tools.actions';
import { DEFAULT_STATE } from './vizabi-configurations';

export interface State {
  tools: any;
  slugs: any;
  defaultTool: string;
  selectedTool: string;
  toolToSlug: any;
  client: string;
  vizabiInstances: any;
  createdTool: string;
  currentHashModel: any;
  initialVizabiInstances: any;
  configChangeUID: number;
}

const { tools, slugs } = setupItems(RelatedItems, DEFAULT_STATE);
const { vizabiInstances, toolToSlug } = setupVizabiDataCharts({tools, slugs});

const defaultTool = 'bubbles';

const initialState: State = {
  tools,
  slugs,
  defaultTool,
  toolToSlug,
  client: null,
  selectedTool: defaultTool,
  createdTool: null,
  currentHashModel: {},
  vizabiInstances,
  initialVizabiInstances: _.cloneDeep(vizabiInstances),
  configChangeUID: Date.now()
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
    };

    return result;
  }, { vizabiInstances: {}, toolToSlug: {} });
}

function setupItems(items: any[], toolsState: any): any {
  const itemsCloned = _.cloneDeep(items);
  return itemsCloned.reduce((result: any, toolDescriptor: any) => {
    if (_.has(environment, 'datasetBranch')) {
      toolDescriptor.opts.data.dataset += (environment as any).datasetBranch;
    }

    Object.assign(toolDescriptor.opts, toolsState[toolDescriptor.tool]);
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
      const act = (action as ChangeConfig);

      if (!act.config) {
        return state;
      }

      const { tools, slugs } = setupItems(RelatedItems, act.config);
      const { vizabiInstances, toolToSlug } = setupVizabiDataCharts({tools, slugs});

      return Object.assign({}, state, {
        tools,
        slugs,
        toolToSlug,
        client: act.client,
        configChangeUID: Date.now(),
        initialVizabiInstances: vizabiInstances,
      });
    }
    case SelectTool.TYPE: {
      const act = action as SelectTool;
      if (!act.tool) {
        return state;
      }
      return Object.assign({}, state, { selectedTool: act.tool });
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

