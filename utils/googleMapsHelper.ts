export const getCity = (address: any): string => {
  if (address?.locality) {
    if (address?.neighborhood) {
      return address.locality + ' - ' + address.neighborhood;
    }
    if (address?.sublocality) {
      return address.locality + ' - ' + address.sublocality;
    }
    return address.locality;
  } else {
    if (address?.neighborhood && address?.sublocality) {
      return address.sublocality + ' - ' + address.neighborhood;
    }
    if (address?.sublocality) {
      return address.sublocality;
    }
  }
  return '';
};

export const getStreet = (address: any): string => {
  if (address?.route) {
    if (address?.premise && address?.street_number) {
      return address.route + ' ' + address.permise + '/' + address.street_number;
    }
    if (address?.street_number) {
      return address.route + ' ' + address.street_number;
    }
    return address.route;
  }
  return '';
};

export const getPostalCode = (address: any): string => {
  return address?.postal_code ?? '';
};