import { NavLink } from "react-router-dom";
import classes from "./PageNotFound.module.scss";
import { FaSearch } from "react-icons/fa";

type PageNotFoundProps = {
  message: string;
}

const PageNotFound = ({ message }: Readonly<PageNotFoundProps>) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FaSearch className={classes.icon} />
        <p className={classes.message}>{message}</p>
        <NavLink className={classes.link} to="/">Return to home</NavLink>
      </div>
    </div>
  )
}

export default PageNotFound;