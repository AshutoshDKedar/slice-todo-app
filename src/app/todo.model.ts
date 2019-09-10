/**
 * The Todo Model
 */
export class Todo {
  gid: string;
  constructor(public title: string, public completed:boolean ) {}
};

/**
 * The Slice Keys
 */
export const enum TodoSliceEnum {
  COMPLETE = "Complete",
  INCOMPLETE = "Incomplete"
}
