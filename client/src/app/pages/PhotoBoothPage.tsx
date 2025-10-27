import PhotoBooth from "../../components/PhotoBooth";
import PhotoboothText from "../../assets/PhotoboothText.gif";

export default function PhotoBoothPage(): React.ReactNode {
  return (
    <div className="flex flex-col items-center my-20 gap-4">
      <img src={PhotoboothText} alt="Photobooth Text" className="w-50" />
      <PhotoBooth />
    </div>
  );
}
