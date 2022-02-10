export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case "PRODUCT_LIST_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, product: {} };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true, product: {} };
    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_CREATE_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REVIEW_REQUEST":
      return { loading: true, product: {} };
    case "PRODUCT_CREATE_REVIEW_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_CREATE_REVIEW_FAILED":
      return { loading: false, error: action.payload };
    case "PRODUCT_CREATE_REVIEW_RESET":
      return { loading: false, product: {}, success: false };
    default:
      return state;
  }
};

export const getTopProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_TOP_REQUEST":
      return { loading: true, product: [] };
    case "PRODUCT_TOP_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_TOP_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
