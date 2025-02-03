import {type ToastPluginApi, useToast} from 'vue-toast-notification';
import {apiFetch} from '~/utils/apiFetch';

export const useDetailMethods = (url: string, routeName: string) => {
    const route = useRoute();
    const { sendDelete } = useLiveFeed();

    const toast: ToastPluginApi = inject('toast', useToast());
    function deleteItem() {
        apiFetch(url + '/' + route.params.id, { method: 'DELETE'}).then(() => {
            toast.success('Smazáno');
            sendDelete(route.params.id.toString());

            navigateTo({name: routeName});
        }).catch((error) => {
            console.error(error);
            toast.error('Smazání se nezdařilo');
        });
    }

    function makeCopy() {
        apiFetch(url + '/' + route.params.id, { method: 'POST', body: {'_op': 'makeCopy'}})
            .then(() => {
                toast.success('Kopie vyvtořena');
                navigateTo({name: routeName});
            }).catch((error) => {
            console.error(error);
            toast.error('Nepodařilo se vytvořit kopii');
        });
    }

    function redirect(id: string) {
        id ? navigateTo({name: routeName + '-id', params: {id: id}}) :  navigateTo({name: routeName});
    }

    return {deleteItem, makeCopy, redirect};
};