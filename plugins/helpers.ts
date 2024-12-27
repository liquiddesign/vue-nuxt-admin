export default defineNuxtPlugin(() => {
    return {
        provide: {
            price: (value: number|null, currency: string):string => {
                const formatter = new Intl.NumberFormat('cs-CZ', {
                    style: 'currency',
                    currency: currency,
                    maximumFractionDigits: currency === 'CZK' ? 0 : 2,
                });

                return value === null ? '-' : formatter.format(value);
            },
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