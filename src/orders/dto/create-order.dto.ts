interface Product {
  id: number
  volume: number
}

export class CreateOrderDto {
  readonly userId: number | null
  readonly registrationDate: string
  readonly customerEmail: string
  readonly status: string
  readonly address: string
  readonly products: Product[]
  readonly price: number
}
