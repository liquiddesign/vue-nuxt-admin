import {computed} from "vue";



export const useFormValidation = (form: any, props: any) => {
    const validationObject = computed( function () {
        return props.name && form?.validation.value ? form.validation.value[props.name] : props.validation;
    });


    const classes = computed( function () {
        return {
            'is-invalid' : validationObject.value?.$invalid && validationObject.value?.$dirty,
            'is-empty' : !props.modelValue,
            'input-required' : validationObject.value?.required,
        };
    });

    return {validationObject, classes}
}