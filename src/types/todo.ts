export default interface TodoI {
  title: string;
  body: string;
  isComplete: boolean;
  createDate: Date;
  completeDate?: Date;
  id?: string | number;
}
