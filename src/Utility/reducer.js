import { Type } from './action.type';

const initial = { cart: [], user: null };

function reducer(state, action) {
  const existingItem = state.cart.find(item => item.id === action.item?.id)

   const index = state.cart.findIndex((item) => item.id === action.id);
   let newCart = [...state.cart];

  switch (action.type) {
    case Type.ADD_TO_CART:
      // * check if the item exists
      if (!existingItem) {
        return {
          ...state,
          cart: [...state.cart, {...action.item, quantity: 1}]
      }
      } else {
        const updatedCart = state.cart.map(item => {
          return item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })

        return {
          ...state,
          cart: updatedCart
        }
      }

    case Type.REMOVE_FROM_CART:
      

      if (index >= 0) {
        if (newCart[index].quantity > 1) {
          newCart[index] = {...newCart[index], quantity: newCart[index].quantity - 1}
        } else {
          newCart.splice(index, 1);
        }
      }
      return {
        ...state,
        cart: newCart
      }

      case Type.SET_USER:
        return {
          ...state,
          user: action.user,
        }

        case Type.SET_EMPTY:
          return {
            ...state,
            cart: [],
          }
      
    default:
      throw new Error('Unknown Action');
  }
}

export { reducer, initial };
