// selector rate product

export const productList = (state) => {
  const { products, category, price, rate, searchText } = state.products;
  const remind = products.filter((item) => {
    const includeText = item.name.includes(searchText);
    const inCategory =
      category === 'All'
        ? true
        : category === 'Drinks'
        ? item.Category === 'Đồ uống'
        : item.Category === 'Đồ ăn';
    const inPrice = price === 1 ? true : handlePice(price, item);
    const inRate = rate === 0 ? true : handleRate(rate, item);
    return includeText && inCategory && inPrice && inRate;
  });
  return remind;
};

const handlePice = (arg, item) => {
  if (arg === 2) {
    return item.price < 50000;
  } else if (arg === 3) {
    return item.price >= 50000 && item.price <= 100000;
  } else if (arg === 4) {
    return 100000 < item.price;
  }
};

const handleRate = (arg, item) => {
  if (arg === 0) {
    return item.evaluate === 0;
  } else if (arg === 1) {
    return item.evaluate === 5;
  } else if (arg === 2) {
    return item.evaluate === 4;
  } else if (arg === 3) {
    return item.evaluate === 3;
  }
};

export const searchSelector = (state) => state.products.search;
export const categorySelector = (state) => state.products.category;

// selector cart product
export const cartSelector = (state) => state.product;

//selector comment
export const commentSelector = (state) => state.comment;

//selector infoUser
export const infoUser = (state) => state.infoUser;

//selector infoUser
export const infoUserFireBase = (state) => state.infoUserFireBase;
