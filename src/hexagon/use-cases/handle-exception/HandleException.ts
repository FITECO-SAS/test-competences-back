import { HttpException } from "@hexagon/exceptions/http/HttpException"
import { LogProvider } from "@hexagon/gateways/LogProvider"


export interface ExecuteData {
  path: string
  controller: string
  action: string
  method: string
  query: Record<string, unknown>
  body: Record<string, unknown>
}

export class HandleException {
  public constructor(
    private readonly _logProvider: LogProvider,
  ) { }

  /**
   * Intercepte les erreurs et renvoie la réponse JSON.
   * @param data Données utile au log de l'erreur
   * @param processExecution Callback d'exécution de l'API
   */
  public async execute(data: ExecuteData, processExecution: () => Promise<void>) {
    try {
      await processExecution();
    } catch (error) {
      // BONUS : FRAISE
      const status = error instanceof HttpException ? error.status : 500;
      this._logProvider.error(`[${status}] → ${data.method.toUpperCase()} ${data.path} (${data.controller}.${data.action})`);

      if (error instanceof HttpException) {
        return this.returnHttpException(error);
      }

      return this.returnUnknownError(error);
    }
    return undefined;
  }

  private returnHttpException(exception: HttpException) {
    return {
      response: {
        status: exception.status,
        content: exception.getResponse(),
      },
      type: exception.type,
      className: exception.constructor.name,
      stackTrace: exception
    }
  }

  private returnUnknownError(error: unknown) {
    return {
      response: {
        status: 500,
        content: {
          message: 'Une erreur est survenue.',
          type: 'unknown_error',
        },
      },
      type: 'unknown_error',
      className: error instanceof Error ? error.name : typeof error,
      stackTrace: error instanceof Error ? JSON.stringify(error, undefined, 2) : undefined,
    }
  }
}
