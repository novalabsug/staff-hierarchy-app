import { ConnectToDb } from "@config/Config";
import Personnel from "@models/Personnel.schema";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await ConnectToDb();

    const PersonnelData = await Personnel.find().lean();

    for (const personnel of PersonnelData) {
      if (personnel.reportsTo !== "")
        personnel.reportsTo = await Personnel.findOne({
          _id: personnel.reportsTo,
        })
          .select("role")
          .lean();
    }

    const AllIndexes = [
      ...new Set(PersonnelData.map((personnel) => personnel.index)),
    ];

    const SortedPersonnel = [];

    for (const index of AllIndexes) {
      SortedPersonnel.push({
        index,
        data: PersonnelData.filter((personnel) => personnel.index == index),
      });
    }

    return new NextResponse(JSON.stringify(SortedPersonnel), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch data", { status: 400 });
  }
};
