import clsx from "clsx";

import styles from "./FormSelect.module.scss";
import { generateAmountOptions } from "../../utils";

function FormSelect({
   label,
   name,
   list,
   defaultValue,
   value,
   onChange,
   paddingTop,
   number,
   className,
}) {
   if (onChange)
      return (
         <div className={clsx(styles.formControl)}>
            <label
               htmlFor={name}
               className={clsx(styles.label, {
                  [styles.paddingTop]: paddingTop,
               })}
            >
               {label || name}
            </label>
            <select
               name={name}
               id={name}
               value={value}
               onChange={onChange}
               className={clsx(styles.select, styles[className])}
            >
               {generateAmountOptions(number || value + 5)}
            </select>
         </div>
      );

   return (
      <div className={clsx(styles.formControl)}>
         <label
            htmlFor={name}
            className={clsx(styles.label, { [styles.paddingTop]: paddingTop })}
         >
            {label || name}
         </label>
         <select
            name={name}
            id={name}
            defaultValue={defaultValue}
            className={clsx(styles.select)}
         >
            {list.map((item) => {
               return (
                  <option value={item} key={item}>
                     {item}
                  </option>
               );
            })}
         </select>
      </div>
   );
}

export default FormSelect;
