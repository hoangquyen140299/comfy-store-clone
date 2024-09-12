import clsx from "clsx";

import styles from "./FormCheckBox.module.scss";

function FormCheckBox({ label, name, defaultValue }) {
   return (
      <div className={clsx(styles.formControl)}>
         <label htmlFor={name} className={clsx(styles.label)}>
            <span className={clsx(styles.labelText)}>{label || name}</span>
         </label>
         <input
            type='checkbox'
            name={name}
            defaultChecked={defaultValue}
            className={clsx(styles.checkbox)}
         />
      </div>
   );
}

export default FormCheckBox;
