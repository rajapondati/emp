CREATE DATABASE company;
USE company;

CREATE TABLE employees (
  emp_no INT PRIMARY KEY,
  name VARCHAR(100),
  designation VARCHAR(100),
  salary DECIMAL(10,2)
);
