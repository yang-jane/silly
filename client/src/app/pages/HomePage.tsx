import { Link } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import Momos from "../../assets/2momos.svg";
import ShockedMomos from "../../assets/2momos_shock.svg";
import InteractiveIcon from "../../components/InteractiveIcon";
import Webcam from "react-webcam";

export default function HomePage(): React.ReactNode {
  const [name, setName] = useState<string>("");
  const [tempName, setTempName] = useState<string>(name);

  const [showWebcam, setShowWebcam] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showShock, setShowShock] = useState(false);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    setName(tempName);
    setSubmitted(true);
    setShowWebcam(true);
  };

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user",
  };

  const WebcamCapture = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current
        ? webcamRef.current.getScreenshot()
        : null;
      setImgSrc(imageSrc);
    }, [webcamRef]);
    return (
      <>
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
        <img src={imgSrc || ""} />
      </>
    );
  };

  return (
    <div className="flex flex-col my-10 gap-4">
      <div className="flex justify-center items-center flex-col">
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
      )}

      <div className="flex justify-center items-center">
        <div
          onMouseEnter={() => setShowShock(true)}
          onMouseLeave={() => setShowShock(false)}
        >
          <Link to="https://www.instagram.com/momocrawl/">
            <InteractiveIcon
              icon={Momos}
              altIcon={showShock ? ShockedMomos : undefined}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
