import { useCallback, useRef, useState } from "react";
import Momos from "../../assets/2momos.svg";
import ShockedMomos from "../../assets/2momos_shock.svg";
import InteractiveIcon from "../../components/InteractiveIcon";
import Webcam from "react-webcam";

export default function HomePage(): React.ReactNode {
  const [name, setName] = useState();

  const [showWebcam, setShowWebcam] = useState(false);

  const [showShock, setShowShock] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  console.log(showShock);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center flex-col">
        {showWebcam && <WebcamCapture />}
      </div>

      <div
        className="flex justify-center items-center my-10"
        onMouseEnter={() => setShowShock(true)}
        onMouseLeave={() => setShowShock(false)}
      >
        <InteractiveIcon
          icon={Momos}
          altIcon={showShock ? ShockedMomos : undefined}
        />
      </div>
    </div>
  );
}
