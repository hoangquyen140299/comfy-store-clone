import clsx from "clsx";

import styles from "./FormRange.module.scss";
import { useState } from "react";
import { formatPrice } from "../../utils";

function FormRange({ label, name, price }) {
   const step = 1000;
   const maxPrice = 100000;
   const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);
   return (
      <div className={clsx(styles.formControl)}>
         <label htmlFor={name} className={clsx(styles.label)}>
            <span className={clsx(styles.labelText)}>{label || name}</span>
            <span className={clsx(styles.labelPrice)}>
               {formatPrice(selectedPrice)}
            </span>
         </label>
         <input
            type='range'
            name={name}
            min={0}
            max={maxPrice}
            value={selectedPrice}
            step={step}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className={clsx(styles.range, styles.rangePrimary)}
         />
         <div className={clsx(styles.labelBottom)}>
            <span>0</span>
            <span>Max: {formatPrice(100000)}</span>
         </div>
      </div>
   );
}

export default FormRange;
