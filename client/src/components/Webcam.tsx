import { useRef, useState } from "react";
import Button from "./Button";

async function formatPhotoStrip(images: string[]) {
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
  // white background
  ctx!.fillStyle = "black";
  ctx!.fillRect(0, 0, canvasWidth, canvasHeight);

  // loop thru images and draw them
  bigImage.forEach((img, index) => {
    const x = 5; // 5px padding
    const y = index * (imgHeight + 10) + 5; // 10px padding
    ctx!.drawImage(img, x, y, imgWidth, imgHeight);
  });

  const link = document.createElement("a");
  link.download = "photostrip.png";
  link.href = photostrip.toDataURL("image/png", 1.0);
  link.click();
}

export default function Webcam(): React.ReactNode {
  const videoRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const [imgArr, setImgArr] = useState<string[]>([]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // set canvas size to video size

      if (context && video.videoWidth && video.videoHeight) {
        console.log(
          "I AM IN A;LDSKFJA;SDKL",
          video,
          video.videoWidth,
          video.videoHeight
        );
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
    setImgArr([]);
    canvasRef.current = null;
  };

  console.log(canvasRef.current);

  return (
    <div className="flex gap-4">
      <Button onClick={startWebcam} label="Start Webcam" />
      <button onClick={stopWebcam}>Stop Webcam</button>
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={() => formatPhotoStrip(imgArr)}>
        Download PhotoStrip
      </button>
      <button onClick={resetWebcam}>Reset</button>
      {videoRef && <video ref={videoRef} autoPlay />}
      {canvasRef && <canvas ref={canvasRef} style={{ display: "none" }} />}
      {imgArr.map((img) => {
        return <img src={img} alt="Captured" />;
      })}
    </div>
  );
}
