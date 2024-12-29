import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
import type {RouteLocationNormalizedGeneric} from 'vue-router';

let socket: WebSocket | null = null;
const isConnected = ref(false);
const liveTable = ref({});
const messages = shallowRef<string[]>([]);

export function useWebSocketX() {
    const config = useRuntimeConfig();
    const { $user } = useNuxtApp();
    let onDeleteCallback: ((message: string) => void) | null = null;

    const connect = () => {
        if (!socket) {

            socket = new WebSocket(config.public.wsURL);

            socket.onopen = (event) => {
                console.log('WebSocket připojeno');
                isConnected.value = true;

                console.log(event);

                sendMessage('login');
            };

            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                liveTable.value = msg.table;
                console.log('Přijatá zpráva:', event.data);
                messages.value.push(event.data);

                // if route === msg.route && type === 'delete'
                if (onDeleteCallback) {
                    onDeleteCallback('a');
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket chyba:', error);
            };

            socket.onclose = () => {
                console.log('WebSocket připojení uzavřeno');
                isConnected.value = false;
                socket = null; // Vymažeme instanci, aby se při dalším volání reconnectovalo
                //setTimeout(connect, 3000); // Automatické opětovné připojení
            };
        }
    };

    const sendMessage = (action: string, route: RouteLocationNormalizedGeneric|null = null, recordId = null) => {
        if (socket && socket.readyState === WebSocket.OPEN) {

            const msg = {
                action: action,
                route: route?.name,
                recordId: route?.params?.id ?? recordId,
                user: $user.identity.uuid,
            };
            socket.send(JSON.stringify(msg));
        } else {
            console.error('WebSocket není připojen');
        }
    };

    onMounted(connect);

    onUnmounted(() => {
        if (socket) {
            socket.close();
            socket = null;
        }
    });

    return {
        sendMessage,
        messages,
        liveTable,
        isConnected,
        onDelete: (callback: (message: string) => void) => {
            onDeleteCallback = callback;
        },
        connect,
        disconnect: () => {
            socket?.close();
        },
    };
}