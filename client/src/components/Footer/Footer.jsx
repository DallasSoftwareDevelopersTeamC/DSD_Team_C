import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreativeCommons } from "@fortawesome/free-brands-svg-icons";

import React from "react";
import DemoControls from "../DemoControls";

function Footer() {
  return (
    <footer className="flex justify-between items-center mt-4 w-full">
      <div className=" flex gap-1 items-center">
      <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
        <FontAwesomeIcon
          icon={faCreativeCommons}
          className="text-lg text-zinc-300"
        />
      </a>

      <span className="text-sm text-zinc-300">
        Orderly 2023. Created by{" "}
        <a
          href="https://www.linkedin.com/in/clayton-breland"
          className="underline hover:text-zinc-100"
          target="_blank"
        >
          Clay Breland
        </a>{" "}
        &{" "}
        <a
          href="https://joshuaow.com/"
          target="_blank"
          className="underline hover:text-zinc-100"
        >
          Joshua Ow
        </a>
      </span>
      </div>
<div className=""><DemoControls/></div>
    </footer>
  );
}

export default Footer;
