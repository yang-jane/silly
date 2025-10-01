import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface ImageType {
  src: string;
  id: number;
}

async function createPhotoStrip(
  images: ImageType[]
): Promise<HTMLCanvasElement> {
  // change to list of Images
  const bigImage = await Promise.all(
    images.map(
      (img) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.src = img.src;
          image.onload = () => resolve(image);
          image.onerror = reject;
        })
    )
  );

  // canvas size
  const imgWidth = 600;
  const imgHeight = 600;
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

  return photostrip;
}

async function downloadPhotostrip(images: ImageType[]) {
  const canvas = await createPhotoStrip(images);
  const link = document.createElement("a");
  link.download = "photostrip.png";
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}

export default function PhotoBooth(): React.ReactNode {
  const [imgArr, setImgArr] = useState<ImageType[]>([]);
  const imageCount = useRef(0);
  const maxImages = 3;

  const WebcamCapture = () => {
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
      const imageSrc = webcamRef.current
        ? webcamRef.current.getScreenshot()
        : null;
      if (imageSrc) {
        imageCount.current += 1;
        setImgArr([...imgArr, { src: imageSrc, id: imageCount.current }]);
      }
      console.log(imageSrc);
    }, [webcamRef]);

    return (
      <div className="flex flex-col">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          mirrored
          screenshotQuality={1}
          imageSmoothing
          videoConstraints={{
            height: 600,
            width: 600,
          }}
        />

        <button disabled={imgArr.length >= maxImages} onClick={capture}>
          Capture photo
        </button>

        <button
          onClick={() => {
            setImgArr([]);
            imageCount.current = 0;
          }}
        >
          Restart
        </button>
        {imageCount.current === 3 && (
          <button onClick={() => downloadPhotostrip(imgArr)}>Download</button>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center">
      <WebcamCapture />
    </div>
  );
}
