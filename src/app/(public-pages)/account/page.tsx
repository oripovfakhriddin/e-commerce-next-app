"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/Edit";
import useAuthStore from "@/store/auth/auth";
import "./style.scss";
import Image from "next/image";

// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "VODIY PARFUM | HISOBIM",
//   description:
//     "VODIY PARFUME internet do'konidagi hisobim!",
// };

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PublicAccountPage = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data, token, isAuthenticated, loading } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <section id="account">
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="account data"
              centered
            >
              <Tab
                icon={<PersonPinIcon />}
                label="Ma'lumot"
                {...a11yProps(0)}
              />
              <Tab icon={<EditIcon />} label="Tahrirlash" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className = "account__box">

            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default PublicAccountPage;
