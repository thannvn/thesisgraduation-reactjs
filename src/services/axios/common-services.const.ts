export const STATUS_OK = 200

export interface ApiTemplate {
    method: 'GET' | 'POST' | 'DELETE' | 'UPDATE',
    URL: string
}
