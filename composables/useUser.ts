import {computed} from 'vue';
import {apiFetch} from '~/utils/apiFetch';
import CryptoJS from 'crypto-js';

export enum LogoutReason {
    MANUAL = 'manual',
    TIMEOUT = 'timeout',
    FORCED = 'forced',
}

export interface Identity {
    uuid: string
    permissions?: string[];
    name: string | null,
    surname: string | null,
    nickname: string | null,
    role: string | null,
    admin: boolean,
    homepage: string,
    settings: Settings | null,
    account: {
        uuid: string,
        login: string,
        password: string,
    };
}

export enum AuthorizationLevel {
    Public = 'public',
    Authenticated = 'authenticated',
    SuperAdmin = 'superAdmin',
}

type AuthStatusResponse = {
    result: {
        isLoggedIn: boolean;
        identity: Identity;
        csrfToken: string;
    };
};

export interface Settings {
    database: string;
    homepage: string;
    interactivePermissions: boolean;
    defaultWeightUnit: string;
    defaultOnPage: number;
    defaultLang: string;
    defaultCurrency: string;
    availableDatabases: string[];
    currencies: string[];
    langs: string[];
    maxUploads: number;
    maxFilesize: number;
}

const defaultSettings: Settings = {
    database: 'abel',
    homepage: 'dashboards',
    interactivePermissions: true,
    defaultWeightUnit: 'g',
    defaultOnPage: 10,
    defaultLang: 'cs',
    langs: ['cs', 'en'],
    availableDatabases: ['abel', 'levior', 'flumasys', 'finnsub'],
    defaultCurrency: 'CZK',
    currencies: ['CZK', 'EUR'],
    maxUploads: 10,
    maxFilesize: 2 * 1024 * 1024,
};



const accessToken = ref<string | null>(localStorage.getItem('cachedAccessToken'));
const logoutReason = ref<string | null>(null);
const identity:Ref<Identity | null> = ref<Identity | null>(null);
const settings:Ref<Settings> = ref<Settings>(defaultSettings);

if (localStorage.getItem('cachedAccessToken')) {
    accessToken.value = localStorage.getItem('cachedAccessToken');
}

const cachedIdentity = localStorage.getItem('cachedIdentity');
if (cachedIdentity !== null) {
    identity.value = <Identity>JSON.parse(cachedIdentity);
    settings.value = Object.assign(defaultSettings, identity.value.settings);
}

const storeSettings = (data: Settings) => {
    settings.value = Object.assign(settings.value, data);
};

const generateCsfrToken = (endpoint: string) => {
    const currentTime = Math.floor(Date.now() / 300000) * 300000; // Zakrouhlení na 5 minut
    const dataToHash = `${accessToken.value}:${currentTime}:${endpoint}`;

    const hmac = CryptoJS.HmacSHA256(dataToHash, accessToken.value ?? '');

    return hmac.toString(CryptoJS.enc.Hex);
};

const login = (loggedIdentity: Identity, loggedAccessToken: string): void => {
    logoutReason.value = null;
    identity.value = loggedIdentity;
    settings.value = Object.assign(defaultSettings, identity.value.settings);
    accessToken.value = loggedAccessToken;
    localStorage.setItem('cachedIdentity', JSON.stringify(identity.value));
    localStorage.setItem('cachedAccessToken',  accessToken.value);
};

const reload = async () => {
    console.log('reloading user');

    const data = await apiFetch<AuthStatusResponse>('auth/status');
    if (data && data.result?.isLoggedIn) {
        login(data.result.identity, data.result.csrfToken);
    }
};

const logout = async (currentLogoutReason: LogoutReason = LogoutReason.MANUAL): Promise<void> => {
    await apiFetch('auth/sign-out', {method: 'POST'});
    identity.value = null;
    accessToken.value = null;
    settings.value = defaultSettings;
    localStorage.removeItem('cachedIdentity');
    localStorage.removeItem('cachedAccessToken');
    logoutReason.value = currentLogoutReason;
};

const hasPermission = (route: string): boolean => {
    return !!((identity.value && identity.value.permissions && identity.value.permissions.includes(route)) || (identity.value && identity.value.admin));
};

export const useUser = (): {
    accessToken: Ref<string | null>;
    identity: Ref<Identity | null>;
    settings: Ref<Settings>;
    storeSettings: (data: Settings) => void,
    reload: () => void,
    login: (loggedIdentity: Identity, loggedAccessToken: string) => void,
    logout: (currentLogoutReason?: LogoutReason) => void,
    hasPermission: (route: string) => boolean,
    generateCsfrToken: (endpoint: string) => string,
    isLoggedIn: ComputedRef<boolean>,
} => {
    const isLoggedIn: ComputedRef<boolean> = computed((): boolean => {
        return identity.value !== null;
    });

    return { accessToken, identity, settings, storeSettings, reload, login, logout, isLoggedIn, generateCsfrToken, hasPermission };
};