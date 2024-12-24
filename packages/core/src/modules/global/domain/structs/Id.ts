import { StringValidation } from '#libs'

export class Id {
  readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    new StringValidation(value, 'Id').id().validate()

    return new Id(value)
  }
}
