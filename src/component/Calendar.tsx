import {
  Calendar as BigCalendar,
  momentLocalizer,
  Event as RBCEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { fetchTrainingsWithCustomers } from "../utils/fetch";
import Box from "@mui/material/Box";
import { Training } from "../utils/types";

const localizer = momentLocalizer(moment);

interface CalendarEvent extends RBCEvent {
  title: string;
  start: Date;
  end: Date;
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchTrainingsWithCustomers().then((trainings: Training[]) => {
      const calendarEvents: CalendarEvent[] = trainings.map((training) => ({
        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
        start: new Date(training.date),
        end: new Date(
          new Date(training.date).getTime() + training.duration * 60000
        ),
      }));
      setEvents(calendarEvents);
    });
  }, []);

  return (
    <Box sx={{ width: "100%", height: "80vh", marginTop: 3 }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        style={{ height: "100%" }}
        popup
        toolbar={true} // <- this line ensures the toolbar shows
      />
    </Box>
  );
}
