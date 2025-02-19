const axios = require('axios');

const users = [
    { name: 'John Doe', email: 'john@example.com', password: 'hashedpassword1', company_name: 'TechCorp', phone: '0712345678' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'hashedpassword2', company_name: 'TechCorp', phone: '0723456789' },
    { name: 'Alice Johnson', email: 'alice@example.com', password: 'hashedpassword3', company_name: 'TechCorp', phone: '0734567890' }
];

const categories = ['Laptops', 'Vehicles', 'Machinery', 'Land', 'Buildings', 'Equipment'];

const assets = Array.from({ length: 50 }, (_, i) => ({
    serial_number: `SN${i + 1}`,
    name: `${categories[i % categories.length]} ${i + 1}`,
    category: categories[i % categories.length],
    owner_id: (i % 3) + 1,
    gps_tracker_id: `GPS${i + 1}`,
    value: (Math.random() * 1000000).toFixed(2),
    state: Math.random() > 0.5 ? 'Active' : 'Inactive'
}));

const gpsData = Array.from({ length: 100 }, () => ({
    asset_id: Math.floor(Math.random() * 50) + 1,
    latitude: (1.2921 + (Math.random() * 2 - 1) * 5).toFixed(6),
    longitude: (36.8219 + (Math.random() * 2 - 1) * 5).toFixed(6),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString()
}));

const transactions = Array.from({ length: 20 }, () => ({
    user_id: Math.floor(Math.random() * 3) + 1,
    asset_id: Math.floor(Math.random() * 50) + 1,
    amount: (Math.random() * 50000).toFixed(2),
    payment_status: Math.random() > 0.5 ? 'Paid' : 'Pending',
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString()
}));

async function sendData(endpoint, data) {
    try {
        const response = await axios.post(`https://api.example.com/${endpoint}`, data);
        console.log(`${endpoint} data sent successfully`, response.data);
    } catch (error) {
        console.error(`Error sending ${endpoint} data`, error);
    }
}

(async () => {
    await sendData('users', users);
    await sendData('categories', categories.map(name => ({ name })));
    await sendData('assets', assets);
    await sendData('gps-data', gpsData);
    await sendData('transactions', transactions);
})();
