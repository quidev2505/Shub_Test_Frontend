"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { MenuItem, TextField } from "@mui/material";
import dayjs from "dayjs";

type FormData = {
  time: string;
  quantity: number;
  pump: string;
  revenue: number;
  unitPrice: number;
};

const TransactionForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const listPump = [
    {
      value: "01",
      label: "01",
    },
    {
      value: "02",
      label: "02",
    },
    {
      value: "03",
      label: "03",
    },
    {
      value: "04",
      label: "04",
    },
    {
      value: "05",
      label: "05",
    },
    {
      value: "06",
      label: "06",
    },
  ];

  const onSubmit = (data: FormData) => {
    try {
      if (data) {
        const timeGet = data.time["$d"];
        let dateString = new Date(timeGet).toLocaleDateString();
        let timeString = new Date(timeGet).toLocaleTimeString();
        data.time = dateString + " " + timeString;
        console.log("Data form upload: ", data);
        setSubmitStatus("success");
      }
    } catch (e) {
      console.log("Error");
      setSubmitStatus("error");
    }
  };

  return (
    <div className="w-full h-screen flex items-start justify-center">
      <div className="mx-auto mt-4 p-2 bg-white rounded-lg  max-w-[620px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start mb-6 shadow-lg p-4 border-transparent w-[650px] h-[112px] justify-between mx-auto -ml-5">
            <div className="flex flex-col gap-y-2">
              <button className="mr-auto text-black-500 flex gap-x-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-[13px]">Đóng</span>
              </button>
              <h2 className="text-3xl font-bold text-center flex-grow">
                Nhập giao dịch
              </h2>
            </div>
            <button
              type="submit"
              className="inline-block py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cập nhật
            </button>
          </div>

          <div id="time">
            <Controller
              name="time"
              control={control}
              rules={{ required: "Thời gian là bắt buộc" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    {...field}
                    className="border-none outline-none w-full"
                    ampm={false}
                    slotProps={{
                      textField: {
                        variant: "filled",
                        focused: true,
                      },
                    }}
                    label="Thời gian"
                    views={[
                      "year",
                      "month",
                      "day",
                      "hours",
                      "minutes",
                      "seconds",
                    ]}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.time && (
              <p className="text-sm text-red-600 italic my-2">
                {errors.time.message}
              </p>
            )}
          </div>

          <TextField
            {...register("quantity", {
              required: "Số lượng là bắt buộc",
              min: { value: 0, message: "Số lượng phải lớn hơn 0" },
            })}
            id="quantity"
            label="Số lượng"
            className="w-full rounded-sm mt-4"
            variant="filled"
            type="number"
            inputProps={{ step: "0.01" }}
          />
          {errors.quantity && (
            <p className="text-sm text-red-600 italic my-2">
              {errors.quantity.message}
            </p>
          )}

          <div>
            <Controller
              name="pump"
              control={control}
              rules={{ required: "Trụ là bắt buộc" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="pump"
                  label="Trụ"
                  variant="filled"
                  className="w-full mt-4"
                >
                  {listPump.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errors.pump && (
              <p className="text-sm text-red-600 italic my-2">
                {errors.pump.message}
              </p>
            )}
          </div>

          <TextField
            id="revenue"
            {...register("revenue", {
              required: "Doanh thu là bắt buộc",
              min: { value: 0, message: "Doanh thu phải lớn hơn hoặc bằng 0" },
            })}
            label="Doanh thu"
            className="w-full rounded-sm mt-4"
            variant="filled"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          {errors.revenue && (
            <p className="text-sm text-red-600 italic my-2">
              {errors.revenue.message}
            </p>
          )}

          <TextField
            id="unitPrice"
            {...register("unitPrice", {
              required: "Đơn giá là bắt buộc",
              min: { value: 0, message: "Đơn giá phải lớn hơn 0" },
            })}
            label="Đơn giá"
            className="w-full rounded-sm mt-4"
            variant="filled"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          {errors.unitPrice && (
            <p className="text-sm text-red-600 italic my-2">
              {errors.unitPrice.message}
            </p>
          )}
        </form>

        {submitStatus === "success" && (
          <Alert className="mt-4 bg-green-300" variant="default">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle className="font-bold">Thành công</AlertTitle>
            <AlertDescription>
              Giao dịch đã được cập nhật thành công.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mt-4" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-bold">Lỗi</AlertTitle>
            <AlertDescription>
              Đã xảy ra lỗi khi cập nhật giao dịch. Vui lòng thử lại.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
