export function transformObjectWithArrays<T extends Record<string, any>>(
    inputObj: T
): Record<string, any> {
    const transformed: Record<string, any> = {};

    for (const key in inputObj) {
        if (Array.isArray(inputObj[key])) {
            transformed[`${key}[]`] = inputObj[key];
        } else {
            transformed[key] = inputObj[key];
        }
    }

    return transformed;
}