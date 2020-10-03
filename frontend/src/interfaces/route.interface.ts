export interface IRoute {
  path: string;
  re: RegExp;
  method: Function;
}
