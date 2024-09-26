export class PaymentDto {
    card: {
        cardNumber: string
        cardholderName: string
        cardSecurityCode: string
        expiryMonth: string 
        expiryYear: string 
    }
    amount: number
    currency: string
}