import { Image, Logical, ShuffledList, Text, type UserAnswer } from '#global/structs'
import { Question } from '#lesson/abstracts'
import type { SelectionQuestionDto, QuestionDto } from '#lesson/dtos'

type SelectionQuestionProps = {
  options: ShuffledList<string>
  answer: string
  code?: string
}

export class SelectionQuestion extends Question<SelectionQuestionProps> {
  static create(dto: SelectionQuestionDto) {
    console.log(dto)
    return new SelectionQuestion(
      {
        type: 'selection',
        picture: Image.create(dto.picture),
        stem: Text.create(dto.stem),
        answer: dto.answer,
        code: dto.code,
        options: ShuffledList.create(dto.options),
      },
      dto.id,
    )
  }

  static canBeCreatedBy(question: QuestionDto): question is SelectionQuestionDto {
    return question.type === 'selection'
  }

  verifyUserAnswer(userAnswer: UserAnswer): Logical {
    return Logical.create(
      String(userAnswer.value).toLocaleLowerCase() === this.answer.toLocaleLowerCase(),
    )
  }

  get options() {
    return this.props.options.items
  }

  get answer() {
    return this.props.answer
  }

  get code() {
    return this.props.code ?? null
  }
}
