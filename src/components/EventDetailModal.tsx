import React from "react";
import { format } from "date-fns";
import { X, Calendar, Globe, Info, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: {
    id: string;
    name: string;
    date: Date;
    type: "national" | "religious" | "cultural" | "special" | "un";
    religion?: string;
    country?: string;
    description: string;
    culturalSignificance?: string;
    regionalVariations?: { region: string; details: string }[];
  };
}

const EventDetailModal = ({
  isOpen = true,
  onClose = () => {},
  event,
}: EventDetailModalProps) => {
  // Default event data if none is provided
  const defaultEvent = {
    id: "1",
    name: "Diwali",
    date: new Date(2025, 9, 29), // October 29, 2025
    type: "religious" as const,
    religion: "Hindu",
    country: "India",
    description:
      "Diwali is the Hindu festival of lights, typically lasting five days, celebrating the victory of light over darkness and good over evil.",
    culturalSignificance:
      "One of the most popular festivals in Hinduism, Diwali symbolizes the spiritual victory of light over darkness, good over evil, and knowledge over ignorance.",
    regionalVariations: [
      {
        region: "North India",
        details:
          "Celebrates the return of Lord Rama to Ayodhya after defeating Ravana.",
      },
      {
        region: "South India",
        details:
          "Often celebrates the victory of Lord Krishna over the demon Narakasura.",
      },
      {
        region: "West India",
        details:
          "Marks the day Lord Vishnu sent the demon King Bali to rule the nether world.",
      },
    ],
  };

  const displayEvent = event || defaultEvent;

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "national":
        return "bg-blue-500";
      case "religious":
        return "bg-purple-500";
      case "cultural":
        return "bg-green-500";
      case "special":
        return "bg-amber-500";
      case "un":
        return "bg-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleAddToCalendar = () => {
    // Placeholder for calendar integration functionality
    console.log("Adding event to calendar:", displayEvent.name);
  };

  const handleShare = () => {
    // Placeholder for sharing functionality
    console.log("Sharing event:", displayEvent.name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md md:max-w-lg w-full rounded-lg overflow-hidden">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Badge
              className={`${getEventTypeColor(displayEvent.type)} text-white`}
            >
              {displayEvent.type.charAt(0).toUpperCase() +
                displayEvent.type.slice(1)}
            </Badge>
            {displayEvent.religion && (
              <Badge variant="outline">{displayEvent.religion}</Badge>
            )}
          </div>
          <DialogTitle className="text-xl font-bold mt-2">
            {displayEvent.name}
          </DialogTitle>
          <DialogDescription className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{format(displayEvent.date, "MMMM d, yyyy")}</span>
            {displayEvent.country && (
              <>
                <span>•</span>
                <Globe className="h-4 w-4" />
                <span>{displayEvent.country}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-4" />

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="variations">Regional Variations</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Description</h3>
              <p className="mt-1 text-sm">{displayEvent.description}</p>
            </div>

            {displayEvent.culturalSignificance && (
              <div>
                <h3 className="font-medium text-sm text-gray-500">
                  Cultural Significance
                </h3>
                <p className="mt-1 text-sm">
                  {displayEvent.culturalSignificance}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="variations" className="mt-4">
            {displayEvent.regionalVariations &&
            displayEvent.regionalVariations.length > 0 ? (
              <div className="space-y-3">
                {displayEvent.regionalVariations.map((variation, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-sm">{variation.region}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {variation.details}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No regional variations available for this event.
              </p>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between mt-6 gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleAddToCalendar}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
