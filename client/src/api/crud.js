import { useCallback } from 'react'

export const CRUD = () => {
    const POST = useCallback(async (url, body = null, method = 'POST', headers = {}) => {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            await fetch(url, { body, method, headers })
    }, [])

    const PUT = useCallback(async (url, body = null, method = 'PUT', headers = {}) => {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            await fetch(url, { body, method, headers })
    }, [])

    const DELETE = useCallback(async (url, body = null, method = 'DELETE', headers = {}) => {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            await fetch(url, { method, body, headers })
    }, [])

    const GET = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            await response.json()
    }, [])

    return { POST, PUT, DELETE, GET }
}