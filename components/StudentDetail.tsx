import React from "react";
import { Icons } from "./ui/icons";
import Student from "@/app/types/studentTypes";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Location, PersonalInformation, Person } from "../app/assets/svg/index";
type StudentDetailProps = {
  selectedStudent: Student;
  setSelectedStudent: React.Dispatch<React.SetStateAction<Student | null>>;
};
export const StudentDetail = ({
  selectedStudent,
  setSelectedStudent,
}: StudentDetailProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => {
            setSelectedStudent(null);
          }}
        >
          <Icons.cross className="w-5 h-5" />
        </button>
        <img
          src={selectedStudent.picture.large}
          className="w-32 h-32 rounded-full mx-auto mb-4"
          alt={`${selectedStudent.name.first} ${selectedStudent.name.last}`}
        />
        <h2 className="text-2xl font-semibold text-center text-gunmetal">
          {selectedStudent.name.first} {selectedStudent.name.last}
        </h2>
        <p className="text-center text-gunmetal mb-4 ">
          {selectedStudent.email}
        </p>

        <div className="text-left text-gunmetal">
          <div className="flex gap-2 items-baseline">
            <Person />

            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold">Personal Information</div>
              <div className="text-base">
                <p className="text-sm">Gender: {selectedStudent.gender}</p>
                <p className="text-sm">Age: {selectedStudent.dob.age}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          <div className="flex gap-2 items-baseline">
            <div>
              <Location />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold">Location</div>
              <div className="text-base">
                <p className="text-sm">
                  Street: {selectedStudent.location.street.number}{" "}
                  {selectedStudent.location.street.name}
                </p>
                <p className="text-sm">City: {selectedStudent.location.city}</p>
                <p className="text-sm">
                  State: {selectedStudent.location.state}
                </p>
                <p className="text-sm">
                  Country: {selectedStudent.location.country}
                </p>
                <p className="text-sm">
                  Postcode: {selectedStudent.location.postcode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
