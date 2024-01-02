import type { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import { userActions } from "../redux/userReducer";

export const useFavouriteImg = (id: string) => {
  const dispatch: Dispatch = useDispatch();
  const { favourites } = useSelector(selectUser);

  const isFavourite = favourites.includes(id);

  const handleFavClick = () => {
    if (isFavourite) {
      dispatch({
        type: userActions.REMOVEFAV,
        payload: id,
      });
      return;
    } else {
      dispatch({
        type: userActions.ADDFAV,
        payload: id,
      });
    }
  };

  return {
    handleFavClick,
    isFavourite,
  };
};
