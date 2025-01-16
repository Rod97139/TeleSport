export interface Score {
  name: string,
  value: number,
  extra: string
}

export interface LineChartData {
  name: string,
  series: Score[],
  totalMedals: number,
  totalAthletes: number
}
