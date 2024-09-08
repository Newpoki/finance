type FieldErrorServerResponse = {
  type: "validation"
  message?: string
  fields: Array<{ path: string; message: string }>
}

type GenericServerResponse = {
  type: "generic"
  message?: string
}

type SuccessServerResponse<TResponse = object> = {
  type: "success"
  data: TResponse
}

export type ServerResponse<TResponse = void> =
  | FieldErrorServerResponse
  | GenericServerResponse
  | SuccessServerResponse<TResponse>
