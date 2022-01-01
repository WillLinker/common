import { Subjects } from './subjects';
import { OrderStatus } from './Types/OrderStatus';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    ticket: { id: string }
  };
}