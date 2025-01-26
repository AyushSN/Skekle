async function getCustomerData(email) {
    const url = `http://localhost:400/v1/customers?email=${encodeURIComponent(email)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length === 0) { // Adjust this condition based on how the API returns empty responses
            return 'User does not exist';
        }
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'Error fetching customer data'; // Return a message indicating an error occurred
    }
}