import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIfAmountIsValid = (amount) => {
      if (typeof amount !== 'number') {
    return false
  }
    return validator.isCurrency(
                    amount.toFixed(2),
                    {
                        digits_after_decimal: [2],
                        allow_negatives: false,
                        decimal_separator: '.',
                    },
                );
}
     


export const checkIfTypeIsValid = (type) => {// sem chaves e um return direto
  return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(
                type,
)
}
export const invalidAmountResponse = () => {
   return badRequest({
        message: 'Amount must be a valid currency format',
    })
}

    export const invalidTypeResponse = () => {
      return  badRequest({
                    message:
                        'Type must be one of the following: EARNING, EXPENSE, INVESTIMENT',
                });
            }

            export const transactionNotFoundResponse = () => {
             return notFound({message: 'Transaction not found.'})
            }

    
