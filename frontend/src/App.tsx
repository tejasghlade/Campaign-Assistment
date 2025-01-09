import React from "react";
import CampaignList from "./components/campaign/CampaignList";

const App: React.FC = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 a flex flex-col gap-2 flex-1 w-full h-full">
        <div>
          <CampaignList />
        </div>
      </div>
    </div>
  );
};

export default App;
