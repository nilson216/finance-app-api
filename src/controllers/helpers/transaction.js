import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(
                    amount.amount.toString(),
                    {
                        digits_after_decimal: [2],
                        allow_negatives: false,
                        decimal_separator: '.',
                    },
                );
}
     


export const checkIfTypeIsValid = (type) => {// sem chaves e um return direto
  ['EARNINGS', 'EXPENSE', 'INVESTIMENT'].includes(
                type,
)
}
export const invalidAmountResponse = () => {
    badRequest({
        message: 'Amount must be a valid currency format',
    })
}

    export const invalidTypeResponse = () => {
        badRequest({
                    message:
                        'Type must be one of the following: EARNINGS, EXPENSE, INVESTIMENT',
                });
            }


    
