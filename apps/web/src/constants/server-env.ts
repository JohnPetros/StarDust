import { StringValidation } from '@stardust/core/libs'

const SERVER_ENV = {
  inngestSigningKey: process.env.INNGEST_SIGNING_KEY,
  inngestEventKey: process.env.INNGEST_EVENT_KEY,
}

new StringValidation(SERVER_ENV.inngestSigningKey, 'Inmgest Signing Key').validate()
new StringValidation(SERVER_ENV.inngestEventKey, 'Inmgest Event Key').validate()

export { SERVER_ENV }
