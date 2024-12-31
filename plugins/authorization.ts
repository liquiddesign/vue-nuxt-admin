export interface Identity {
    permissions?: Record<string, boolean>;
    [key: string]: any;
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

export class User {
    homepage: string = 'dashboards';
    identity: Identity = {};
    settings: Settings = { ...defaultSettings };
    isLoggedIn: boolean = false;
    private config: any;

    constructor(config: any) {
        this.config = config;
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

    logout(): void {
        Object.keys(this.identity).forEach((key) => delete this.identity[key]);
        this.isLoggedIn = false;

        sessionStorage.removeItem('user');
        localStorage.removeItem('user');

        $fetch(`${this.config.public.baseURL}auth/sign-out`, { method: 'POST' });
    }

    hasPermission(route: string): boolean {
        //return !!this.identity?.permissions?.[route];
        return true;
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

    const user = reactive(new User(config));

    return {
        provide: {
            user,
        },
    };
});
