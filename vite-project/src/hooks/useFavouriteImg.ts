import type { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import { userActions } from "../redux/userReducer";
import { favouriteImage } from "../lib/api";
import { useAuth0 } from "@auth0/auth0-react";

export const useFavouriteImg = (id: string) => {
  const dispatch: Dispatch = useDispatch();
  const { favourites } = useSelector(selectUser);

  const { getAccessTokenSilently } = useAuth0();

  const isFavourite = favourites.includes(id);

  const handleFavClick = async () => {
    const token = await getAccessTokenSilently();
    favouriteImage(id, token)
      .then((res) => {
        console.log(res, "from adding fav");
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
      })
      .catch((err) => console.log(err, "something went wrong adding fav"));
  };

  return {
    handleFavClick,
    isFavourite,
  };
};
