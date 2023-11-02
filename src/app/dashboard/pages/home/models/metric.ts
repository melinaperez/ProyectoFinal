import { Observable } from 'rxjs';

export interface Metric {
  quantity: Observable<number>;
  name: string;
  entity: string;
}
