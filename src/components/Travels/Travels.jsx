import React, { useState, useEffect } from "react";

import { Stack, Divider } from "@mui/material";

import dayjs from "dayjs";

import TravelsHeader from "./TravelsHeader/TravelsHeader";
import TravelsList from "./TravelsList/TravelsList";
import AddNewTravelForm from "./AddNewTravelForm/AddNewTravelForm";
import SelectPeriod from "./SelectPeriod/SelectPeriod";
import Popup from "../common/Popup";

const Travels = () => {
  const [travels, setTravels] = useState([]);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [month, setMonth] = useState(dayjs().format("MM"));

  const [showConfirmation, setShowConfirmation] = useState(false);

  const addTravelHandler = (newTravel) => {
    setTravels((prevTravels) => {
      const newArr = [+dayjs(newTravel), ...prevTravels];
      return newArr.sort((x, y) => y - x);
    });

    setYear(dayjs(newTravel).format("YYYY"));
    setMonth(dayjs(newTravel).format("MM"));
    setShowConfirmation({ status: "success", message: "Successfully added ✔" });
  };

  const deleteTravelHandler = (timestamp) => {
    setTravels((prevTravels) => {
      const newArr = [...prevTravels].filter((item) => item !== timestamp);
      return newArr;
    });

    setYear(dayjs(travels[0]).format("YYYY"));
    setMonth(dayjs(travels[0]).format("MM"));
    setShowConfirmation({ status: "success", message: "Successfully deleted ✔" });
  };

  const yearChangeHandler = (newYearValue) => setYear(newYearValue);
  const monthChangeHandler = (newMonthValue) => setMonth(newMonthValue);

  useEffect(() => {
    const data = localStorage.getItem("travelsList");
    if (data) setTravels(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = JSON.stringify(travels);
    localStorage.setItem("travelsList", data);
  }, [travels]);

  // Provide a list of years/months without duplicates
  const yearsList = [...new Set(travels.map((t) => dayjs(t).format("YYYY")))];
  const monthsList = [...new Set(travels.map((t) => dayjs(t).format("MM")))];

  const filteredTravels = travels.filter((t) => {
    return dayjs(t).format("YYYY") === year && dayjs(t).format("MM") === month;
  });

  return (
    <Stack spacing={3}>
      <AddNewTravelForm onAddNewTravel={addTravelHandler} />
      <Divider />
      <TravelsHeader itemsTotal={filteredTravels.length} />
      <SelectPeriod
        year={year}
        yearsList={yearsList}
        onYearChange={yearChangeHandler}
        month={month}
        monthsList={monthsList}
        onMonthChange={monthChangeHandler}
      />
      <TravelsList items={filteredTravels} onDeleteTravel={deleteTravelHandler} />
      {showConfirmation?.status && (
        <Popup
          status={showConfirmation.status}
          message={showConfirmation.message}
          onPopupClose={() => setShowConfirmation(false)}
        />
      )}
    </Stack>
  );
};

export default Travels;
