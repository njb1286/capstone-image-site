import { Dropdown } from "react-bootstrap"

import classes from "./CategoriesDropdown.module.scss"
import { useState } from "react";

type CategoriesDropdownProps<T extends readonly string[], U extends T[number]> = {
  categories: T;
  default: U;
  onSelect?: (category: T[number]) => void;
}

function CategoriesDropdown<T extends readonly string[], U extends T[number]>(props: Readonly<CategoriesDropdownProps<T, U>>) {
  const [category, setCategory] = useState<T[number]>(props.default);

  const selectCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const element = event.target as HTMLButtonElement;

    setCategory(element.textContent as T[number]);

    props.onSelect?.(element.textContent as T[number]);
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className={classes.categories}>
        {category}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.categories.map(categoryItem => {
          return <Dropdown.Item className={classes["category-item"]} as={"button"} onClick={selectCategory} key={`category_${categoryItem}`}>{categoryItem}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CategoriesDropdown;