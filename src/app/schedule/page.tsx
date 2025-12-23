import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

type ScheduleItem = {
  time: string;
  day1: string;
  day2: string;
  day3: string;
};

const scheduleData: ScheduleItem[] = [
  { time: "09:00 AM", day1: "Registration & Kits", day2: "Technical Paper Presentations", day3: "Robotics Finals" },
  { time: "10:30 AM", day1: "Inauguration Ceremony", day2: "Workshop: Cybersecurity", day3: "Guest Lecture: Future of Space-Tech" },
  { time: "01:00 PM", day1: "Lunch Break", day2: "Networking Lunch", day3: "Lunch Break" },
  { time: "02:00 PM", day1: "Coding Prelims", day2: "RoboWars: Round 2", day3: "Hackathon Demos" },
  { time: "05:00 PM", day1: "Keynote: AI Trends", day2: "Startup Pitch Fest", day3: "Valedictory & Awards" },
  { time: "08:00 PM", day1: "Networking Night", day2: "Cultural Gala", day3: "Fest After-Party" },
];

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-accent">Event Schedule</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Plan your fest experience. Don't miss out on any of the action.
        </p>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Time</TableHead>
              <TableHead>Day 1: The Launch</TableHead>
              <TableHead>Day 2: The Grind</TableHead>
              <TableHead>Day 3: The Finale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((item) => (
              <TableRow key={item.time}>
                <TableCell className="font-medium text-muted-foreground">{item.time}</TableCell>
                <TableCell>{item.day1}</TableCell>
                <TableCell>{item.day2}</TableCell>
                <TableCell>{item.day3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
