export const getARandomNumberFrom0To5 = () => Math.floor(Math.random() * 5);
export const getImageUrl = () =>
  `/mocks/products/${getARandomNumberFrom0To5()}.jpg`;
