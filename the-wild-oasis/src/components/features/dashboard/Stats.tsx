import { ConfirmedStays, RecentBookings } from "@/types/bookings.types";
import { Package } from "lucide-react";
import { StatCard } from "./StatCard";

type PropsType = {
  confirmedStays: ConfirmedStays[];
  recentBookings: RecentBookings[];
  cabinCount: number;
  numOfDays: number;
};

function Stats({
  confirmedStays,
  recentBookings,
  numOfDays,
  cabinCount,
}: PropsType) {
  // 1.
  const numOfBookings = recentBookings.length;

  // 2.
  const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkIns = confirmedStays.length;

  // 4.
  const occupanyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numOfDays * cabinCount);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <StatCard
        icon={<Package />}
        iconBg="bg-blue-300"
        iconColor="text-blue-700"
        title="Bookings"
        value={numOfBookings}
      />
      <StatCard
        icon={<Package />}
        iconBg="bg-blue-300"
        iconColor="text-blue-700"
        title="Sales"
        value={`$${sales}`}
      />
      <StatCard
        icon={<Package />}
        iconBg="bg-blue-300"
        iconColor="text-blue-700"
        title="Check-ins"
        value={checkIns}
      />
      <StatCard
        icon={<Package />}
        iconBg="bg-blue-300"
        iconColor="text-blue-700"
        title="Occupansy"
        value={`${Math.round(occupanyRate * 100)}%`}
      />
    </div>
  );
}

export default Stats;
