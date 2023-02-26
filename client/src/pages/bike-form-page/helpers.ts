export const Helpers = {
  validateTitle: (title: string): string => {
    if (title.trim().length === 0) {
      return 'Title cannot be empty';
    }
    return '';
  },

  validateCountry: (country: string): string => {
    if (country.trim().length === 0) {
      return 'Country cannot be empty';
    }
    return '';
  },

  validateCity: (city: string): string => {
    if (city.trim().length === 0) {
      return 'City cannot be empty';
    }
    return '';
  },

  validateImages: (images: Image[]): string => {
    if (images.length === 0) {
      return 'At least one image is required';
    }
    return '';
  },

  validatePrice: (price: string): string => {
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(price)) {
      return 'Price must be a valid number with up to two decimal places';
    }
    return '';
  },
};

export default Helpers;
