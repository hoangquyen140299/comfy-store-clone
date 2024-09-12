import { useState } from "react";
import clsx from "clsx";

import styles from "./ButtonColor.module.scss";

function ButtonColor({ type, color, productColor, setProductColor }) {
    return (
        <button
            type={type}
            className={clsx(styles.badge, {
                [styles.active]: color === productColor,
            })}
            style={{ backgroundColor: color }}
            onClick={() => setProductColor(color)}
        ></button>
    );
}

export default ButtonColor;
