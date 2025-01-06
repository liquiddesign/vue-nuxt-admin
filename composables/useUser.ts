import {type Ref, ref } from 'vue';

export const useUser = (): {
    accessToken: Ref<string>;
} => {
    const accessToken = ref<string>('token');

    return { accessToken };
};