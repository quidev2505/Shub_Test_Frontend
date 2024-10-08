"use client";
import { useCallback, useState } from "react";
import * as XLSX from "xlsx";

export default function DataReport() {
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [minTimeDefault, setMinTimeDefault] = useState("");
  const [maxTimeDefault, setMaxTimeDefault] = useState("");
  const [dataFile, setDataFile] = useState([]);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const readExcelFile = useCallback(
    async (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });
    },
    [file]
  );

  const handleReadFile = async () => {
    try {
      setIsLoadingUpload(true);
      const jsonData: any = await readExcelFile(file);
      const minDateGet = jsonData[4][1].split("-")[0].trim();
      const maxDateGet = jsonData[4][4].split("-")[0].trim();
      setMinTimeDefault(
        minDateGet.split("/")[2] +
          "-" +
          minDateGet.split("/")[1] +
          "-" +
          minDateGet.split("/")[0] +
          "T00:00:00"
      );
      setMaxTimeDefault(
        maxDateGet.split("/")[2] +
          "-" +
          maxDateGet.split("/")[1] +
          "-" +
          maxDateGet.split("/")[0] +
          "T23:59:59"
      );
      setDataFile(jsonData);
      setIsLoadingUpload(false);
    } catch (e) {
      alert("Có lỗi upload xảy ra: " + e);
    }
  };

  const calculateTotal = () => {
    setIsLoading(true);
    const timeStart = new Date(startTime).getTime();
    const timeEnd = new Date(endTime).getTime();

    if (!file) {
      alert("Vui lòng chọn file");
      return;
    } else if (!startTime || !endTime) {
      alert("Vui lòng nhập khoảng thời gian");
      return;
    } else if (timeStart > timeEnd) {
      alert("Vui lòng chọn giờ bắt đầu sớm hơn giờ kết thúc");
      return;
    }

    try {
      // Tìm vị trí của các cột cần thiết
      const headers: any[] = dataFile[7];
      // console.log(headers);
      const dateIndex = headers.findIndex((h) => h === "Ngày");
      const timeIndex = headers.findIndex((h) => h === "Giờ");
      const amountIndex = headers.findIndex((h) => h === "Thành tiền (VNĐ)");

      if (dateIndex === -1 || timeIndex === -1 || amountIndex === -1) {
        throw new Error("Không tìm thấy các cột cần thiết trong file Excel");
      }

      // // Lọc và tính tổng
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);

      // 2024-03-21T21:08:15
      // 21 / 03 / 2024;
      let total = 0;
      for (let i = 8; i < dataFile.length; i++) {
        const row = dataFile[i];
        const colDate: string = row[dateIndex];
        const colTime: string = row[timeIndex];
        if (colDate && colTime) {
          const dateSplit = colDate.split("/");
          const connectDate =
            dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
          const dateTime = new Date(`${connectDate}T${row[timeIndex]}`);
          if (dateTime >= startDateTime && dateTime <= endDateTime) {
            total += parseFloat(row[amountIndex]) || 0;
          }
        }
      }
      setTotalAmount(total);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi xử lý file:", error);
      alert("Có lỗi xảy ra khi xử lý file.");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl h-screen flex items-center justify-center">
      <div className="w-[500px] flex flex-col bg-orange-300 p-8 rounded-md space-y-6">
        <h1 className="font-bold text-5xl text-white mx-auto">Data Report</h1>
        <div>
          <label className="font-bold">Chọn file upload</label>
          {isLoadingUpload && (
            <p>
              {" "}
              <p className="my-2 text-red text-sm bg-white font-bold p-4 border rounded-sm text-center mx-auto">
                Vui lòng chờ file upload...
              </p>
            </p>
          )}
          <div className="flex justify-between">
            <input
              className="border border-white p-3"
              type="file"
              onChange={handleFileUpload}
              accept=".xlsx"
              placeholder="Chọn file xlsx"
            />
            <button
              className="bg-white text-black p-4 rounded-md font-bold"
              onClick={handleReadFile}
            >
              Upload
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <label className="font-bold">Chọn giờ bắt đầu</label>
          <input
            type="datetime-local"
            value={startTime}
            step={1}
            min={minTimeDefault}
            max={maxTimeDefault}
            placeholder="Nhập vào giờ bắt đầu"
            className="p-3"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="font-bold">Chọn giờ kết thúc</label>
          <input
            type="datetime-local"
            value={endTime}
            min={minTimeDefault}
            max={maxTimeDefault}
            step={1}
            className="p-3"
            placeholder="Nhập vào giờ kết thúc"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button className="bg-black text-white p-4" onClick={calculateTotal}>
          Tính tổng
        </button>
        {isLoading ? (
          <p className="text-red text-sm bg-white font-bold p-4 border rounded-sm text-center mx-auto">
            Vui lòng chờ trong giây lát...
          </p>
        ) : (
          <div className="bg-white rounded-md w-fit p-4 m-auto">
            <p className="font-bold text-xl">
              Tổng thành tiền:{" "}
              <span className="text-red-600">
                {totalAmount.toLocaleString()} VNĐ
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
