export class NotFoundLinkError extends Error {
  public readonly statusCode: number
  public readonly field: string
  public readonly value: string

  constructor(field: string, value: string) {
    super(`The value ${value} was not found in the system`)

    this.name = "NotFoundLinkError"

    this.statusCode = 404
    this.field = field
    this.value = value

    Object.setPrototypeOf(this, NotFoundLinkError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}