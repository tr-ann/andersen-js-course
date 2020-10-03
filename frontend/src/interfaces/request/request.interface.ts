import { IParam } from "./param.interface";

export interface IRequest {
  path: string;
  params: IParam[];
  queries: IParam[];
}