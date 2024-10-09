CREATE TABLE GasStations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20)
);

CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    unit_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE PumpStations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gas_station_id INT NOT NULL,
    product_id INT NOT NULL,
    status ENUM('active', 'maintenance') DEFAULT 'active',
    FOREIGN KEY (gas_station_id) REFERENCES GasStations(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gas_station_id INT NOT NULL,
    pump_station_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gas_station_id) REFERENCES GasStations(id),
    FOREIGN KEY (pump_station_id) REFERENCES PumpStations(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
