# Sơ đồ ERD thể hiện quan hệ giữa các bảng
![image](https://github.com/user-attachments/assets/b17bc25b-c48c-4383-a825-3a659a342171)


# Thiết kế cấu trúc cơ sở dữ liệu:
a. Bảng Trạm xăng (GasStations):
- id (khóa chính)
- name
- address
- phone_number

b. Bảng Hàng hóa (Products):
- id (khóa chính)
- name (ví dụ: A95, E5, DO)
- description
- unit_price

c. Bảng Trụ bơm (PumpStations):
- id (khóa chính)
- gas_station_id (khóa ngoại tới GasStations)
- product_id (khóa ngoại tới Products)
- status (ví dụ: active, maintenance)


d. Bảng Giao dịch (Transactions):
- id (khóa chính)
- gas_station_id (khóa ngoại tới GasStations)
- pump_station_id (khóa ngoại tới PumpStations)
- product_id (khóa ngoại tới Products)
- quantity
- total_amount
- transaction_date
