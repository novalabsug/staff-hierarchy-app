"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import AddPersonnel from "./AddPersonnel";

const Navbar = () => {
  const [AddPersonnelModalDisplay, setAddPersonnelModalDisplay] =
    useState(false);

  return (
    <>
      <div className="flex justify-center px-10 pt-10 pb-4 items-center flex-col">
        <div className="py-4">
          <Button
            onClick={() =>
              setAddPersonnelModalDisplay((prev) => (prev ? false : true))
            }
          >
            <UserPlus className="mx-1" size={23} />
            Personnel
          </Button>
        </div>
      </div>

      {/* // modal form */}
      {AddPersonnelModalDisplay && (
        <AddPersonnel changeDisplayState={setAddPersonnelModalDisplay} />
      )}
    </>
  );
};

export default Navbar;
