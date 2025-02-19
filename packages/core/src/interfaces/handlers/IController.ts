import type { ApiResponse } from '#responses'
import type { HttpSchema, IHttp } from './IHttp'

export interface IController<ControllerHttpSchema extends HttpSchema = HttpSchema> {
  handle(http: IHttp<ControllerHttpSchema>): Promise<ApiResponse>
}
