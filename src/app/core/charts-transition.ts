export enum ChartSelectionType {Select, Show, Neither}

export enum TransitionType {FromSelectToShow, FromShowToSelect, FromNeither, ToNeither, NoChange}

export const getTransitionType = (oldChartTypeStr: string, currentChartTypeStr: string): TransitionType => {
  const oldChartType = CHART_TYPE[oldChartTypeStr];
  const currentChartType = CHART_TYPE[currentChartTypeStr];

  if (oldChartType === ChartSelectionType.Select && currentChartType === ChartSelectionType.Show) {
    return TransitionType.FromSelectToShow;
  }

  if (oldChartType === ChartSelectionType.Show && currentChartType === ChartSelectionType.Select) {
    return TransitionType.FromShowToSelect;
  }

  if (oldChartType === ChartSelectionType.Neither && currentChartType !== ChartSelectionType.Neither) {
    return TransitionType.FromNeither;
  }

  if (oldChartType !== ChartSelectionType.Neither && currentChartType === ChartSelectionType.Neither) {
    return TransitionType.ToNeither;
  }

  return TransitionType.NoChange;
};

export const CHART_TYPE = {
  bubbles: ChartSelectionType.Select,
  mountain: ChartSelectionType.Select,
  map: ChartSelectionType.Select,
  barrank: ChartSelectionType.Select,
  linechart: ChartSelectionType.Show,
  popbyage: ChartSelectionType.Neither
};
