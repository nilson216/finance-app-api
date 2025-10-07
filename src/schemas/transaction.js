import { z } from 'zod';
import validator from 'validator';

export const createTransactionSchema = z.object({
  user_id: z.string({
    required_error: 'User ID is required.',
  }).uuid({ message: 'Invalid user ID' }),
  name: z.string({ required_error: 'Name is required.' })
         .trim()
         .nonempty({ message: 'Name is required.' }),
  date: z.string({
    required_error: 'Date is required.',
  }).datetime({
    invalid_type_error: 'Date must be a valid date.',
  }),
  type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT'], {
    required_error: 'Type is required.',
    errorMap: () => ({
        message: "Type must be EXPENSE, EARNING or INVESTMENT."
    })
  }),
  amount: z.number({
    required_error: 'Amount is required.',
    invalid_type_error: 'Amount must be a number.',
  })
           .min(1, { message: 'Amount must be greater than 0.' })
           .refine((value) => 
             validator.isCurrency(value.toFixed(2), {
               digits_after_decimal: [2],
               allow_negatives: false,
               decimal_separator: '.'
             }),
             { message: 'Amount must be a valid currency greater than 0.' }
           )
});
