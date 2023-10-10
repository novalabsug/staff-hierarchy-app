import { ConnectToDb } from "@config/Config";
import Personnel from "@models/Personnel.schema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await ConnectToDb();

    const { name, role, reportsTo } = await req.json();

    if (!name || name == "")
      return new NextResponse(
        JSON.stringify({ error: "Personnel's name is required" }),
        {
          status: 400,
          statusText: "name is required",
        }
      );

    if (!role || role == "")
      return new NextResponse(
        JSON.stringify({ error: "Personnel's role is required" }),
        {
          status: 400,
          statusText: "role is required",
        }
      );

    let PersonnelIndex = 0;

    if (reportsTo !== "") {
      const personnel = await Personnel.findOne({ _id: reportsTo });
      PersonnelIndex = personnel.index + 1;
    }

    const NewPersonnel = new Personnel({
      name,
      role,
      reportsTo,
      index: PersonnelIndex,
    });

    NewPersonnel.save();

    return new NextResponse(
      JSON.stringify({ success: `${name} has been registered successfully` }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ error });
    return new NextResponse("Unexpected error occurred", { status: 400 });
  }
};

export const GET = async () => {
  try {
    const PersonnelData = await Personnel.find();

    return new NextResponse(JSON.stringify(PersonnelData), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch data", { status: 400 });
  }
};

export const PUT = async (req) => {
  try {
    ConnectToDb();

    const { _id, name, role, reportsTo } = await req.json();

    let PersonnelIndex = 0;

    if (reportsTo !== "") {
      const personnel = await Personnel.findOne({ _id: reportsTo });
      PersonnelIndex = personnel.index + 1;
    }

    await Personnel.findOneAndUpdate(
      { _id },
      { name, role, reportsTo, index: PersonnelIndex }
    );

    return new NextResponse(
      JSON.stringify({
        success: `${name}'s information has been updated successfully`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse("Unexpected error", { status: 400 });
  }
};

export const POSTS = async (req) => {
  try {
    ConnectToDb();

    const { id } = await req.json();

    await Personnel.findByIdAndDelete({ _id: id });

    return new NextResponse("Great", { status: 200 });
  } catch (error) {
    return new NextResponse("Unexpected error", { status: 400 });
  }
};
