import type { IPlaygroundService, IUseCase } from '#interfaces'
import { Snippet } from '#playground/entities'

type Request = {
  snippetId: string
  snippetTitle?: string
  snippetCode?: string
}

export class EditSnippetUseCase implements IUseCase<Request> {
  constructor(private readonly playgroundService: IPlaygroundService) {}

  async do({ snippetId, snippetTitle, snippetCode }: Request) {
    const snippet = await this.fetchSnippet(snippetId)
    if (snippetTitle) snippet.title = snippetTitle
    if (snippetCode) snippet.code = snippetCode

    await this.updateSnippet(snippet)
    return snippet.dto
  }

  private async fetchSnippet(snippetId: string) {
    const response = await this.playgroundService.fetchSnippetById(snippetId)
    if (response.isFailure) response.throwError()
    return Snippet.create(response.body)
  }

  private async updateSnippet(snippet: Snippet) {
    const response = await this.playgroundService.updateSnippet(snippet)
    if (response.isFailure) response.throwError()
  }
}
