import { useCallback, useRef, useState } from "react";

import Menu from "../../components/Menu";

export default function HomePage(): React.ReactNode {
  const [name, setName] = useState<string>("");
  const [tempName, setTempName] = useState<string>(name);

  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setName(tempName);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col my-10 gap-4">
      <Menu />
      {/* <div className="flex justify-center items-center flex-col">
        {showWebcam && <WebcamCapture />}
      </div>
      {!submitted ? (
        <form onSubmit={handleNameChange}>
          <div className="flex justify-center items-center flex-col font-mono gap-2">
            <label>what is your name?</label>
            <input
              className="text-center"
              type="text"
              value={tempName}
              onChange={(event) => setTempName(event.target.value)}
              placeholder={"enter name plz"}
            />
            <button type="submit">submit</button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-center font-mono">click on us {name} !!</p>
        </div>
      )} */}
    </div>
  );
}
