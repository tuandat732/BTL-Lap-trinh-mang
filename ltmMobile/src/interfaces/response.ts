import { RESPONSE_STATUS } from '../consts';
import { IPagination } from './pagination';

export interface IResponse {
  code: RESPONSE_STATUS;
  status: number;
  message: string;
  data: any;
  pagination?: IPagination;
}
