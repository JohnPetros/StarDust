import { Logical } from '#global/structs'

type QuestionAnswerProps = {
  isCorrect: Logical
  isVerified: Logical
  value: unknown
}

export class UserAnswer {
  readonly isCorrect: Logical
  readonly isVerified: Logical
  readonly value: unknown

  constructor(props: QuestionAnswerProps) {
    this.isCorrect = props.isCorrect
    this.isVerified = props.isVerified
    this.value = props.value
  }

  static create(value: unknown = null) {
    return new UserAnswer({
      isCorrect: Logical.create(false),
      isVerified: Logical.create(false),
      value,
    })
  }

  makeVerified() {
    return this.clone({ isVerified: this.isVerified.invertValue() })
  }

  makeCorrect() {
    return this.clone({ isCorrect: this.isCorrect.makeTrue() })
  }

  makeIncorrect() {
    return this.clone({ isCorrect: this.isCorrect.makeFalse() })
  }

  changeAnswerValue(answerValue: unknown) {
    return this.clone({ value: answerValue })
  }

  get isAnswered() {
    return Logical.create(Boolean(this.value))
  }

  private clone(props?: Partial<QuestionAnswerProps>) {
    return new UserAnswer({
      isCorrect: this.isCorrect,
      isVerified: this.isVerified,
      value: this.value,
      ...props,
    })
  }
}
