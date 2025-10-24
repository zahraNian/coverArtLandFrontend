// Generic API module for Next.js — works on server and client.
// TypeScript. No external deps required.

type Json = Record<string, any> | null

export class ApiError extends Error {
    public status: number
    public data: Json

    constructor(message: string, status = 500, data: Json = null) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
    }
}

/**
 * Options for a single request
 */
export interface RequestOptions extends RequestInit {
    // whether to include auth token (if available)
    withAuth?: boolean
    // number of automatic retries on network failure or 5xx
    retries?: number
    // timeout in ms
    timeout?: number
    // if provided, this function returns an auth token (server or client)
    getToken?: () => string | null | Promise<string | null>
    // baseUrl override
    baseUrl?: string
}

/**
 * Default environment base URL (change accordingly)
 * In Next you can use process.env.NEXT_PUBLIC_API_BASE or similar.
 */
const DEFAULT_BASE = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE
    ? process.env.NEXT_PUBLIC_API_BASE
    : ''

/**
 * Helper: parse JSON safely
 */
async function parseJsonSafe(res: Response) {
    const text = await res.text()
    try {
        return text ? JSON.parse(text) : null
    } catch {
        return text
    }
}

/**
 * Base API service — use this class for making requests.
 * It's independent of any framework, but accepts getToken to support SSR.
 */
export class BaseApiService {
    protected baseUrl: string
    protected defaultHeaders: Record<string, string>

    constructor(opts?: { baseUrl?: string; defaultHeaders?: Record<string, string> }) {
        this.baseUrl = opts?.baseUrl ?? DEFAULT_BASE
        this.defaultHeaders = opts?.defaultHeaders ?? { 'Content-Type': 'application/json' }
    }

    /**
     * Low-level request method used by convenience helpers.
     * - path: relative path or absolute url
     * - options: RequestOptions
     */
    async request<T = any>(path: string, options: RequestOptions = {}): Promise<T> {
        const {
            withAuth = false,
            retries = 0,
            timeout = 0,
            getToken,
            baseUrl,
            ...fetchOpts
        } = options

        // decide URL
        const url = path.startsWith('http') ? path : `${baseUrl ?? this.baseUrl}${path}`

        // headers merge
        const headers: Record<string, string> = {
            ...(this.defaultHeaders ?? {}),
            ...(fetchOpts.headers ? (fetchOpts.headers as Record<string, string>) : {}),
        }

        // attach token if needed and available
        if (withAuth) {
            let token: string | null = null
            if (getToken) {
                token = await Promise.resolve(getToken())
            } else {
                // default client-side token retrieval (localStorage)
                if (typeof window !== 'undefined') {
                    try {
                        token = localStorage.getItem('token')
                    } catch {
                        token = null
                    }
                }
            }
            if (token) headers['Authorization'] = `Bearer ${token}`
        }

        // prepare body
        if (fetchOpts.body && typeof fetchOpts.body !== 'string' && !(fetchOpts.body instanceof FormData)) {
            fetchOpts.body = JSON.stringify(fetchOpts.body)
        }

        // retry loop
        let attempt = 0
        const maxAttempts = Math.max(1, retries + 1)

        while (attempt < maxAttempts) {
            attempt++
            const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined
            const signal = controller?.signal

            if (timeout && controller) {
                setTimeout(() => controller.abort(), timeout)
            }

            try {
                const res = await fetch(url, {
                    ...fetchOpts,
                    headers,
                    signal,
                } as RequestInit)

                const contentType = res.headers.get('content-type') ?? ''
                const data = contentType.includes('application/json') ? await parseJsonSafe(res) : await parseJsonSafe(res)

                if (!res.ok) {
                    // 401 special case: rethrow with status
                    const message = (data && (data.message || data.error || JSON.stringify(data))) ?? res.statusText
                    throw new ApiError(message, res.status, data)
                }

                return data as T
            } catch (err: any) {
                console.error(err);
                // network error or ApiError
                const isNetwork = err instanceof TypeError || err.name === 'AbortError'
                const status = err instanceof ApiError ? err.status : 0

                // if exceeded attempts, throw
                if (attempt >= maxAttempts) {
                    if (err instanceof ApiError) throw err
                    if (isNetwork) throw new ApiError('Network error or request aborted', 0, null)
                    // unknown error
                    throw new ApiError(err?.message ?? 'Unknown error', status || 500, err?.data ?? null)
                }

                // retry only on network errors or 5xx
                if (!isNetwork && !(status >= 500 && status < 600)) {
                    // non-retriable error — rethrow
                    throw err
                }

                // otherwise wait exponential backoff (simple)
                await new Promise((r) => setTimeout(r, 200 * Math.pow(2, attempt - 1)))
                continue
            }
        }

        // should never reach
        throw new ApiError('Request failed', 500)
    }

    // Convenience helpers
    get<T = any>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) {
        return this.request<T>(path, { method: 'GET', ...opts })
    }
    post<T = any>(path: string, body?: any, opts?: Omit<RequestOptions, 'method' | 'body'>) {
        return this.request<T>(path, { method: 'POST', body, ...opts })
    }
    put<T = any>(path: string, body?: any, opts?: Omit<RequestOptions, 'method' | 'body'>) {
        return this.request<T>(path, { method: 'PUT', body, ...opts })
    }
    patch<T = any>(path: string, body?: any, opts?: Omit<RequestOptions, 'method' | 'body'>) {
        return this.request<T>(path, { method: 'PATCH', body, ...opts })
    }
    delete<T = any>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) {
        return this.request<T>(path, { method: 'DELETE', ...opts })
    }
}

/**
 * PaginatedApiService example
 * - provides helper to request paginated endpoints with `limit` and `page` (or `index`)
 */
export class PaginatedApiService extends BaseApiService {
    async list<T = any>(path: string, params?: { page?: number; limit?: number;[k: string]: any }, opts?: RequestOptions) {
        const qp = new URLSearchParams()
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null) qp.set(k, String(v))
            })
        }
        const suffix = qp.toString() ? `?${qp.toString()}` : ''
        return this.get<{ data: T[]; meta?: any }>(`${path}${suffix}`, opts)
    }
}

/**
 * Helper factory for client usage (reads token from localStorage by default)
 */
export function createApiClient(opts?: { baseUrl?: string; defaultHeaders?: Record<string, string> }) {
    const client = new BaseApiService(opts)

    // wrap with getToken that reads localStorage
    const withAuth = {
        getToken: () => {
            if (typeof window === 'undefined') return null
            try {
                return localStorage.getItem('token')
            } catch {
                return null
            }
        },
    }

    return {
        raw: client,
        withAuth: {
            get: <T = any>(path: string, o?: Omit<RequestOptions, 'method' | 'body'>) => client.get<T>(path, { ...withAuth, ...o }),
            post: <T = any>(path: string, body?: any, o?: Omit<RequestOptions, 'method' | 'body'>) => client.post<T>(path, body, { ...withAuth, ...o }),
            put: <T = any>(path: string, body?: any, o?: Omit<RequestOptions, 'method' | 'body'>) => client.put<T>(path, body, { ...withAuth, ...o }),
            delete: <T = any>(path: string, o?: Omit<RequestOptions, 'method' | 'body'>) => client.delete<T>(path, { ...withAuth, ...o }),
        },
    }
}

/**
 * Server helper examples:
 *
 * For Next 13+ app dir Route Handlers (server): you can pass a getToken that reads from cookies:
 *
 * import { cookies } from 'next/headers'
 * const serverGetToken = () => cookies().get('token')?.value ?? null
 *
 * const svc = new BaseApiService({ baseUrl: process.env.API_BASE })
 * svc.get('/user/me', { withAuth: true, getToken: serverGetToken })
 *
 * For getServerSideProps (pages dir): you can parse cookie from ctx.req.headers.cookie
 */

// Client-only hook moved to src/lib/useApi.ts to keep this module SSR-safe.



// usage

// // pages or components (client)
// import { createApiClient } from '@/lib/api/'

// const api = createApiClient({ baseUrl: '/api' })

// // without auth
// const posts = await api.raw.get('/posts')

// // with auth (token from localStorage)
// const profile = await api.withAuth.get('/user/me')



// app/api/some/route/route.ts (server)
// import { BaseApiService } from '@/lib/api/'
// import { cookies } from 'next/headers'

// const serverGetToken = () => cookies().get('token')?.value ?? null

// const svc = new BaseApiService({ baseUrl: process.env.API_BASE })

// export async function GET() {
//     try {
//         const me = await svc.get('/user/me', { withAuth: true, getToken: serverGetToken })
//         return new Response(JSON.stringify(me), { status: 200 })
//     } catch (err) {
//         // handle or rethrow
//         return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'error' }), { status: 500 })
//     }
// }


// with hook
// import { useApi } from '@/lib/api'

// function Posts() {
//     const { data, loading, error, refetch } = useApi('/api/posts')

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error: { error.message } </p>

//     return <pre>{ JSON.stringify(data, null, 2) } </pre>
// }