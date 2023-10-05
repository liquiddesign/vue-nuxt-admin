export default defineNuxtPlugin(() => {
    return {
        provide: {
            price: (value: number|null, currency: string):string => value === null ? '-' : value + ' ' + currency,
            download: (data:any, fileName: string, qualifiedName: string = 'download'): void => {
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(qualifiedName, fileName);
                document.body.appendChild(link);
                link.click();
            },
        },
    };
});