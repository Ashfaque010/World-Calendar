import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  List,
  Grid3X3,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  isSameDay,
} from "date-fns";

interface Event {
  id: string;
  name: string;
  date: Date;
  type: "national" | "religious" | "cultural" | "special";
  country?: string;
  religion?: string;
  description?: string;
}

interface CalendarViewProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events = [
    {
      id: "1",
      name: "New Year's Day",
      date: new Date(2024, 0, 1),
      type: "national",
      country: "Global",
      description: "The first day of the year in the Gregorian calendar.",
    },
    {
      id: "2",
      name: "Valentine's Day",
      date: new Date(2024, 1, 14),
      type: "special",
      country: "Global",
      description:
        "A day celebrating love and affection between intimate companions.",
    },
    {
      id: "3",
      name: "Easter",
      date: new Date(2024, 3, 9),
      type: "religious",
      religion: "Christianity",
      description: "A Christian holiday celebrating the resurrection of Jesus.",
    },
    {
      id: "4",
      name: "Mother's Day (US)",
      date: new Date(2024, 4, 12),
      type: "special",
      country: "United States",
      description: "A celebration honoring mothers and motherhood.",
    },
    {
      id: "5",
      name: "Father's Day (US)",
      date: new Date(2024, 5, 16),
      type: "special",
      country: "United States",
      description: "A celebration honoring fathers and fatherhood.",
    },
  ],
  onEventClick = () => {},
}) => {
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handlePrevious = () => {
    switch (viewMode) {
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsByDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "national":
        return "bg-red-500";
      case "religious":
        return "bg-blue-500";
      case "cultural":
        return "bg-green-500";
      case "special":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderDayContent = (day: Date) => {
    const dayEvents = getEventsByDate(day);

    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1 p-1 overflow-hidden">
        {dayEvents.map((event, index) => (
          <TooltipProvider key={event.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-2 h-2 rounded-full ${getEventBadgeColor(event.type)}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{event.name}</p>
                <p className="text-xs text-muted-foreground">{event.type}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    // Simple week view implementation
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dayEvents = getEventsByDate(day);
          return (
            <div
              key={index}
              className="border rounded-md p-2 h-32 overflow-y-auto bg-background"
              onClick={() => {
                setViewMode("day");
                setCurrentDate(day);
              }}
            >
              <div className="text-sm font-medium mb-1">
                {format(day, "EEE")}
              </div>
              <div className="text-lg font-bold mb-2">{format(day, "d")}</div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded cursor-pointer"
                    style={{
                      backgroundColor: getEventBadgeColor(event.type) + "40",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    {event.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsByDate(currentDate);

    return (
      <div className="border rounded-md p-3 sm:p-4 bg-background">
        <div className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          {format(currentDate, "EEEE, MMMM d, yyyy")}
        </div>
        {dayEvents.length > 0 ? (
          <div className="space-y-2">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="p-2 sm:p-3 rounded-md cursor-pointer"
                style={{
                  backgroundColor: getEventBadgeColor(event.type) + "20",
                }}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-sm sm:text-base">
                    {event.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs whitespace-nowrap"
                  >
                    {event.type}
                  </Badge>
                </div>
                {event.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {event.description}
                  </p>
                )}
                <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {event.country && (
                    <span className="whitespace-nowrap">
                      Country: {event.country}
                    </span>
                  )}
                  {event.religion && (
                    <span className="whitespace-nowrap">
                      Religion: {event.religion}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No events scheduled for this day
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>WorldSync Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-lg font-medium">
            {viewMode === "month" && format(currentDate, "MMMM yyyy")}
            {viewMode === "week" &&
              `Week of ${format(currentDate, "MMM d, yyyy")}`}
            {viewMode === "day" && format(currentDate, "MMMM d, yyyy")}
          </div>
          <Tabs
            value={viewMode}
            onValueChange={(value) =>
              setViewMode(value as "month" | "week" | "day")
            }
          >
            <TabsList>
              <TabsTrigger value="month">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Month
              </TabsTrigger>
              <TabsTrigger value="week">
                <Grid3X3 className="h-4 w-4 mr-1" />
                Week
              </TabsTrigger>
              <TabsTrigger value="day">
                <List className="h-4 w-4 mr-1" />
                Day
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          {viewMode === "month" && (
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              month={currentDate}
              className="rounded-md border"
              components={{
                Day: ({ day, ...props }) => {
                  if (!day)
                    return <div className="relative h-12" {...props}></div>;
                  return (
                    <div className="relative h-12" {...props}>
                      {day.day}
                      {renderDayContent(day.date)}
                    </div>
                  );
                },
              }}
            />
          )}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs">National</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-xs">Religious</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs">Cultural</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span className="text-xs">Special</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
