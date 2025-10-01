import { Link } from "react-router-dom";
import InteractiveIcon from "./InteractiveIcon";
import Momos from "../assets/2momos.svg";
import ShockedMomos from "../assets/2momos_shock.svg";

import { useState } from "react";

export default function Menu(): React.ReactNode {
  const [showShock, setShowShock] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div
        onMouseEnter={() => setShowShock(true)}
        onMouseLeave={() => setShowShock(false)}
      >
        <Link to="/silly/photobooth">
          <InteractiveIcon
            icon={Momos}
            altIcon={showShock ? ShockedMomos : undefined}
            label="photobooth"
          />
        </Link>
      </div>
    </div>
  );
}
