import clsx from "clsx";

import styles from "./About.module.scss";

function About() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.box)}>
                <h1 className={clsx(styles.title)}>We love</h1>
                <div className={clsx(styles.label)}>comfy</div>
            </div>
            <p className={clsx(styles.description)}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore quae quam blanditiis vitae, dolor non eveniet ipsum
                voluptatibus, quia optio aut! Perferendis ipsa cumque ipsam
                nostrum reprehenderit ad illo sed officiis ea tempore! Similique
                eos minima sit porro, ratione aspernatur!
            </p>
        </div>
    );
}

export default About;
