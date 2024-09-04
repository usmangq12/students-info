"use client";
import React, { useEffect, useState, useRef } from "react";
import Student from "@/app/types/studentTypes";
import { Icons } from "./ui/icons";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { StudentDetail } from "./StudentDetail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

type GridViewProp = {
  students: Student[];
};

const GridView = ({ students }: GridViewProp) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      title: "You Clicked on Edit button",
    });
    setDropdownOpen(null); // Close dropdown
  };

  const handleFlag = () => {
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      title: "You Clicked on Flag button",
    });
    setDropdownOpen(null);
  };

  const handleDelete = () => {
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      title: "You Clicked on Delete button",
      variant: "destructive",
    });
    setDropdownOpen(null);
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full cursor-pointer">
        {students?.map((student, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl bg-white shadow-md"
            onClick={() => setSelectedStudent(student)}
          >
            <img
              src={student?.picture.large}
              className="w-full h-56 object-cover rounded-t-xl"
              alt={`${student?.name.first} profile`}
            />
            <div className="p-4 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold">
                  {student?.name.first} {student?.name.last}
                </h3>
                <p className="text-xs text-gunmetal">{student?.email}</p>
              </div>
              <div className="relative" ref={dropdownRef}>
                <DropdownMenu open={dropdownOpen === index}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="shadow-none w-auto h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(dropdownOpen === index ? null : index);
                      }}
                    >
                      <Icons.dots className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute top-full right-0 mt-1 w-48">
                    <div className="w-full">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit();
                        }}
                        className="flex gap-1 bg-white text-gunmetal w-full shadow-none justify-start items-center hover:bg-accent"
                      >
                        <Icons.edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </div>
                    <div className="w-full">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlag();
                        }}
                        className="flex gap-1 bg-white text-gunmetal w-full shadow-none justify-start items-center hover:bg-accent"
                      >
                        <Icons.flag className="w-4 h-4" />
                        Flag
                      </Button>
                    </div>
                    <div className="w-full">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete();
                        }}
                        className="flex gap-1 bg-white text-gunmetal w-full shadow-none justify-start items-center hover:bg-accent"
                      >
                        <Icons.delete className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <StudentDetail
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />
      )}
    </div>
  );
};

export default GridView;
