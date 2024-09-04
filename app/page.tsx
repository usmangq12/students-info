import GridView from "@/components/GridView";
import { HeaderDescription } from "@/components/HeaderDescription";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import { Suspense } from "react";
import Loading from "./loading";

const ApiKey = process.env.NEXT_PUBLIC_API_KEY;
const Url = process.env.NEXT_PUBLIC_URL;
export default async function Home() {
  const students = [];
  try {
    const studentData = await axios.get(`${Url}/?results=24`, {
      headers: {
        "X-Api-Key": `${ApiKey}`,
      },
    });
    students.push(...studentData.data?.results);
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
  return (
    <>
      <div
        className="h-screen relative w-screen bg-cover bg-center bg-no-repeat mt-[-16px]"
        style={{
          backgroundImage: ` url("/school.jpeg")`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute bg-black opacity-40 inset-0  " />
        <Navbar />
        <HeaderDescription />
      </div>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 my-6  ">
        <h1 className="text-3xl font-bold text-center">Students Information</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <GridView students={students} />
      </Suspense>
    </>
  );
}
