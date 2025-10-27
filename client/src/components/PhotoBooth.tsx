import { useEffect, useRef, useState } from "react";
import {
  PrinterIcon,
  ArrowPathIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import download from "../utils/download";

interface WebcamProps {
  reset?: boolean;
}

async function formatPhotoStrip(images: string[]): Promise<string> {
  const bigImage = await Promise.all(
    images.map(
      (img) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.src = img;
          image.onload = () => resolve(image);
          image.onerror = reject;
        })
    )
  );
  // canvas size
  const imgWidth = 640;
  const imgHeight = 480;
  const canvasWidth = imgWidth + 10; // 10px padding
  const canvasHeight = images.length * (imgHeight + 10) + 10; // 10px padding

  const photostrip = document.createElement("canvas");
  photostrip.width = canvasWidth;
  photostrip.height = canvasHeight;

  // draw the image
  const ctx = photostrip.getContext("2d");
  ctx!.filter = "grayscale(1)";
  // white background
  ctx!.fillStyle = "black";
  ctx!.fillRect(0, 0, canvasWidth, canvasHeight);

  // loop thru images and draw them
  bigImage.forEach((img, index) => {
    const x = 5; // 5px padding
    const y = index * (imgHeight + 10) + 5; // 10px padding
    ctx!.drawImage(img, x, y, imgWidth, imgHeight);
  });

  return photostrip.toDataURL("image/png", 1.0);

  // const link = document.createElement("a");
  // link.download = "photostrip.png";
  // link.href = photostrip.toDataURL("image/png", 1.0);
  // link.click();
}

export default function Webcam(props: WebcamProps): React.ReactNode {
  const { reset = false } = props;
  // const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imgArr, setImgArr] = useState<string[]>([]);
  const [formattedImgStrip, setFormattedImgStrip] = useState<string | null>(
    null
  );

  const [ready, setReady] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      mediaStreamRef.current = stream;
      // setMediaStream(stream);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const stopCamera = () => {
    const stream = mediaStreamRef.current;
    if (videoRef.current) {
      // Detach video first
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    mediaStreamRef.current = null;
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // set canvas size to video size
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // draw video onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // get image data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg");

        // add to image arr
        setImgArr([...imgArr, imageDataUrl]);
      }
    }
  };

  const resetWebcam = () => {
    stopCamera();
    setImgArr([]);
    setReady(false);
    setFormattedImgStrip(null);
    startCamera();

    // reset flash animation
    const el = document.getElementById("flash");
    el?.classList.remove("webcam-flash");
    void el?.offsetWidth;
    el?.classList.add("webcam-flash");
  };

  // on page load, start camera
  useEffect(() => {
    startCamera();
  }, []);

  useEffect(() => {
    if (reset) resetWebcam();
  }, [reset]);

  useEffect(() => {
    console.log("in the ready imgArr", imgArr, ready, formattedImgStrip);
    if (ready) {
      console.log(imgArr.length);
      if (imgArr.length <= 3) {
        setTimeout(() => captureImage(), 3000);
      } else {
        formatPhotoStrip(imgArr).then((strip) => {
          setFormattedImgStrip(strip);
        });

        stopCamera();
      }
    }
  }, [imgArr, ready, setFormattedImgStrip]);

  useEffect(() => () => stopCamera(), []);

  return (
    <div className="flex items-center justify-center flex-col gap-4">
      {formattedImgStrip ? (
        <img src={formattedImgStrip} alt="Photo Strip" className="w-50" />
      ) : (
        <div className="w-50 scale-x-[-1] ">
          <video ref={videoRef} autoPlay muted />
          <div
            id="flash"
            className="absolute inset-0 bg-white pointer-events-none webcam-flash"
          ></div>
          {canvasRef && <canvas ref={canvasRef} style={{ display: "none" }} />}
        </div>
      )}
      <div className="flex gap-4">
        {formattedImgStrip ? (
          <div className="flex gap-2">
            <button
              className="hover:cursor-pointer"
              onClick={() => resetWebcam()}
            >
              <ArrowPathIcon className="w-4" />
            </button>
            <button
              className="hover:cursor-pointer"
              onClick={() => {
                if (formattedImgStrip)
                  download(formattedImgStrip, "photostrip.png");
              }}
            >
              <PrinterIcon className="w-4" />
            </button>
          </div>
        ) : (
          <button
            className="hover:cursor-pointer"
            onClick={() => setReady(true)}
          >
            <CameraIcon className="w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
