export const badRequest = (body) => ({
        statusCode: 400,
        body,
})

export const created = (body) => ({
        statusCode: 201,
        body,
})

export const serverError = () => ({
        statusCode: 500,
        body: {
            message: 'Internal server error',
        },  
})
// forma de return direto com () => ({})
export const ok = (body) => ({
        statusCode: 200,
        body,
});