import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Controller } from "react-hook-form";

interface DateTimePickerProps {
  control: any,
  name: string,
  className?: string,
  setDateTime: any,
  currentDateTime?: any,
}

export default function DateTimePicker({
  setDateTime,
  control,
  name,
  className,
  currentDateTime
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<any>(
    new Date(currentDateTime ? currentDateTime : Date.now()),
  );

  const handleDateChange = (date: any) => {
    setDateTime(name, date)
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <Controller
        control={control}
        name={name}
        render={(ref, ...rest) => (
          <KeyboardDatePicker
            variant="inline"
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            maxDate={new Date()}
            className={className}
            onChange={handleDateChange}
            value={selectedDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            {...rest}
          />
        )}
      >
      </Controller>

    </MuiPickersUtilsProvider>
  );
}
