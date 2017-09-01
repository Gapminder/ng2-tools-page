import * as fromTools from './tools/tools';
import * as fromLanguage from './language/language';
import { Language } from './language/language';
import * as fromLayout from './layout/layout';

import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface State {
  tools: fromTools.State
  language: fromLanguage.State,
  layout: fromLayout.State
}

export function reducers(): ActionReducerMap<State> {
  return {
    tools: fromTools.reducer,
    language: fromLanguage.reducer,
    layout: fromLayout.reducer
  };
}

export const getTools = (state: State) => state.tools;
export const getConfigChangeUID = createSelector(getTools, (toolsState: fromTools.State) => toolsState.configChangeUID);
export const getClient = createSelector(getTools, (toolsState: fromTools.State) => toolsState.client);
export const getToolItems = createSelector(getTools, (toolsState: fromTools.State) => toolsState.tools);
export const getSlugs = createSelector(getTools, (toolsState: fromTools.State) => toolsState.slugs);
export const getDefaultTool = createSelector(getTools, (toolsState: fromTools.State) => toolsState.defaultTool);
export const getToolToSlug = createSelector(getTools, (toolsState: fromTools.State) => toolsState.toolToSlug);
export const getInitialVizabiInstances = createSelector(getTools, (toolsState: fromTools.State) => toolsState.initialVizabiInstances);

export const getInitialToolsSetup = createSelector(
  getToolItems,
  getSlugs,
  getDefaultTool,
  getToolToSlug,
  getInitialVizabiInstances,
  (tools: any, slugs: any, defaultTool: any, toolToSlug: any, initialVizabiInstances: any) => {
    return {
      tools,
      slugs,
      defaultTool,
      toolToSlug,
      initialVizabiInstances
    };
  });

export const getSelectedTool = createSelector(getTools, (tools: fromTools.State) => tools.selectedTool);
export const getVizabiInstances = createSelector(getTools, (tools: any) => tools.vizabiInstances);
export const getCreatedTool = createSelector(getTools, (tools: any) => tools.createdTool);
export const getCreatedVizabiInstance = createSelector(getVizabiInstances, getCreatedTool, (instances: any, tool: string) => {
  return {
    tool,
    instance: instances[tool]
  }
});
export const getCurrentVizabiModelHash = createSelector(getTools, (tools: any) => tools.currentHashModel);

export const getToolItemsAsArray = createSelector(getToolItems, (tools: any) => {
  if (!tools) return [];

  return Object.keys(tools).reduce((result: any[], tool) => {
    result.push(tools[tool]);
    return result;
  }, [])
});

export const getRelatedItemsOfSelectedTool = createSelector(
  getToolItems,
  getSelectedTool,
  (tools: any, selectedTool: string) => {
    return tools[selectedTool] && tools[selectedTool].relateditems
  }
);

export const getLanguage = (state: State) => state.language;
export const getSelectedLanguage = createSelector(getLanguage, (language: fromLanguage.State) => language.lang);
export const getAllLanguages = createSelector(getLanguage, (language: fromLanguage.State) => language.allLangs);
export const getCurrentLocale = createSelector(getLanguage, (language: fromLanguage.State) => language.locale);
export const isRtl = createSelector(getSelectedLanguage, (lang: Language) => lang && lang.key === 'ar-SA');

export const getLayout = (state: State) => state.layout;
export const isLanguageSwitcherVisible = createSelector(getLayout, (layout: fromLayout.State) => layout.isLanguageSwitcherVisible);
export const getAllMenuItems = createSelector(getLayout, (layout: fromLayout.State) => layout.menuItems);
export const getSelectedMenuItem = createSelector(getLayout, (layout: fromLayout.State) => layout.selectedMenuItem);
export const isMobileMenuHidden = createSelector(getLayout, (layout: fromLayout.State) => layout.mobileMenuHidden);
export const isEmbeddedMode = createSelector(getLayout, (layout: fromLayout.State) => layout.embedded);
export const isFlashAvailable = createSelector(getLayout, (layout: fromLayout.State) => layout.isFlashAvailable);
