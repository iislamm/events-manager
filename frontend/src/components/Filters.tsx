import React, { useState } from "react";
import Select from "react-select";

interface FiltersProps {
  locations: string[];
  onSearchChange: (search: string) => void;
  onLocationsChange: (locations: string[]) => void;
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  locations,
  onSearchChange,
  onLocationsChange,
  onDateRangeChange,
}) => {
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleLocationChange = (selected: any) => {
    const selectedValues = selected
      ? selected.map((option: any) => option.value)
      : [];
    setSelectedLocations(selectedValues);
    onLocationsChange(selectedValues);
  };

  const handleDateChange =
    (isStart: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = e.target.value ? new Date(e.target.value) : null;
      if (isStart) {
        setStartDate(e.target.value);
      } else {
        setEndDate(e.target.value);
      }
      onDateRangeChange(
        isStart ? date : new Date(startDate),
        isStart ? new Date(endDate) : date
      );
    };

  const locationOptions = locations.map((location) => ({
    value: location,
    label: location,
  }));

  return (
    <div className="space-y-4 py-4 bg-white rounded-lg">
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
        </div>
        <div className="w-64">
          <Select
            isMulti
            options={locationOptions}
            onChange={handleLocationChange}
            placeholder="Select locations..."
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#A78BFA",
                "&:hover": {
                  borderColor: "#8B5CF6",
                },
                boxShadow: state.isFocused ? "0 0 0 1px #8B5CF6" : "none",
              }),
            }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="date"
            value={startDate}
            onChange={handleDateChange(true)}
            className="w-full px-4 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
        </div>
        <div className="flex-1">
          <input
            type="date"
            value={endDate}
            onChange={handleDateChange(false)}
            className="w-full px-4 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
