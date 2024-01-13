
export const useFormValidation = (form: any, props: any) => {
    const validationObject = computed( function () {
        if (props.validation) {
            return props.validation;
        }

        return props.name && form?.validation.value ? _get(form.validation.value, props.name) : undefined;
    });


    const classes = computed( function () {
        return {
            'is-invalid' : validationObject.value?.$invalid && validationObject.value?.$dirty,
            'is-empty' : !props.modelValue,
            'input-required' : validationObject.value,
        };
    });

    return {validationObject, classes};
};