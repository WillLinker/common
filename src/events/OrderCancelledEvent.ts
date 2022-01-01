import { Subjects } from './subjects';
import { OrderStatus } from './Types/OrderStatus';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    ticket: { id: string }
  };
}