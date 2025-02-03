
export function formatPrice(value: number | null, currency: string): string {
    const formatter = new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: currency === 'CZK' ? 0 : 2,
    });

    return value === null ? '-' : formatter.format(value);
}

export function formatNumber(value: number | null, suffix: string): string {
    const formatter = new Intl.NumberFormat('cs-CZ', {
        maximumFractionDigits: 2,
    });

    return value === null ? '-' : formatter.format(value) + ' ' + suffix;
}

export function doubleFormat(value: any) : string {
    return value.toString().length < 2 ? ('0' + value) : value;
}

export function downloadFile(data: any, fileName: string, qualifiedName: string = 'download'): void {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(qualifiedName, fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Odebrání elementu po kliknutí.
}

export function generateUUID() {
    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).replace(/-/g, '');
}