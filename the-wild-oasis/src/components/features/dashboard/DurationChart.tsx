"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ConfirmedStays } from "@/types/bookings.types";

export const description = "A pie chart with a legend";

interface DurationData {
  duration: string;
  value: number;
  fill: string;
}

const startData: DurationData[] = [
  { duration: "1 night", value: 1, fill: "var(--chart-1)" },
  { duration: "2 nights", value: 3, fill: "var(--chart-2)" },
  { duration: "3 nights", value: 0, fill: "var(--chart-3)" },
  { duration: "6-7 nights", value: 0, fill: "var(--chart-5)" },
];

const chartConfig = {
  "1 night": {
    label: "1 night",
  },
  "2 nights": {
    label: "2 nights",
    color: "var(--chart-1)",
  },
  "3 nights": {
    label: "3 nights",
    color: "var(--chart-2)",
  },
  "6-7 nights": {
    label: "6-7 nights",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

function incArrayValue(arr: DurationData[], field: string): DurationData[] {
  return arr.map((obj) =>
    obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
  );
}

function prepareData(startData: DurationData[], stays: ConfirmedStays[]) {
  const data = stays
    .reduce<DurationData[]>((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export function DurationChart({
  confirmedStays,
}: {
  confirmedStays: ConfirmedStays[];
}) {
  const data = prepareData(startData, confirmedStays);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={data} dataKey="value" name="duration" />
            <ChartLegend
              content={<ChartLegendContent nameKey="duration" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
