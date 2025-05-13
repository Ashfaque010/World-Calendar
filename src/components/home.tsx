import React, { useState } from "react";
import { Calendar } from "lucide-react";
import CalendarView from "./CalendarView";
// Assuming FilterSidebar is also a default export
import FilterSidebar from "./FilterSidebar";
import EventDetailModal from "./EventDetailModal";
import { Button } from "./ui/button";

interface Holiday {
  id: string;
  name: string;
  date: Date;
  type: "national" | "religious" | "cultural" | "special";
  country?: string;
  religion?: string;
  description?: string;
  significance?: string;
  regionalVariations?: string[];
}

export default function Home() {
  const [viewMode, setViewMode] = useState<"monthly" | "weekly" | "daily">(
    "monthly",
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Holiday | null>(null);

  // Mock holidays data with expanded global events
  const mockHolidays: Holiday[] = [
    {
      id: "1",
      name: "New Year's Day",
      date: new Date(2024, 0, 1),
      type: "national",
      country: "Global",
      description: "The first day of the year in the Gregorian calendar.",
      significance:
        "Celebrated worldwide with various customs including fireworks and gatherings.",
    },
    {
      id: "2",
      name: "Valentine's Day",
      date: new Date(2024, 1, 14),
      type: "cultural",
      country: "Global",
      description:
        "A day celebrating love and affection between intimate companions.",
      significance:
        "Observed in many countries through exchanging gifts, cards, and romantic gestures.",
    },
    {
      id: "3",
      name: "Ramadan Begins",
      date: new Date(2024, 2, 10),
      type: "religious",
      religion: "Islam",
      description:
        "The ninth month of the Islamic calendar, observed by Muslims worldwide as a month of fasting.",
      significance:
        "A time of spiritual reflection, improvement, and increased devotion and worship.",
      regionalVariations: [
        "Dates may vary based on moon sighting in different regions",
      ],
    },
    {
      id: "4",
      name: "Mother's Day",
      date: new Date(2024, 4, 12), // Second Sunday in May 2024
      type: "special",
      country: "United States",
      description: "A celebration honoring mothers and motherhood.",
      significance:
        "Typically involves giving gifts, flowers, and cards to mothers and mother figures.",
      regionalVariations: [
        "Celebrated on different dates in various countries",
      ],
    },
    {
      id: "5",
      name: "Father's Day",
      date: new Date(2024, 5, 16), // Third Sunday in June 2024
      type: "special",
      country: "United States",
      description: "A celebration honoring fathers and fatherhood.",
      significance:
        "Typically involves giving gifts, cards, and spending time with fathers and father figures.",
      regionalVariations: [
        "Celebrated on different dates in various countries",
      ],
    },
    {
      id: "6",
      name: "Diwali",
      date: new Date(2024, 9, 31), // October 31, 2024
      type: "religious",
      religion: "Hindu",
      country: "India",
      description:
        "Festival of lights celebrating the victory of light over darkness.",
      significance: "One of the most significant festivals in Hinduism.",
    },
    {
      id: "7",
      name: "Chinese New Year",
      date: new Date(2024, 1, 10), // February 10, 2024
      type: "cultural",
      country: "China",
      description:
        "Celebration of the beginning of a new year on the traditional Chinese calendar.",
      significance:
        "Most important Chinese holiday, celebrated with family reunions and feasts.",
    },
    {
      id: "8",
      name: "Bastille Day",
      date: new Date(2024, 6, 14), // July 14, 2024
      type: "national",
      country: "France",
      description:
        "French National Day commemorating the Storming of the Bastille.",
      significance:
        "Celebrates the unity of the French people and the republic.",
    },
    {
      id: "9",
      name: "Oktoberfest Begins",
      date: new Date(2024, 8, 21), // September 21, 2024
      type: "cultural",
      country: "Germany",
      description: "World's largest beer festival and travelling funfair.",
      significance:
        "Important part of Bavarian culture, celebrated since 1810.",
    },
    {
      id: "10",
      name: "Day of the Dead",
      date: new Date(2024, 10, 1), // November 1, 2024
      type: "cultural",
      country: "Mexico",
      description: "Holiday celebrating and honoring deceased loved ones.",
      significance:
        "Families create ofrendas (altars) with offerings to the deceased.",
    },
    {
      id: "11",
      name: "Eid al-Fitr",
      date: new Date(2024, 3, 10), // April 10, 2024
      type: "religious",
      religion: "Islam",
      description: "Festival marking the end of Ramadan.",
      significance: "Celebrated with prayers, feasts, and charity.",
    },
    {
      id: "12",
      name: "Hanukkah Begins",
      date: new Date(2024, 11, 25), // December 25, 2024
      type: "religious",
      religion: "Judaism",
      description:
        "Eight-day Jewish celebration commemorating the rededication of the Temple.",
      significance: "Also known as the Festival of Lights.",
    },
  ];

  const handleEventClick = (holiday: Holiday) => {
    setSelectedEvent(holiday);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">WorldSync Calendar</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("monthly")}
            className={
              viewMode === "monthly" ? "bg-primary text-primary-foreground" : ""
            }
          >
            Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("weekly")}
            className={
              viewMode === "weekly" ? "bg-primary text-primary-foreground" : ""
            }
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("daily")}
            className={
              viewMode === "daily" ? "bg-primary text-primary-foreground" : ""
            }
          >
            Day
          </Button>
          <Button variant="outline" size="sm" onClick={toggleSidebar}>
            {isSidebarOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-80 border-r bg-card p-4 overflow-y-auto">
            <FilterSidebar />
          </div>
        )}

        {/* Calendar View */}
        <div className="flex-1 overflow-y-auto p-4">
          <CalendarView
            viewMode={viewMode}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            holidays={mockHolidays}
            onEventClick={handleEventClick}
          />
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
