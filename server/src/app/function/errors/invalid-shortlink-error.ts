export class InvalidShortLinkError extends Error {
	public readonly statusCode: number
	public readonly field: string
	public readonly value: string

	constructor(field: string, value: string) {
		super(`Invalid value for ${field}: ${value}`)
		this.name = "InvalidShortLinkError"
		this.statusCode = 422
		this.field = field
		this.value = value
		Object.setPrototypeOf(this, InvalidShortLinkError.prototype)
		Error.captureStackTrace(this, this.constructor)
	}
}
