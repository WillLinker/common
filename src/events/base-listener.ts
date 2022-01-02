import nats, { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg:Message): void
  protected client:Stan;
  protected ackWait = (5 * 1000); // Default to 5 seconds.

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client.subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setAckWait(this.ackWait)
    .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
    console.log(`[base-listener] Subscribed to Subject: "${this.subject}" with Queue Group: "${this.queueGroupName}"`);

    subscription.on('message', (msg: Message) => {
      const messageDate = msg.getTimestamp();
      //console.log(`[Received Message:] Subject: "${msg.getSubject()}", Queue Group: "${this.queueGroupName}", Seq:${msg.getSequence()}`);
      const parsed = this.parseMessage(msg);
      try {
        this.onMessage(parsed, msg);
      }
      catch(err)
      {
        console.error(`[base-listener:onMessage] Caugh Error:`, err);
      }
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return JSON.parse(typeof data === 'string' ? data : data.toString('utf-8'));
  }
}
