export enum VISIBILITY_FILTER {
  SHOW_COMPLETED = 'Completed',
  SHOW_ACTIVE = 'Active',
  SHOW_ALL = 'All'
}

export function VISIBILITY_FILTER_VALUES():string[] {
  return Object.keys(VISIBILITY_FILTER).map(k => VISIBILITY_FILTER[k]);
}

export const ACTIVE_FILTER_KEY:string = "ACTIVE_FILTER_KEY";