import { Loader } from '@googlemaps/js-api-loader';

export const useGoogleMaps = (): {
  autocomplete: Ref<any>,
  address: Ref<any>,
  initAutocomplete: (element: any, loaderCustomData?: any, autocompleteCustomData?: any) => void;
} => {
  const config = useRuntimeConfig();
  const autocomplete: Ref<any> = ref(null);
  const addressTypes: Ref<any> = ref({});
  const addressDefault: any = {
    city: null,
    street: null,
    zipcode: null,
  };
  const address: Ref<any> = ref(addressDefault);


  const loaderDefault: any = {
    apiKey: config.public.googleApiKey,
    libraries: ['places', 'localContext'],
  };

  const autocompleteDefault: any = {
    types: ['address'],
    componentRestrictions: { country: 'cz' },
  };

  function initAutocomplete(element: any, loaderCustomData?: any, autocompleteCustomData?: any): void {

    const loaderData = loaderCustomData ?? loaderDefault;
    const autocompleteData = autocompleteCustomData ?? autocompleteDefault;

    if (!element) {
      return;
    } else {
      const loader = new Loader(loaderData);
      loader.load().then(() => {
        autocomplete.value = new google.maps.places.Autocomplete(
          element, autocompleteData
        );
        if (autocomplete.value) {
          autocomplete.value.addListener('place_changed', () => {
            const place = autocomplete.value.getPlace();

            if (place.address_components) {
              address.value = addressDefault;
              addressTypes.value = {};
              place.address_components.forEach((component: any) => {
                const types = component.types;

                if (types?.length > 0) {
                  for (const type of types) {
                    addressTypes.value[type] = component.long_name;
                  }
                }
              });
            }

            const city: string = getCity(addressTypes.value);
            const street: string = getStreet(addressTypes.value);
            const zipcode: string = getPostalCode(addressTypes.value);

            address.value.city = city;
            address.value.street = street;
            address.value.zipcode = zipcode;
          });
        }
      });
    }
  }


  return { autocomplete, address, initAutocomplete };
};