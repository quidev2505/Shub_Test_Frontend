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
      // Tìm vị trí của các cột
      const headers: any[] = dataFile[7];
      const dateIndex = headers.findIndex((h) => h === "Ngày");
      const timeIndex = headers.findIndex((h) => h === "Giờ");
      const amountIndex = headers.findIndex((h) => h === "Thành tiền (VNĐ)");

      if (dateIndex === -1 || timeIndex === -1 || amountIndex === -1) {
        throw new Error("Không tìm thấy các cột cần thiết trong file Excel");
      }

      // // Lọc và tính tổng
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);

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
    <div className="min-h-screen bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Data Report</h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="file_upload" className="block text-sm font-medium text-gray-700 mb-2">Chọn file upload</label>
            <div className="flex items-center space-x-2">
              <input
                id="file_upload"
                type="file"
                onChange={handleFileUpload}
                accept=".xlsx"
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                onClick={handleReadFile}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Upload
              </button>
            </div>
            {isLoadingUpload && (
              <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
                Vui lòng chờ file upload...
              </p>
            )}
          </div>

          <div>
            <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-2">Chọn giờ bắt đầu</label>
            <input
              id="start_time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              min={minTimeDefault}
              max={maxTimeDefault}
              step={1}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">Chọn giờ kết thúc</label>
            <input
              id="end_time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={minTimeDefault}
              max={maxTimeDefault}
              step={1}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={calculateTotal}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
          >
            Tính tổng
          </button>

          {isLoading ? (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded text-center">
              Vui lòng chờ trong giây lát...
            </p>
          ) : totalAmount > 0 && (
            <div className="bg-gray-100 rounded-md p-4 text-center">
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
    </div>
  );
}
