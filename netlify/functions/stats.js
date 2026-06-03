import { connectToDatabase } from './utils/dbConnect';

export async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    const customersCollection = db.collection('customers');

    if (event.httpMethod === 'GET') {
      const total = await ordersCollection.countDocuments({});
      const pending = await ordersCollection.countDocuments({ status: "Pending" });
      const confirmed = await ordersCollection.countDocuments({ status: "Confirmed" });
      const preparing = await ordersCollection.countDocuments({ status: "Preparing" });
      const ready = await ordersCollection.countDocuments({ status: "Ready For Delivery" });
      const delivered = await ordersCollection.countDocuments({ status: "Delivered" });
      const cancelled = await ordersCollection.countDocuments({ status: "Cancelled" });
      const totalCustomers = await customersCollection.countDocuments({});

      const stats = {
        total,
        pending,
        confirmed,
        preparing,
        ready,
        delivered,
        cancelled,
        totalCustomers
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stats)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed.' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}
