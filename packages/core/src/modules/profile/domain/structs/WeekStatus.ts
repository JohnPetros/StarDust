import { AppError, ValidationError } from '#global/errors'
import { Logical } from '#global/structs'
import { Datetime, NumberValidation, StringValidation } from '#libs'
import type { WeekdayStatus, WeekStatusValue } from '../types'
export class WeekStatus {
  static readonly DEFAULT_WEEK_STATUS: WeekStatusValue = [
    'todo',
    'todo',
    'todo',
    'todo',
    'todo',
    'todo',
    'todo',
  ]
  static readonly DAYS: string[] = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

  private constructor(readonly value: WeekStatusValue) {}

  static create(values?: string[]) {
    if (!values) {
      return new WeekStatus(WeekStatus.DEFAULT_WEEK_STATUS)
    }

    if (!WeekStatus.isStatus(values)) {
      throw new ValidationError([
        { name: 'week-status', messages: ['Weekday Statuses are not valid'] },
      ])
    }

    new NumberValidation(values.length, 'Weekday Statuses count')
      .equal(WeekStatus.DAYS.length)
      .validate()

    return new WeekStatus(values)
  }

  static isStatus(values: string[]): values is WeekStatusValue {
    for (const value of values) {
      new StringValidation(value, 'Weekday Status')
        .oneOf(['todo', 'undone', 'done'])
        .validate()
    }

    return true
  }

  updateTodayStatus(newStatus: WeekdayStatus): WeekStatus {
    const todayIndex = new Datetime().getTodayIndex()

    return new WeekStatus(
      this.value.map((status, index) =>
        index === todayIndex ? newStatus : status,
      ) as WeekStatusValue,
    )
  }

  get todayStatus(): WeekdayStatus {
    const todayIndex = new Datetime().getTodayIndex()
    const todayStatus = this.value[todayIndex]
    if (!todayStatus) throw new AppError('Nenhum status semanal')
    return todayStatus
  }

  get isTodayDone(): Logical {
    return Logical.create(this.todayStatus === 'done')
  }
}
