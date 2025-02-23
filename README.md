# Integrated Patient Record Management System (IPRMS)

## Overview

The Integrated Patient Record Management System (IPRMS) is a web application designed to streamline healthcare processes and improve patient care. It provides functionalities for doctors, patients, and administrators to manage appointments, prescriptions, and patient records efficiently.

## Features

- **User Authentication**: Secure login for doctors and patients.
- **Dashboard**: Overview of key metrics for administrators, including total patients, doctors, and appointments.
- **Appointment Management**: Patients can book, view, and manage their appointments with doctors.
- **Prescription Management**: Doctors can issue and manage prescriptions for patients.
- **Notifications**: Real-time notifications for users regarding appointments and system updates.
- **Data Visualization**: Charts and graphs to visualize patient demographics and appointment trends.

## Technologies Used

- **Frontend**: 
  - React.js
  - Next.js
  - Tailwind CSS
  - Recharts for data visualization
  - Lucide React for icons

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for database management
  - WebSocket for real-time notifications

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/iprms.git
   cd iprms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the backend:
   - Navigate to the backend directory and install its dependencies.
   - Configure your database connection in the backend configuration file.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **For Doctors**: Log in using your credentials to manage patient appointments and prescriptions.
- **For Patients**: Sign up and log in to book appointments and view your medical history.
- **For Administrators**: Access the admin dashboard to manage users and view system statistics.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors and the open-source community for their support and resources.