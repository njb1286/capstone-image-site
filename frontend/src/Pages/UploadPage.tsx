import { ChangeEvent, FormEvent, useReducer } from "react";
import classes from "./UploadPage.module.scss";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { backendUrl } from "../store/backend-url";

type Actions = {
  SET_SELECTED_IMAGE: File | null;
  SET_TITLE: string;
  SET_DESCRIPTION: string;

  SET_TITLE_VALIDITY_STATE: typeof defaultValidityState;
  SET_DESCRIPTION_VALIDITY_STATE: typeof defaultValidityState;
  SET_IMAGE_VALIDITY_STATE: typeof defaultValidityState;

  SET_TOUCHED: boolean;
}

type Action = {
  [K in keyof Actions]: {
    type: K;
    payload: Actions[K];
  }
}[keyof Actions];

const defaultValidityState = {
  isValid: false,
  touched: false,
}

const initialState = {
  selectedImage: null as File | null,
  title: "",
  description: "",

  // Copy instead of pointer
  titleValidityState: defaultValidityState,
  descriptionValidityState: defaultValidityState,
  selectedImageValidityState: defaultValidityState,

  attemptedSubmit: false,
};

type State = typeof initialState;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SELECTED_IMAGE":
      return { ...state, selectedImage: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_TITLE_VALIDITY_STATE":
      return { ...state, titleValidityState: action.payload };
    case "SET_DESCRIPTION_VALIDITY_STATE":
      return { ...state, descriptionValidityState: action.payload };
    case "SET_IMAGE_VALIDITY_STATE":
      return { ...state, selectedImageValidityState: action.payload };
      case "SET_TOUCHED":
        return {
          ...state,
          titleValidityState: {
            ...state.titleValidityState,
            touched: action.payload,
          },
          descriptionValidityState: {
            ...state.descriptionValidityState,
            touched: action.payload,
          },
          selectedImageValidityState: {
            ...state.selectedImageValidityState,
            touched: action.payload,
          },
        }
    default:
      return state;
  }
}

function UploadPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFormData = () => {
    const formData = new FormData();

    formData.append("image", state.selectedImage!);
    formData.append("title", state.title);
    formData.append("description", state.description);

    return formData;
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.titleValidityState.isValid || !state.descriptionValidityState.isValid || !state.selectedImageValidityState.isValid) {
      dispatch({ type: "SET_TOUCHED", payload: true });
      return;
    }

    alert("Form is valid! 😊");
  };

  const imageUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files) {
      dispatch({
        type: "SET_IMAGE_VALIDITY_STATE",
        payload: {
          touched: true,
          isValid: false,
        }
      })

      return;
    };

    const file = event.target.files[0];
    dispatch({ type: "SET_SELECTED_IMAGE", payload: file });

    const formData = new FormData();
    formData.append("image", file);

    dispatch({
      type: "SET_IMAGE_VALIDITY_STATE",
      payload: {
        touched: true,
        isValid: true,
      }
    })

  };

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_TITLE", payload: event.target.value });

    dispatch({
      type: "SET_TITLE_VALIDITY_STATE", payload: {
        touched: true,
        isValid: event.target.value.length > 0,
      }
    })
  }

  const descriptionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "SET_DESCRIPTION", payload: event.target.value });

    dispatch({
      type: "SET_DESCRIPTION_VALIDITY_STATE", payload: {
        touched: true,
        isValid: event.target.value.length > 0
      }
    });
  }

  // Returns false if valid
  const getInvalidity = (validity: typeof defaultValidityState): boolean => {
    if (!validity.touched) return false;

    return !validity.isValid;
  }

  const titleIsInvalid = getInvalidity(state.titleValidityState);
  const imageIsInvalid = getInvalidity(state.selectedImageValidityState);
  const descriptionIsInvalid = getInvalidity(state.descriptionValidityState);

  return (
    <div className={classes["upload-page"]}>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Title</Form.Label>
          <FormControl
            type="text"
            value={state.title}
            onChange={titleChangeHandler}
            isInvalid={titleIsInvalid}
            isValid={!titleIsInvalid && state.titleValidityState.touched}
          />
          {titleIsInvalid && <p className="text text-danger">Title is required</p>}
        </FormGroup>
        <FormGroup>
          <Form.Label>Image</Form.Label>
          <FormControl
            type="file"
            accept="image/*"
            onChange={imageUploadHandler}
            isInvalid={imageIsInvalid}
            isValid={!imageIsInvalid && state.selectedImageValidityState.touched}
          />
          {imageIsInvalid && <p className="text text-danger">Image is required</p>}
        </FormGroup>
        <FormGroup>
          <Form.Label>Description</Form.Label>
          <FormControl
            as="textarea"
            value={state.description}
            onChange={descriptionChangeHandler}
            style={{ resize: "vertical", minHeight: "10rem", maxHeight: "50rem" }}
            isInvalid={descriptionIsInvalid}
            isValid={!descriptionIsInvalid && state.descriptionValidityState.touched}
          />
          {descriptionIsInvalid && <p className="text text-danger">Description is required</p>}
        </FormGroup>
        <Button className={classes.submit} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadPage;