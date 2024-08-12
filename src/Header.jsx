
import { useGet, useMutate } from "restful-react";
import React from 'react';
import style from "./Charts.module.css";

export default function Header() {
    return (<>
        <header className={style.Appheader}>
        <FontAwesomeIcon
          className={style.icon}
          icon={faCoffee}
        ></FontAwesomeIcon>{" "}
        Laco's Coffeeshop
        </header>
        </>
    )
    
}