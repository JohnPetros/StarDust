import { ValidationError } from '../../global/errors'

export class InvalidRewardingPayloadError extends ValidationError {
  constructor() {
    super([
      {
        name: 'rewarding-payload',
        messages: ['Dados inválidos para o cálculo de recompensas'],
      },
    ])
  }
}
