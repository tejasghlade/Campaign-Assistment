import React, { useState, useEffect } from "react";

import { Campaign } from "../../types/campaign";
import {  Dialog, DialogTrigger, DialogContent } from "../ui/dialog";

import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { PlusCircle, Edit2Icon, DeleteIcon } from "lucide-react";
import axiosInstance from "../../axiosInstance";
import { Button } from "../ui/button";
import { CampaignModal } from "./CampaignForm";

const CampaignList: React.FC = () => {
  const [data, setData] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axiosInstance.get("/campaigns");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCreateOrEdit = async (campaign: Campaign) => {
    try {
      if (currentCampaign) {
        await axiosInstance.put(`/campaigns/${currentCampaign.id}`, campaign);
        setData(
          data.map((item) => (item.id === currentCampaign.id ? campaign : item))
        );
      } else {
        const response = await axiosInstance.post("/campaigns", campaign);
        setData([...data, { ...response.data, id: data.length + 1 }]);
      }
      setIsModalOpen(false);
      setCurrentCampaign(null);
    } catch (error) {
      console.error("Error saving campaign:", error);
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDelete = async (campaign: Campaign) => {
    try {
      await axiosInstance.delete(`/campaigns/${campaign.id}`);
      setData(data.filter((item) => item.id !== campaign.id));
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const handleOpenCreateForm = () => {
    setCurrentCampaign(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentCampaign(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogTrigger asChild>
          <Button className="my-5" onClick={handleOpenCreateForm}>
            <PlusCircle /> Create Campaign
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CampaignModal
            campaign={currentCampaign}
            onClose={() => setIsModalOpen(false)}
            onSave={handleCreateOrEdit}
          />
        </DialogContent>
      </Dialog>
      <Table className="border-2 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{format(new Date(item.startDate), 'PPP')}</TableCell>
              <TableCell>{format(new Date(item.endDate), 'PPP')}</TableCell>
              <TableCell>
                {item.schedule.map((schedule, scheduleIndex) => (
                  <div key={scheduleIndex}>
                    <strong>{schedule.day}:</strong>{" "}
                    {schedule.times.map((time, timeIndex) => (
                      <span key={timeIndex}>
                        {time.start} - {time.end}
                        {timeIndex < schedule.times.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex gap-3 flex-row w-full">
                  <Button onClick={() => handleEdit(item)}>
                    <Edit2Icon /> Edit
                  </Button>
                  <Button onClick={() => handleDelete(item)}>
                    <DeleteIcon /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignList;