import type { IEvent } from '#interfaces'

type Payload = {
  firstTierId: string
}

export class FirstTierReachedEvent implements IEvent<Payload> {
  static readonly NAME = 'ranking/first.tier.reached'
  constructor(readonly payload: Payload) {}

  get name() {
    return FirstTierReachedEvent.NAME
  }
}
