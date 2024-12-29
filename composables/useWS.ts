import { useWebSocket } from '@vueuse/core';

const ws = useWebSocket('ws://localhost:8080');

export function useWS() {
    // sendDelete
    // sendModifiing
    // sendModified
    // sendCreated
    // 

    return {...ws};
}