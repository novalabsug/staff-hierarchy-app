"use client";
import { useState, useEffect } from "react";
import Section from "@components/Section";
import AddPersonnel from "@components/AddPersonnel";
import { Button } from "@components/ui/button";
import { UserPlus2 } from "lucide-react";
import LoaderSkeleton from "@components/LoaderSkeleton";

export default function Home() {
  const [Personnel, setPersonnel] = useState(null);
  const [AddPersonnelModalDisplay, setAddPersonnelModalDisplay] =
    useState(false);

  const handleDataFetch = async () => {
    try {
      const res = await fetch("/api/personnel/sorted", {
        method: "GET",
      });

      const data = await res.json();
      setPersonnel(data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <main className="py-8">
      <div className="flex justify-center px-10 pt-10 pb-4 items-center flex-col">
        <div className="py-4">
          <Button
            onClick={() =>
              setAddPersonnelModalDisplay((prev) => (prev ? false : true))
            }
          >
            <UserPlus2 className="mx-1" size={23} />
            Personnel
          </Button>
        </div>
      </div>

      {/* // modal form */}
      {AddPersonnelModalDisplay && (
        <AddPersonnel
          changeDisplayState={setAddPersonnelModalDisplay}
          handlePersonnelDataFetch={handleDataFetch}
        />
      )}

      <div className="flex">
        <div className="m-auto w-4/5">
          {Personnel ? (
            Personnel.length > 0 ? (
              Personnel.map((personnel, index) => (
                <Section key={index} data={personnel.data} />
              ))
            ) : (
              <div className="py-20">
                <p className="text-center text-4xl font-semibold">
                  No personnel currently
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-wrap justify-center gap-6 py-12 border-b-2 border-b-slate-200 border-dashed">
              {[1, 2, 3].map((item) => (
                <LoaderSkeleton key={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
