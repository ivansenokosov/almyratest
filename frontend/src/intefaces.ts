export interface IPayment {
    card: {
        cardNumber: string
        cardholderName: string
        cardSecurityCode: string | number
        expiryMonth: string
        expiryYear: string | number
    }
    amount: string | number 
    currency: string
    paymentType: string
    paymentMethod: string
}