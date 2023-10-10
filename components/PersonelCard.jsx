"use client";

import { Loader2, PenBoxIcon, Trash2Icon, User2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import UpdatePersonnel from "./UpdatePersonnel";
import { useRouter } from "next/navigation";

const PersonelCard = ({ personnel, color }) => {
  const [CardSideNav, setCardSideNav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [UpdatePersonnelModalDisplay, setUpdatePersonnelModalDisplay] =
    useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const sliceNameText = (text) => {
    const textArray = text.split(" ");

    return `${textArray[0].slice(0, 1)}${textArray[1].slice(0, 1)}`;
  };

  const handleDelete = async (id) => {
    setIsLoading((prev) => (prev ? false : true));

    try {
      const res = await fetch(`/api/personnel/${id}`, { method: "DELETE" });

      const data = await res.json();

      if (data.msg) toast({ title: "Success", description: data.msg });

      router.push("/");
    } catch (error) {
    } finally {
      setIsLoading((prev) => (prev ? false : true));
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      {UpdatePersonnelModalDisplay && (
        <UpdatePersonnel
          changeDisplayState={setUpdatePersonnelModalDisplay}
          personnel={personnel}
        />
      )}

      <div
        className={`relative rounded-md bg-white shadow-md w-60`}
        onMouseEnter={() => setCardSideNav((prev) => (prev ? false : true))}
        onMouseLeave={() => setCardSideNav((prev) => (prev ? false : true))}
      >
        <div
          className={`absolute right-3 cursor-pointer top-0 p-2 rounded-full bg-white hover:bg-[#52bd52] z-10 shadow-md ${
            !CardSideNav && "hidden"
          }`}
          onClick={() =>
            setUpdatePersonnelModalDisplay((prev) => (prev ? false : true))
          }
        >
          <PenBoxIcon className="text-slate-500 hover:text-slate-50" />
        </div>

        <div
          className={`absolute right-3 cursor-pointer top-14 p-2 rounded-full bg-white hover:bg-[#d83b3b] z-10 shadow-md ${
            !CardSideNav && "hidden"
          }`}
          onClick={() => handleDelete(personnel._id)}
        >
          <Trash2Icon className="text-slate-500 hover:text-slate-50" />
        </div>

        {/* for mobile */}
        <div
          className={`absolute right-3 cursor-pointer top-0 p-2 rounded-full bg-white hover:bg-[#52bd52] z-10 shadow-md lg:hidden`}
          onClick={() =>
            setUpdatePersonnelModalDisplay((prev) => (prev ? false : true))
          }
        >
          <PenBoxIcon className="text-slate-500 hover:text-slate-50" />
        </div>

        <div
          className={`absolute right-3 cursor-pointer top-14 p-2 rounded-full bg-white hover:bg-[#d83b3b] z-10 shadow-md lg:hidden`}
          onClick={() => handleDelete(personnel._id)}
        >
          <Trash2Icon className="text-slate-500 hover:text-slate-50" />
        </div>

        <div className="py-4">
          <div className="flex justify-center flex-col items-center">
            <div
              className={`rounded-full h-28 w-28 p-1`}
              style={{ backgroundColor: color }}
            >
              <div className="w-full h-full flex items-center justify-center border-[1.8px] border-slate-50 rounded-full">
                <h3 className="font-bold text-4xl text-center text-slate-50">
                  {sliceNameText(personnel.name)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className={`text-2xl text-center text-[${color}]`}>
            {personnel.name}
          </p>

          <h3 className="text-sm my-1 text-center font-semibold">
            Role: <span className="font-normal">{personnel.role}</span>
          </h3>

          <h3 className="text-sm my-1 text-center font-semibold">
            Reports To:{" "}
            <span className="font-normal">
              {personnel.reportsTo && personnel.reportsTo.role}
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default PersonelCard;
