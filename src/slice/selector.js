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
    const inPrice = price === 0 ? true : handlePice(price, item);
    const inRate = rate === 0 ? true : handleRate(rate, item);
    return includeText && inCategory && inPrice && inRate;
  });
  return remind;
};

const handlePice = (arg, item) => {
  if (arg === 1) {
    return item.price < 50;
  } else if (arg === 2) {
    return item.price >= 50 && item.price <= 100;
  } else if (arg === 3) {
    return 100 < item.price;
  }
};

const handleRate = (arg, item) => {
  return item.evaluate === arg;
};

export const searchSelector = (state) => state.products.search;
export const categorySelector = (state) => state.products.category;
