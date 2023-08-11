enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface IProduct {
  id: string
  name: string
  category: string
  image: string
  price: number
  priceWithDiscount: number
}

export interface IUser {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  passwordHashed: string
  image: string | null
  role: Role
  reservationsIds: string[]
}
