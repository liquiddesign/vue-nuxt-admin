import type {Reactive} from 'vue';
import {apiFetch} from '~/utils/apiFetch';

export interface Identity {
    permissions?: string[];
    [key: string]: any;
}

export enum AuthorizationLevel {
    Public = 'public',
    Authenticated = 'authenticated',
    SuperAdmin = 'superAdmin',
}

export interface Settings {
    defaultOnPage: number;
    defaultLang: string;
    defaultCurrency: string;
    currencies: string[];
    langs: string[];
    maxUploads: number;
    maxFilesize: number;
}

const defaultSettings: Settings = {
    defaultOnPage: 10,
    defaultLang: 'cs',
    langs: ['cs', 'en'],
    defaultCurrency: 'CZK',
    currencies: ['CZK'],
    maxUploads: 10,
    maxFilesize: 2 * 1024 * 1024,
};

export enum LogoutReason {
    MANUAL = 'MANUAL',
    TIMEOUT = 'TIMEOUT',
    ERROR = 'ERROR',
}


export class User {
    homepage: string = 'dashboards';
    identity: Identity = {};
    settings: Settings = { ...defaultSettings };
    isLoggedIn: boolean = false;
    logoutReason?: LogoutReason;
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.restoreFromStorage();
    }

    updateStorage(): void {
        const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(this));
    }

    login(identity: Identity, permanent: boolean = false): void {
        Object.assign(this.identity, identity);
        this.settings = identity.settings || defaultSettings;
        this.isLoggedIn = true;

        const storage = permanent ? localStorage : sessionStorage;
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        storage.setItem('user', JSON.stringify(this));
    }

    async logout(logoutReason = LogoutReason.MANUAL): Promise<any> {
        const result = await apiFetch('auth/sign-out', {method: 'POST'});

        this.isLoggedIn = false;
        this.logoutReason = logoutReason;
        Object.keys(this.identity).forEach((key) => delete this.identity[key]);
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');

        return result;
    }

    hasPermission(route: string): boolean {
        return (this.identity?.permissions && this.identity.permissions.includes(route)) || this.isSuperAdmin();
    }

    isSuperAdmin(): boolean {
        return this.identity?.admin;
    }

    private restoreFromStorage(): void {
        const restoreUser = (storage: Storage): void => {
            const storedUser = storage.getItem('user');
            if (!storedUser) { return; }

            try {
                const parsedUser: Partial<User> = JSON.parse(storedUser);
                Object.assign(this.identity, parsedUser.identity);
                this.isLoggedIn = !!parsedUser.isLoggedIn;
                this.settings = parsedUser.settings || defaultSettings;
            } catch {
                console.error('Invalid user data in storage');
            }
        };

        if (localStorage.getItem('user')) {
            restoreUser(localStorage);
        } else if (sessionStorage.getItem('user')) {
            restoreUser(sessionStorage);
        }
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const user:Reactive<User> = reactive(new User(config.public.baseURL));

    return {
        provide: {
            user,
        },
    };
});
