import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // Change if your backend runs elsewhere

// Fetch dashboard data
export const fetchDashboardData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return null;
    }
};
