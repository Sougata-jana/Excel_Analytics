# Excel Analytics Platform

A powerful platform for uploading Excel files, analyzing data, and generating interactive 2D and 3D charts. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication (JWT-based)
- Excel File Upload and Parsing
- Data Mapping and Visualization
- Downloadable Charts (PNG/PDF)
- Modern Responsive UI
- Admin Dashboard

## Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI for components
- Chart.js for data visualization
- Redux Toolkit for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- SheetJS for Excel parsing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development server:
   ```bash
   # Run backend and frontend concurrently
   npm run dev
   
   # Or run separately
   npm run server  # Backend
   npm run client  # Frontend
   ```

5. Visit `http://localhost:3000` in your browser

## Project Structure

```
excel-analytics/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   └── App.tsx        # Main application component
├── server/                 # Backend Node.js application
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   └── server.js          # Express app setup
└── package.json           # Project dependencies and scripts
```

## Development Timeline

### Week 1 ✅
- Project setup
- User/Admin authentication
- Dashboard layout

### Week 2
- File upload setup
- Excel parsing logic
- Data storage in MongoDB

### Week 3
- Chart rendering with Chart.js
- Dynamic axis selection
- Real-time updates

### Week 4
- Download feature
- AI integration
- Data summaries

### Week 5
- Testing
- Bug fixes
- Deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 