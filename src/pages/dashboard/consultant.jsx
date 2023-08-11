import AddNewConsultant from "@/components/AddNewConsultant/AddNewConsultant";
import Booking from "@/components/Bookings/Booking";
import Consultants from "@/components/Consultants/Consultants";
import {
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

export function Consultant() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["blue", "green", "orange", "red"];

  const [tabValue, setTabValue] = useState(0);
  return (
    <div>
      <Card className="mx-3 mt-5 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="w-[100%]">
            <Tabs value="app">
              <TabsHeader>
                <Tab
                  value="app"
                  className="w-[35%]"
                  onClick={() => setTabValue(0)}
                >
                  <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Add New
                </Tab>
                <Tab
                  value="message"
                  className="w-[30%]"
                  onClick={() => setTabValue(1)}
                >
                  <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                  Consultants
                </Tab>
                <Tab
                  value="settings"
                  className="w-[35%]"
                  onClick={() => setTabValue(2)}
                >
                  <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Bookings
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {tabValue == 0 && <AddNewConsultant />}
          {tabValue == 1 && <Consultants />}
          {tabValue == 2 && <Booking />}
        </CardBody>
      </Card>
    </div>
  );
}

export default Consultant;
