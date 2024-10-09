# Result of Task_4
![image](https://github.com/user-attachments/assets/78b526ff-60eb-4b46-b57a-2c1d71a829b4)
# Bước tính toán
### 1. Lấy và xác thực dữ liệu đầu vào

- Gọi API để lấy dữ liệu đầu vào (mảng số nguyên và danh sách truy vấn).
- Kiểm tra tính hợp lệ của dữ liệu:
  - Đảm bảo độ dài mảng không vượt quá 100,000 phần tử.
  - Xác nhận tất cả các phần tử trong mảng là số nguyên không âm.

### 2. Tính toán mảng tổng tích lũy (Prefix Sum)
- Tạo hai mảng tổng tích lũy:
1. `regularPrefixSum`: Tổng tích lũy thông thường.
2. `alternatePrefixSum`: Tổng tích lũy xen kẽ (cộng số chẵn, trừ số lẻ).

- Duyệt qua mảng đầu vào một lần duy nhất để tính cả hai mảng tổng tích lũy.
### 3. Xử lý các truy vấn
- Với mỗi truy vấn, xác định loại truy vấn (1 hoặc 2) và khoảng [l, r].
- Sử dụng mảng tổng tích lũy phù hợp để tính kết quả:

- Loại 1: `result = regularPrefixSum[r+1] - regularPrefixSum[l]`
- Loại 2: `result = alternatePrefixSum[r+1] - alternatePrefixSum[l]`

### 4. Gửi kết quả
- Đóng gói tất cả kết quả truy vấn vào một mảng.
- Gửi mảng kết quả về server thông qua API, sử dụng token xác thực.
