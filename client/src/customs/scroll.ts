import { useState, useEffect } from "react";

export function useScollHook() {
    const [style, setStyle] = useState({});

    useEffect(() => {
        const handleChangeHeaderStyle = () => {
            if (document.body.getBoundingClientRect().top > scrollPos) {
                setStyle({});
            } else {
                setStyle({ transform: "translateY(-100%)" });
            }
            scrollPos = document.body.getBoundingClientRect().top;
        };

        let scrollPos = 0;
        window.addEventListener("scroll", handleChangeHeaderStyle);

        return () => {
            window.removeEventListener("scroll", handleChangeHeaderStyle);
        };
    }, []);

    return style;
}