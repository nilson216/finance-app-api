import { PostgresHelper } from '../../db/helper.js'

// Classe responsável por atualizar um usuário no banco de dados
export class PostgresUpdateUserRepository {
    async execute(userId, updateParams) {
       // Arrays que vão guardar os campos a serem atualizados e seus valores
       const updateFields = [] // exemplo final: ["first_name = $1", "last_name = $2"]
       const updateValues = [] // exemplo final: ["Nilson", "Hoffmann"]
       
       // Percorre as chaves do objeto updateParams (ex: { first_name: 'Nilson', last_name: 'Hoffmann' })
       Object.keys(updateParams).forEach((key) => {
            // Adiciona no array a string "coluna = $posição"
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            // Adiciona o valor correspondente (ex: 'Nilson', 'Hoffmann')
            updateValues.push(updateParams[key])
        })

        // No final, adiciona o userId para usar no WHERE
        updateValues.push(userId)

        // Monta a query dinamicamente
        const updateQuery = `
            UPDATE users 
            SET ${updateFields.join(', ')}   -- gera algo tipo: "first_name = $1, last_name = $2"
            WHERE id = $${updateValues.length} -- garante que o último valor seja o userId
            RETURNING *  -- retorna o usuário atualizado
        `

        // Executa a query no banco de dados
        const updateUser = await PostgresHelper.query(
            updateQuery,
            updateValues
        )

        // Retorna o usuário atualizado (primeira linha do resultado)
        return updateUser[0]
    }
}
