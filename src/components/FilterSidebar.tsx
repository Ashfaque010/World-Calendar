import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  name: string;
  checked: boolean;
}

interface FilterSidebarProps {
  onApplyFilters?: (filters: {
    countries: string[];
    religions: string[];
    eventTypes: string[];
  }) => void;
  onResetFilters?: () => void;
}

const FilterSidebar = ({
  onApplyFilters = () => {},
  onResetFilters = () => {},
}: FilterSidebarProps) => {
  // Default filter options
  const defaultCountries: FilterOption[] = [
    { id: "us", name: "United States", checked: false },
    { id: "ca", name: "Canada", checked: false },
    { id: "uk", name: "United Kingdom", checked: false },
    { id: "in", name: "India", checked: false },
    { id: "jp", name: "Japan", checked: false },
    { id: "cn", name: "China", checked: false },
    { id: "au", name: "Australia", checked: false },
    { id: "br", name: "Brazil", checked: false },
    { id: "de", name: "Germany", checked: false },
    { id: "fr", name: "France", checked: false },
  ];

  const defaultReligions: FilterOption[] = [
    { id: "christian", name: "Christianity", checked: false },
    { id: "islam", name: "Islam", checked: false },
    { id: "hindu", name: "Hinduism", checked: false },
    { id: "buddhist", name: "Buddhism", checked: false },
    { id: "jewish", name: "Judaism", checked: false },
    { id: "sikh", name: "Sikhism", checked: false },
    { id: "bahai", name: "Bahai", checked: false },
    { id: "jain", name: "Jainism", checked: false },
    { id: "shinto", name: "Shinto", checked: false },
    { id: "zoroastrian", name: "Zoroastrianism", checked: false },
  ];

  const defaultEventTypes: FilterOption[] = [
    { id: "national", name: "National Holidays", checked: false },
    { id: "religious", name: "Religious Observances", checked: false },
    { id: "cultural", name: "Cultural Celebrations", checked: false },
    {
      id: "family",
      name: "Family Days (Mother's/Father's Day)",
      checked: false,
    },
    { id: "couples", name: "Couple's Days", checked: false },
    { id: "un", name: "UN Observances", checked: false },
    { id: "custom", name: "Custom Events", checked: false },
  ];

  // State for filter options
  const [countries, setCountries] = useState<FilterOption[]>(defaultCountries);
  const [religions, setReligions] = useState<FilterOption[]>(defaultReligions);
  const [eventTypes, setEventTypes] =
    useState<FilterOption[]>(defaultEventTypes);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle checkbox changes
  const handleCountryChange = (id: string, checked: boolean) => {
    setCountries(
      countries.map((country) =>
        country.id === id ? { ...country, checked } : country,
      ),
    );
  };

  const handleReligionChange = (id: string, checked: boolean) => {
    setReligions(
      religions.map((religion) =>
        religion.id === id ? { ...religion, checked } : religion,
      ),
    );
  };

  const handleEventTypeChange = (id: string, checked: boolean) => {
    setEventTypes(
      eventTypes.map((eventType) =>
        eventType.id === id ? { ...eventType, checked } : eventType,
      ),
    );
  };

  // Filter options based on search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredReligions = religions.filter((religion) =>
    religion.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredEventTypes = eventTypes.filter((eventType) =>
    eventType.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Count selected filters
  const selectedCount = {
    countries: countries.filter((c) => c.checked).length,
    religions: religions.filter((r) => r.checked).length,
    eventTypes: eventTypes.filter((e) => e.checked).length,
  };

  // Apply filters
  const applyFilters = () => {
    onApplyFilters({
      countries: countries.filter((c) => c.checked).map((c) => c.id),
      religions: religions.filter((r) => r.checked).map((r) => r.id),
      eventTypes: eventTypes.filter((e) => e.checked).map((e) => e.id),
    });
  };

  // Reset filters
  const resetFilters = () => {
    setCountries(defaultCountries);
    setReligions(defaultReligions);
    setEventTypes(defaultEventTypes);
    setSearchQuery("");
    onResetFilters();
  };

  return (
    <div className="h-full w-full bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search filters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-8"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2.5"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-2">
        <Accordion
          type="multiple"
          defaultValue={["countries", "religions", "eventTypes"]}
          className="w-full"
        >
          <AccordionItem value="countries">
            <AccordionTrigger className="py-2">
              <div className="flex items-center justify-between w-full">
                <span>Countries</span>
                {selectedCount.countries > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCount.countries}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {filteredCountries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No countries match your search
                  </p>
                ) : (
                  filteredCountries.map((country) => (
                    <div
                      key={country.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`country-${country.id}`}
                        checked={country.checked}
                        onCheckedChange={(checked) =>
                          handleCountryChange(country.id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`country-${country.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {country.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="religions">
            <AccordionTrigger className="py-2">
              <div className="flex items-center justify-between w-full">
                <span>Religions</span>
                {selectedCount.religions > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCount.religions}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {filteredReligions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No religions match your search
                  </p>
                ) : (
                  filteredReligions.map((religion) => (
                    <div
                      key={religion.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`religion-${religion.id}`}
                        checked={religion.checked}
                        onCheckedChange={(checked) =>
                          handleReligionChange(religion.id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`religion-${religion.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {religion.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="eventTypes">
            <AccordionTrigger className="py-2">
              <div className="flex items-center justify-between w-full">
                <span>Event Types</span>
                {selectedCount.eventTypes > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCount.eventTypes}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {filteredEventTypes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No event types match your search
                  </p>
                ) : (
                  filteredEventTypes.map((eventType) => (
                    <div
                      key={eventType.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`eventType-${eventType.id}`}
                        checked={eventType.checked}
                        onCheckedChange={(checked) =>
                          handleEventTypeChange(eventType.id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`eventType-${eventType.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {eventType.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <div className="p-2 sm:p-4 border-t mt-auto">
        <div className="flex space-x-2">
          <Button onClick={applyFilters} className="flex-1 text-xs sm:text-sm">
            Apply Filters
          </Button>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="flex-1 text-xs sm:text-sm"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
