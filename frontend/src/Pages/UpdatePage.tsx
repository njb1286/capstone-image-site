import { useSelector } from "react-redux";
import { errorComponent } from "./ContentPage";
import UploadForm, { UploadFormSubmitEvent } from "../Components/UploadForm";
import { backendUrl } from "../store/backend-url";
import { useNavigate } from "react-router";
import { useUpdateImageItems } from "../hooks/useUpdateImageItems";
import { ImageState } from "../store/images-store";

function UpdatePage() {
  const navigate = useNavigate();
  const updateImagesState = useUpdateImageItems();
  const searchParams = new URLSearchParams(location.search);
  const selector = useSelector((state: ImageState) => state.imageItems);

  const id = searchParams.get("id");

  if (!id) {
    return errorComponent;
  }

  const imageData = selector.find(item => item.id === +id);

  if (!imageData) {
    return errorComponent;
  }

  const submitHandler: UploadFormSubmitEvent = async (title, description, image) => {

    const formData = new FormData();

    formData.append("image", image!);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("id", id);

    await fetch(`${backendUrl}/update?id=${id}`, {
      method: "POST",
      body: formData,
    });


    // Note: because the ID is generated by the database, we need to reload the items
    updateImagesState();
    navigate(`/views?id=${id}`);
  }

  return (
    <UploadForm id={+id} onSubmit={submitHandler} updating={true} title={imageData.title} description={imageData.description} />
  )
}

export default UpdatePage;