type FieldErrorServerResponse = {
  type: "validation"
  message?: string
  fields: Array<{ path: string; message: string }>
}

type GenericServerResponse = {
  type: "generic"
  message?: string
}

type SuccessServerResponse<TData = null> = {
  type: "success"
  data: TData
}

export type ServerResponse<TData = null> =
  | FieldErrorServerResponse
  | GenericServerResponse
  | SuccessServerResponse<TData>
