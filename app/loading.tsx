import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
        {Array.from({ length: 18 }).map((_, index) => (
          <Card key={index} className="flex flex-col h-full w-full">
            <CardHeader>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-t-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full " />
                  <Skeleton className="h-4 w-[90%]  " />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
