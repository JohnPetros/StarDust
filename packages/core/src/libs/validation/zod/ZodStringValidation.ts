import { type ZodEnum, ZodError, z, type ZodString } from 'zod'

import type { IStringValidation } from '#interfaces'
import { ZodValidationErrorFactory } from './ZodValidationErrorFactory'

export class ZodStringValidation implements IStringValidation {
  private data: unknown
  private key: string
  private zodString: ZodString
  private zodEnum: ZodEnum<[string]> | undefined

  constructor(data: unknown, key?: string, message?: string) {
    this.data = data
    this.key = key ?? ''
    this.zodString = z.string({
      required_error: message ?? `${this.key} should be a string`,
    })
  }

  min(minValue: number, message?: string) {
    this.zodString = this.zodString.min(
      minValue,
      message ?? `${this.key} value must have at least ${minValue} characters`,
    )
    return this
  }

  id(message?: string) {
    this.zodString = this.zodString.uuid(
      message ?? `${this.key} value must be a valid uuid`,
    )

    return this
  }

  email(message?: string) {
    this.zodString = this.zodString.email(
      message ?? 'E-mail value must be a valid format',
    )
    return this
  }

  url(message?: string) {
    this.zodString = this.zodString.url(
      message ?? `${this.key} value must be a valid url`,
    )
    return this
  }

  image(message?: string) {
    const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg']

    this.zodEnum = z.enum(extensions as [string], {
      message:
        message ??
        `${this.key} value must be have one of the extensions: ${extensions.join(', ')}`,
    })

    this.data = String(this.data).slice(-4)

    return this
  }

  oneOf(strings: string[], message?: string) {
    this.zodEnum = z.enum(strings as [string], {
      message:
        message ??
        `${this.key} value must be one of the following values: ${strings.slice(3).join(', ')}...`,
    })

    return this
  }

  validate() {
    try {
      const key = this.key ?? 'erro'
      if (this.zodEnum) {
        z.object({ [key]: this.zodEnum }).parse({ [key]: this.data })
      }

      z.object({ [key]: this.zodString }).parse({ [key]: this.data })
    } catch (error) {
      if (error instanceof ZodError) throw ZodValidationErrorFactory.produce(error)
    }
  }
}
