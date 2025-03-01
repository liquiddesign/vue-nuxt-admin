import { useWebSocket, type UseWebSocketOptions } from '@vueuse/core';
import { ref, computed } from 'vue';

const liveTable = ref({});

let wsInstance: ReturnType<typeof useWebSocket> | null = null;

function initWebSocket(url: string, options?: UseWebSocketOptions) {
    if (wsInstance && wsInstance.status.value === 'CLOSED') {
        wsInstance.open();
    }

    if (!wsInstance) {
        wsInstance = useWebSocket(url, options);
    }
    return wsInstance;
}

const eventCallbacks: Record<string, Array<(...args: any[]) => void>> = {
    delete: [],
    update: [],
    create: [],
    typing: [],
};

const addEventListener = (event: string, callback: (...args: any[]) => void) => {
    if (eventCallbacks[event]) {
        eventCallbacks[event].push(callback);
    } else {
        console.warn(`Event ${event} is not supported.`);
    }
};

const removeEventListener = (event: string, callback: (...args: any[]) => void) => {
    if (eventCallbacks[event]) {
        eventCallbacks[event] = eventCallbacks[event].filter(cb => cb !== callback);
    }
};

export function useLiveFeed() {
    const config = useRuntimeConfig();
    const route = useRoute();
    const { identity } = useUser();

    const sendAction = (action: string, recordId: string | null = null, replyWithTable: boolean = false, message: string | null = null) => {
        const msg = {
            action: action,
            routePath: route.path,
            route: route.name,
            recordId: recordId ?? route.params?.id ?? null,
            user: identity.value ? identity.value.uuid : null,
            replyWithTable: replyWithTable,
            message: message,
            messageType: null,
            tags: null,
        };

        ws.send(JSON.stringify(msg));
    };

    const sendVisit = (replyWithTable: boolean = false) => {
        sendAction('visit', null, replyWithTable);
    };

    const sendUpdate = (recordId: string) => {
        sendAction('update', recordId);
    };

    const sendCreated = () => {
        sendAction('create');
    };

    const sendNotify = (msg: string) => {
        sendAction('notify', null, false, msg);
    };

    const sendDelete = (recordId: string) => {
        sendAction('delete', recordId);
    };

    const sendTyping = () => {
        sendAction('typing');
    };

    const ws = initWebSocket(config.public.wsURL, {
        onMessage: (ws, event) => {
            const msg = JSON.parse(event.data);

            liveTable.value = msg.table;

            if (!msg.action) {
                return;
            }

            if (msg.route?.split('-')[0] === route.name?.toString().split('-')[0]) {
                const callbacks = eventCallbacks[msg.action];

                if (callbacks && msg.recordId) {
                    callbacks.forEach(callback => callback(msg.recordId));
                }
            }
        },
        onConnected: () => {
            sendVisit(true);
        },
    });

    const isConnected = computed(() => {
        return ws.status.value === 'OPEN';
    });

    return {
        ...ws,
        liveTable,
        sendDelete,
        sendUpdate,
        sendVisit,
        sendCreated,
        sendTyping,
        sendNotify,
        isConnected,
        onDelete: (callback: (message: string) => void) => {
            addEventListener('delete', callback);
        },
        onUpdate: (callback: (message: string) => void) => {
            addEventListener('update', callback);
        },
        onCreated: (callback: () => void) => {
            addEventListener('create', callback);
        },
        onTyping: (callback: (message: string) => void) => {
            addEventListener('typing', callback);
        },
        removeOnDelete: (callback: (message: string) => void) => {
            removeEventListener('delete', callback);
        },
        removeOnUpdate: (callback: (message: string) => void) => {
            removeEventListener('update', callback);
        },
        removeOnCreated: (callback: () => void) => {
            removeEventListener('create', callback);
        },
        removeOnTyping: (callback: (message: string) => void) => {
            removeEventListener('typing', callback);
        },
    };
}
