import nats, { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event { subject: Subjects, data: any };

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
//  abstract onMessage(data: T['data'], msg:Message): void
  private client:Stan;
  protected ackWait = (5 * 1000); // Default to 5 seconds.

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']):Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`[base-publisher] publish("${JSON.stringify(data)}")  Subject: ${this.subject}`);
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if(err) {
          return reject(err);
        }
        console.log("[base-publisher]    Event published!");

        resolve();
      });
    });

  };
}
