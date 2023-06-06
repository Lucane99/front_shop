



export const addUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const addToCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export const clearCart = () => {
  localStorage.removeItem('cart');
}

export const clearAll = () => {
  localStorage.clear();
}



export const getUser = () => {
  const data = localStorage.getItem('user');
  return data === null ? null : JSON.parse(data);
}

export const getCart = () => {
  const data = localStorage.getItem('cart');
  return data === null ? [] : JSON.parse(data);
}
