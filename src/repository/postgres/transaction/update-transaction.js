import { PostgresHelper } from '../../../db/postgres/helper.js';

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const updateFields = []; // exemplo final: ["first_name = $1", "last_name = $2"]
        const updateValues = []; // exemplo final: ["Nilson", "Hoffmann"]

        // Percorre as chaves do objeto updateTransactionParams (ex: { first_name: 'Nilson', last_name: 'Hoffmann' })
        Object.keys(updateTransactionParams).forEach((key) => {
            // Adiciona no array a string "coluna = $posição"
            updateFields.push(`${key} = $${updateValues.length + 1}`);
            // Adiciona o valor correspondente (ex: 'Nilson', 'Hoffmann')
            updateValues.push(updateTransactionParams[key]);
        });

        // No final, adiciona o transactionId para usar no WHERE
        updateValues.push(transactionId);

        // Monta a query dinamicamente
        const updateQuery = `
                    UPDATE transactions 
                    SET ${updateFields.join(', ')} 
                    WHERE id = $${updateValues.length} 
                    RETURNING *
                `;

        // Executa a query no banco de dados
        const updateUser = await PostgresHelper.query(
            updateQuery,
            updateValues,
        );

        // Retorna o usuário atualizado (primeira linha do resultado)
        return updateUser[0];
    }
}
