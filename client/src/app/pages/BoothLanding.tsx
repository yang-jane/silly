import { useNavigate } from "react-router-dom";

export default function BoothLanding(): React.ReactNode {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center m-10">
      <div className="bg-red-200 w-xl h-50">
        <div className="flex items-center justify-center">
          <div className="outline hover:bg-sky-700 ">
            <button
              className="hover:cursor-pointer"
              onClick={() => navigate("photobooth")}
            >
              enter photo booth
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
