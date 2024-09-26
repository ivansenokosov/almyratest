export interface IPayment {
    card: {
        cardNumber: string
        cardholderName: string
        cardSecurityCode: string | number
        expiryMonth: string | number
        expiryYear: string | number
    }
    amount: number
    currency: string
}