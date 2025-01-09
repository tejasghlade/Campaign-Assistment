import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { Trash2Icon } from "lucide-react";
import { Campaign, Schedule } from "../../types/campaign";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CampaignModal: React.FC<{
  campaign: Campaign | null;
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
}> = ({ campaign, onClose, onSave }) => {
  const [type, setType] = useState(campaign?.type || "");
  const [dateRange, setDateRange] = useState({
    from: campaign?.startDate ? new Date(campaign.startDate) : undefined,
    to: campaign?.endDate ? new Date(campaign.endDate) : undefined,
  });
  const [schedule, setSchedule] = useState<Schedule[]>(
    campaign?.schedule || [{ day: "", times: [{ start: "", end: "" }] }]
  );
  useEffect(() => {
    if (!campaign) {
      setType("");
      setDateRange({ from: undefined, to: undefined });
      setSchedule([{ day: "", times: [{ start: "", end: "" }] }]);
    } else {
      setType(campaign.type);
      setDateRange({
        from: campaign.startDate ? new Date(campaign.startDate) : undefined,
        to: campaign.endDate ? new Date(campaign.endDate) : undefined,
      });
      setSchedule(campaign.schedule);
    }
  }, [campaign]);

  const handleSave = () => {
    onSave({
      type,
      startDate: dateRange.from
        ? dateRange.from.toISOString().split("T")[0]
        : "",
      endDate: dateRange.to ? dateRange.to.toISOString().split("T")[0] : "",
      schedule,
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
    setType("");
    setDateRange({ from: undefined, to: undefined });
    setSchedule([{ day: "", times: [{ start: "", end: "" }] }]);
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: "", times: [{ start: "", end: "" }] }]);
  };

  const handleRemoveSchedule = (index: number) => {
    if (schedule.length > 1) {
      const newSchedule = schedule.filter((_, i) => i !== index);
      setSchedule(newSchedule);
    }
  };

  const handleScheduleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const handleTimeChange = (
    index: number,
    timeIndex: number,
    field: string,
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index].times[timeIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleAddTime = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].times.push({ start: "", end: "" });
    setSchedule(newSchedule);
  };

  const handleRemoveTime = (index: number, timeIndex: number) => {
    const newSchedule = [...schedule];
    if (newSchedule[index].times.length > 1) {
      newSchedule[index].times = newSchedule[index].times.filter(
        (_, i) => i !== timeIndex
      );
      setSchedule(newSchedule);
    }
  };

  return (
    <DialogContent className=" border-1 border-slate-700">
      <DialogHeader>
        <DialogTitle>
          {campaign ? "Edit Campaign" : "Create Campaign"}
        </DialogTitle>
        <DialogDescription>
          Fill in the details for the campaign.
        </DialogDescription>
      </DialogHeader>
      <div>
        <label>Type</label>
        <Select value={type} onValueChange={(value) => setType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cost per Order">Cost per Order</SelectItem>
            <SelectItem value="Cost per Click">Cost per Click</SelectItem>
            <SelectItem value="Buy One Get One">Buy One Get One</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label>Date Range</label>
        <DatePickerWithRange
          className="w-full"
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
      <div>
        <label>Schedule</label>
        {schedule.map((sched, index) => (
          <div key={index} className="mb-4">
            <Select
              value={sched.day}
              onValueChange={(value) =>
                handleScheduleChange(index, "day", value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {weekdays.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              {sched.times.map((time, timeIndex) => (
                <div
                  key={timeIndex}
                  className="flex space-x-2 mt-2 align-baseline items-baseline"
                >
                  <Input
                    type="time"
                    value={time.start}
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        timeIndex,
                        "start",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    type="time"
                    value={time.end}
                    onChange={(e) =>
                      handleTimeChange(index, timeIndex, "end", e.target.value)
                    }
                  />

                  {sched.times.length > 1 ? (
                    <Button
                      type="button"
                      onClick={() => handleRemoveTime(index, timeIndex)}
                    >
                      <Trash2Icon />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleAddTime(index)}
                      className="mt-2"
                    >
                      Add Time
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {schedule.length > 1 && (
              <Button
                type="button"
                onClick={() => handleRemoveSchedule(index)}
                className="mt-2 bg-red-600 hover:bg-red-500"
              >
                Remove Day
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={handleAddSchedule}>
          Add Day
        </Button>
      </div>
      <div className="flex gap-3 w-full">
        {/* <Button className="w-full" onClick={handleClose}>
          Close
        </Button> */}
        <Button className="w-full" onClick={handleSave}>
          Save
        </Button>
      </div>
    </DialogContent>
  );
};
