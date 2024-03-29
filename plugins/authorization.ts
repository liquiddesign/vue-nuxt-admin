import {User} from "~/utils/User";
import data from 'assets/data/permissions';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const user: User = {
        homepage: 'dashboards',
        identity: {},
        settings: {},
        isLoggedIn: false,
        updateStorage: function () {
            if (localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(this));
            } else if (sessionStorage.getItem('user')) {
                sessionStorage.setItem('user', JSON.stringify(this));
            }
        },
        login: function (identity: any, permanent: boolean = false) {
            Object.assign(this.identity, identity);
            this.settings = identity.settings;
            this.isLoggedIn = true;
            if (permanent) {
                sessionStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(this));
            } else {
                localStorage.removeItem('user');
                sessionStorage.setItem('user', JSON.stringify(this));
            }
        },
        logout: function () {
            Object.keys(this.identity).forEach(key => delete this.identity[key]);
            this.isLoggedIn = false;
            if (sessionStorage.getItem('user')) {
                sessionStorage.removeItem('user');
            } else if (localStorage.getItem('user')) {
                localStorage.removeItem('user');
            }

            $fetch(config.public.baseURL + 'auth/sign-out', {method: "POST"});
        },
        hasPermission: function (route: string) {
            return this.identity?.account?.login?.toLowerCase() === 'servis' || (this.identity?.permissions && this.identity.permissions.includes(data[route]));
        },
    };

    if (localStorage.getItem('user')) {
        const localUser: User = JSON.parse(localStorage.getItem('user') || '');
        Object.assign(user.identity, localUser.identity);
        user.isLoggedIn = localUser.isLoggedIn;
        user.settings = localUser.settings;
    } else if (sessionStorage.getItem('user')) {
        const sessionUser: User = JSON.parse(sessionStorage.getItem('user') || '');
        Object.assign(user.identity, sessionUser.identity);
        user.isLoggedIn = sessionUser.isLoggedIn;
        user.settings = sessionUser.settings;
     }

    return {
        provide: {
            user: reactive(user),
        },
    };
});