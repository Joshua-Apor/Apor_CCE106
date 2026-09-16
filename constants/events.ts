export type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  availability: "Available" | "Joined";
  status: "Upcoming" | "Completed" | "In Progress";
};

export const events: Event[] = [
  {
    id: "1",
    title: "React Native Workshop",
    description: "Build the EventMate mobile application.",
    category: "Programming",
    date: "September 18, 2026",
    time: "9:00 AM",
    venue: "Computer Laboratory 2",
    availability: "Available",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Database Review",
    description: "Review database normalization concepts.",
    category: "Database",
    date: "September 20, 2026",
    time: "1:00 PM",
    venue: "Room 204",
    availability: "Available",
    status: "Upcoming",
  },
  {
    id: "3",
    title: "UI Design Presentation",
    description: "Present the mobile app wireframes.",
    category: "Design",
    date: "September 15, 2026",
    time: "10:30 AM",
    venue: "Design Studio",
    availability: "Joined",
    status: "Completed",
  },
  {
    id: "4",
    title: "Mathematics Class",
    description: "Complete the assigned mathematics problems.",
    category: "Mathematics",
    date: "September 22, 2026",
    time: "8:00 AM",
    venue: "Room 101",
    availability: "Available",
    status: "Upcoming",
  },
  {
    id: "5",
    title: "Project Documentation",
    description: "Submit the EventMate project documentation.",
    category: "Software Engineering",
    date: "September 25, 2026",
    time: "3:00 PM",
    venue: "Library Conference Room",
    availability: "Available",
    status: "In Progress",
  },
];
