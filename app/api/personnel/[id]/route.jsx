const { ConnectToDb } = require("@config/Config");
const { default: Personnel } = require("@models/Personnel.schema");
const { NextResponse } = require("next/server");

const PUT = async (req) => {
  try {
    ConnectToDb();

    const { id, index } = await req.json();

    await Personnel.findOneAndUpdate({ _id: id }, { index });

    return new NextResponse("Great", { status: 200 });
  } catch (error) {
    return new NextResponse("Unexpected error", { status: 400 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await Personnel.findOneAndRemove({ _id: params.id });

    await Personnel.updateMany({ reportsTo: params.id }, { reportsTo: "" });

    return new NextResponse(
      JSON.stringify({ msg: "Personnel deleted successfully" })
    );
  } catch (error) {
    return new NextResponse("Unexpected error", { status: 400 });
  }
};
