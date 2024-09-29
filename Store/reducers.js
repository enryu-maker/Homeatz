const initialState = {
  access: null,
  is_chef: null,
  banner: [],
  popular: [],
  address: [],
  location: {},
  dealtype: [],
  menutype: [],
  cart: [],
  tempAddress: [],
  active: null,
  profileCreated: false,
  chefOrders: [],
  userOrders: [],
  menuOverview: {},
  metadata: [],
  collection: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        access: action.payload.access,
        is_chef: action.payload.is_chef,
        profileCreated: action.payload.profile
      };
    case "GET_BANNER":
      return {
        ...state,
        banner: action.payload,
      };
    case "GET_COLLECTION":
      return {
        ...state,
        collection: action.payload,
      };
    case "MENU_OVERVIEW":
      return {
        ...state,
        menuOverview: action.payload,
      };
    case "GET_CHEF_ORDERS":
      return {
        ...state,
        chefOrders: action.payload,
      };
    case "GET_USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload,
      };
    case "SET_CHEF":
      return {
        ...state,
        profileCreated: action.payload,
      };
    case "GET_DEAL_TYPE":
      return {
        ...state,
        dealtype: action.payload,
      };
    case "GET_MENU_TYPE":
      return {
        ...state,
        menutype: action.payload,
      };
    case "GET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    case "GET_ADDRESS":
      return {
        ...state,
        active: action.payload.active,
        address: action.payload.address
      };
    case "GET_POPULAR":
      return {
        ...state,
        popular: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id).concat(action.payload),
      };
    case "ADD_TEMP_ADDRESS":
      return {
        ...state,
        cart: action.payload,
      };
    case "GET_META_DATA":
      return {
        ...state,
        metadata: action.payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "CHANGE_QUANTITY":
      return {
        ...state,
        cart: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        access: null,
        is_chef: null,
        profileCreated: false
      };
    default:
      return state;
  }
};