import { connectToDatabase } from './utils/dbConnect';

export async function handler(event, context) {
  // Allow CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    const customersCollection = db.collection('customers');

    // 1. GET - Fetch all orders
    if (event.httpMethod === 'GET') {
      const orders = await ordersCollection.find({}).sort({ created_at: -1 }).toArray();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(orders)
      };
    }

    // 2. POST - Create new order
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      
      if (!body.customer_name || !body.mobile || !body.product_name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required order fields.' })
        };
      }

      // Generate sequential Order ID: TCB-XXXXX
      const count = await ordersCollection.countDocuments();
      const orderId = `TCB-${String(count + 1).padStart(5, '0')}`;

      // Upsert Customer
      let customer = await customersCollection.findOne({ mobile: body.mobile });
      let customerId;

      if (!customer) {
        const custCount = await customersCollection.countDocuments();
        customerId = `CUST-${String(custCount + 1).padStart(5, '0')}`;
        await customersCollection.insertOne({
          customer_id: customerId,
          name: body.customer_name,
          mobile: body.mobile,
          email: body.email || "",
          address: body.delivery_address || "",
          total_orders: 1,
          created_at: new Date().toISOString()
        });
      } else {
        customerId = customer.customer_id;
        await customersCollection.updateOne(
          { mobile: body.mobile },
          { 
            $inc: { total_orders: 1 },
            $set: { 
              name: body.customer_name,
              email: body.email || customer.email,
              address: body.delivery_address || customer.address
            }
          }
        );
      }

      const newOrder = {
        order_id: orderId,
        customer_id: customerId,
        customer_name: body.customer_name,
        mobile: body.mobile,
        email: body.email || "",
        product_name: body.product_name,
        category: body.category,
        quantity: body.quantity || 1,
        weight: body.weight || "",
        flavor: body.flavor || "",
        delivery_date: body.delivery_date,
        delivery_time: body.delivery_time || "Anytime",
        delivery_address: body.delivery_address || "",
        notes: body.notes || "",
        status: "Pending",
        created_at: new Date().toISOString()
      };

      await ordersCollection.insertOne(newOrder);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newOrder)
      };
    }

    // 3. PUT - Update Order Status
    if (event.httpMethod === 'PUT') {
      const body = JSON.parse(event.body);
      const { order_id, status } = body;

      if (!order_id || !status) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing order_id or status.' })
        };
      }

      const result = await ordersCollection.updateOne(
        { order_id: order_id },
        { $set: { status: status } }
      );

      if (result.matchedCount === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Order not found.' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Order status updated successfully.', order_id, status })
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
