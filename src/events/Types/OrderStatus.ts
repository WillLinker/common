export enum OrderStatus {
  // when the order has been created, but the ticket it is trying to order has not been reserved
  Created = 'created',
  // The ticket the order is trying to reserve has already been reserved or when the user cancels the order, or expires.
  Cancelled = 'cancelled',
  // The orad has succesfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',
  // The order has reserved the ticket and the user ahas provided payment successfully
  Complete = 'complete'
}