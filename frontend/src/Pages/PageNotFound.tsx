import { NavLink } from "react-router-dom";
import classes from "./PageNotFound.module.scss";
import { FaSearch } from "react-icons/fa";

type PageNotFoundProps = {
  message: string;
  link?: {
    text: string;
    path: string;
  }
}

const PageNotFound = (props: Readonly<PageNotFoundProps>) => {
  let path = "/";
  let text = "Return to home";

  if (props.link) {
    path = props.link.path;
    text = props.link.text;
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FaSearch className={classes.icon} />
        <p className={classes.message}>{props.message}</p>
        <NavLink className={classes.link} to={path}>{text}</NavLink>
      </div>
    </div>
  )
}

export default PageNotFound;