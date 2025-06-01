import Skeleton from "@/components/UI/skeleton";

export default function MenuItem() {
  return (
    <li className="flex flex-row md:gap-20 gap-3 py-8 border-b-1 border-gray-600 transition-all duration-500">
      <div className=" md:w-[262px] md:h-[262px] w-[172px] h-[172px] rounded-3xl overflow-hidden">
        {<Skeleton width="100%" height="100%" />}
      </div>
      <div className="flex flex-col w-fit">
        <div className="relative md:w-24 md:h-8 w-16 h-6 my-4">
          {<Skeleton width="100%" height="100%" />}
        </div>
        <div className="relative md:w-[684px] w-[180px] flex flex-col">
          {<Skeleton count={3} width="100%" height="32px" />}
        </div>
      </div>
    </li>
  );
}
