import { ref } from 'vue';

export function useCopyPaste() {
    const dynamicRefs = ref<{ [key: string]: HTMLElement }>({});

    const select = (refName: string) => {
        const selection = window.getSelection();

        if (selection) {
            selection.removeAllRanges();

            const div: Range = document.createRange();
            div.setStartBefore(dynamicRefs.value[refName]);
            div.setEndAfter(dynamicRefs.value[refName]);

            selection.addRange(div);
            navigator.clipboard.writeText(selection.toString());
        }
    };

    const setRef = (key: string, element: HTMLElement) => {
        dynamicRefs.value[key] = element;
    };

    return {
        select,
        setRef,
    };
}