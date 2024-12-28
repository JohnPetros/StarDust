import type { CodeInput } from '#global/types'
import type { CodeRunnerResponse } from '#responses'

export interface ICodeRunnerProvider {
  run(codeValue: string, shouldReturnLog: boolean): Promise<CodeRunnerResponse>
  addInputs(codeInput: CodeInput, codeValue: string): string
  addFunction(functionName: string, functionParams: unknown[], codeValue: string): string
  getInput(codeValue: string): string | null
  getInputsCount(codeValue: string): number
}
