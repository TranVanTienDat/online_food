export const productList = (state) => {
  const remind = state.products.products.filter((item) => {
    return item.name.includes(state.products.searchText);
  });
  return remind;
};
export const searchSelector = (state) => state.products.search;
