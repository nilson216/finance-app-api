import { execSync } from 'child_process'

async function init() {
    execSync('docker compose up -d --wait postgres-test') // execSync roda um comando no terminal de forma sincrona antes de continuar a execucao do codigo
    execSync('npx prisma db push')
}

export default init