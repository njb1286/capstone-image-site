import { useDispatch } from "react-redux";
import { getImageItems } from "../store/images-actions";
import { imageStore } from "../store/images-store";

export function useUpdateImageItems() {
  const dispatch = useDispatch<typeof imageStore.dispatch>();
  
  const updateImageItems = () => {
    dispatch(getImageItems());
  }

  return updateImageItems;
}