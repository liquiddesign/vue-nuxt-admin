import CryptoJS from 'crypto-js';

export function generateCsfrToken(csrfToken: string, endpoint: string) {
    const currentTime = Math.floor(Date.now() / 300000) * 300000; // Zakrouhlení na 5 minut
    const dataToHash = `${csrfToken}:${currentTime}:${endpoint}`;

    const hmac = CryptoJS.HmacSHA256(dataToHash, csrfToken);

    return hmac.toString(CryptoJS.enc.Hex);
}