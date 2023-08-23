export interface User {
    homepage:  string
    identity:  any
    isLoggedIn: boolean
    updateStorage: () => void
    login: (identity: any, permanent: boolean) => void
    logout: () => void
    hasPermission: (route: string) => boolean
}
