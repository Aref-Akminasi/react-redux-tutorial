import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://redux-tutorial-bd370-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await res.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.repleaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNoticiation({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNoticiation({
        status: "pending",
        title: "Sending...",
        message: "Sedning cart data",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-tutorial-bd370-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNoticiation({
          status: "success",
          title: "Success!",
          message: "Sedning cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNoticiation({
          status: "error",
          title: "Error!",
          message: "Sedning cart data failed",
        })
      );
    }
  };
};
