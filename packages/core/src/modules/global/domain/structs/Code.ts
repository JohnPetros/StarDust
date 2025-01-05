import type { CodeInput } from '#global/types'
import type { ICodeRunnerProvider } from '#interfaces'

type CodeProps = {
  codeRunner: ICodeRunnerProvider
  value: string
}

export class Code {
  readonly codeRunner: ICodeRunnerProvider
  readonly value: string

  private constructor(props: CodeProps) {
    this.codeRunner = props.codeRunner
    this.value = props.value
  }

  static create(codeRunner: ICodeRunnerProvider, preCodeValue = ''): Code {
    return new Code({ codeRunner, value: preCodeValue })
  }

  async run() {
    return await this.codeRunner.run(this.value)
  }

  addInputs(inputs: CodeInput[]) {
    return this.changeValue(this.codeRunner.addInputs(inputs, this.value))
  }

  addFunction(functionName: string, functionParams: unknown[]) {
    return this.changeValue(
      this.codeRunner.addFunction(functionName, functionParams, this.value),
    )
  }

  changeValue(value: string) {
    return this.clone({ value: value })
  }

  translateToCodeRunner(jsCodeValue: unknown) {
    return this.codeRunner.translateToCodeRunner(JSON.stringify(jsCodeValue))
  }

  get inputsCount() {
    return this.codeRunner.getInputsCount(this.value)
  }

  get hasInput(): boolean {
    return !!this.codeRunner.getInput(this.value)
  }

  get firstInput(): string {
    return String(this.codeRunner.getInput(this.value))
  }

  private clone(props: Partial<CodeProps>) {
    return new Code({
      codeRunner: this.codeRunner,
      value: this.value,
      ...props,
    })
  }
}
