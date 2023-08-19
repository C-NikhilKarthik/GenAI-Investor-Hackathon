import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../Hooks/useDarkSide";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  useEffect(()=>{
    console.log(colorTheme);
  },[colorTheme]);

  return (
    <>
      <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        size={20}
      />
    </>
  );
}
