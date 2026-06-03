// Default seed data for demo purposes
const DEFAULT_CUSTOMERS = [
  {
    customer_id: "CUST-00001",
    name: "Arun Kumar",
    mobile: "9876543210",
    email: "arun@gmail.com",
    address: "12, Mount Road, Chennai, Tamil Nadu - 600002",
    total_orders: 5,
    created_at: "2026-01-10T10:30:00.000Z"
  },
  {
    customer_id: "CUST-00002",
    name: "Priyanka Raghavan",
    mobile: "9940123456",
    email: "priyanka@yahoo.com",
    address: "Block A, Prestige Apartments, OMR, Chennai - 600097",
    total_orders: 2,
    created_at: "2026-02-14T14:20:00.000Z"
  },
  {
    customer_id: "CUST-00003",
    name: "Karthik Subramanian",
    mobile: "9845098765",
    email: "karthik.s@gmail.com",
    address: "45, RS Puram, Coimbatore, Tamil Nadu - 641002",
    total_orders: 1,
    created_at: "2026-03-22T11:15:00.000Z"
  }
];

const DEFAULT_ORDERS = [
  {
    order_id: "TCB-00001",
    customer_id: "CUST-00001",
    customer_name: "Arun Kumar",
    mobile: "9876543210",
    email: "arun@gmail.com",
    product_name: "Classic Chocolate Truffle",
    category: "Birthday Cakes",
    quantity: 1,
    weight: "1 KG",
    flavor: "Classic Dark Chocolate",
    delivery_date: "2026-06-10",
    delivery_time: "17:00",
    delivery_address: "12, Mount Road, Chennai, Tamil Nadu - 600002",
    notes: "Please write 'Happy Birthday Arun' on the cake. Eggless option preferred.",
    status: "Confirmed",
    created_at: "2026-06-01T10:30:00.000Z"
  },
  {
    order_id: "TCB-00002",
    customer_id: "CUST-00002",
    customer_name: "Priyanka Raghavan",
    mobile: "9940123456",
    email: "priyanka@yahoo.com",
    product_name: "Princess Castle Theme Cake",
    category: "Custom Cakes",
    quantity: 1,
    weight: "2 KG",
    flavor: "Chocolate Fudge",
    delivery_date: "2026-06-15",
    delivery_time: "15:00",
    delivery_address: "Block A, Prestige Apartments, OMR, Chennai - 600097",
    notes: "Make it light pink fondant with glitter stars.",
    status: "Pending",
    created_at: "2026-06-02T14:20:00.000Z"
  },
  {
    order_id: "TCB-00003",
    customer_id: "CUST-00003",
    customer_name: "Karthik Subramanian",
    mobile: "9845098765",
    email: "karthik.s@gmail.com",
    product_name: "Nutella Overload Brownies",
    category: "Nutella Brownies",
    quantity: 1,
    weight: "Box of 12",
    flavor: "Nutella Swirl",
    delivery_date: "2026-06-05",
    delivery_time: "18:00",
    delivery_address: "45, RS Puram, Coimbatore, Tamil Nadu - 641002",
    notes: "Add some extra toasted hazelnuts on top.",
    status: "Preparing",
    created_at: "2026-06-03T11:15:00.000Z"
  },
  {
    order_id: "TCB-00004",
    customer_id: "CUST-00001",
    customer_name: "Arun Kumar",
    mobile: "9876543210",
    email: "arun@gmail.com",
    product_name: "Classic Fudgy Brownie Box",
    category: "Brownie Boxes",
    quantity: 1,
    weight: "Box of 6",
    flavor: "Classic Fudgy",
    delivery_date: "2026-05-10",
    delivery_time: "12:00",
    delivery_address: "12, Mount Road, Chennai, Tamil Nadu - 600002",
    notes: "",
    status: "Delivered",
    created_at: "2026-05-09T09:00:00.000Z"
  }
];

const ORDERS_KEY = "tcb_orders_db";
const CUSTOMERS_KEY = "tcb_customers_db";

export const initDb = () => {
  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_ORDERS));
  }
  if (!localStorage.getItem(CUSTOMERS_KEY)) {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(DEFAULT_CUSTOMERS));
  }
};

// Check if API endpoints are reachable
let apiAvailable = false;
const checkApiAvailability = async () => {
  try {
    const res = await fetch('/api/stats', { method: 'GET', signal: AbortSignal.timeout(2000) });
    if (res.status === 200) {
      apiAvailable = true;
    }
  } catch (err) {
    apiAvailable = false;
  }
};
checkApiAvailability();

// Asynchronous API and Local Storage Gateway
export const getOrders = async () => {
  await checkApiAvailability();
  if (apiAvailable) {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("API failed, falling back to LocalStorage:", e);
    }
  }
  initDb();
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
};

export const getCustomers = async () => {
  await checkApiAvailability();
  if (apiAvailable) {
    try {
      const res = await fetch('/api/customers');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("API failed, falling back to LocalStorage:", e);
    }
  }
  initDb();
  return JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];
};

export const addOrder = async (orderData) => {
  await checkApiAvailability();
  if (apiAvailable) {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("API failed, falling back to LocalStorage:", e);
    }
  }
  
  // LocalStorage Fallback logic
  initDb();
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  const customers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];

  const nextOrderNum = orders.length > 0 
    ? Math.max(...orders.map(o => parseInt(o.order_id.split('-')[1]))) + 1 
    : 1;
  const orderId = `TCB-${String(nextOrderNum).padStart(5, '0')}`;

  let customer = customers.find(c => c.mobile === orderData.mobile);
  if (!customer) {
    const nextCustNum = customers.length > 0
      ? Math.max(...customers.map(c => parseInt(c.customer_id.split('-')[1]))) + 1
      : 1;
    customer = {
      customer_id: `CUST-${String(nextCustNum).padStart(5, '0')}`,
      name: orderData.customer_name,
      mobile: orderData.mobile,
      email: orderData.email || "",
      address: orderData.delivery_address || "",
      total_orders: 1,
      created_at: new Date().toISOString()
    };
    customers.push(customer);
  } else {
    customer.total_orders += 1;
    customer.name = orderData.customer_name;
    if (orderData.email) customer.email = orderData.email;
    if (orderData.delivery_address) customer.address = orderData.delivery_address;
  }

  const newOrder = {
    order_id: orderId,
    customer_id: customer.customer_id,
    customer_name: orderData.customer_name,
    mobile: orderData.mobile,
    email: orderData.email || "",
    product_name: orderData.product_name,
    category: orderData.category,
    quantity: orderData.quantity || 1,
    weight: orderData.weight || "",
    flavor: orderData.flavor || "",
    delivery_date: orderData.delivery_date,
    delivery_time: orderData.delivery_time || "Anytime",
    delivery_address: orderData.delivery_address || "",
    notes: orderData.notes || "",
    status: "Pending",
    created_at: new Date().toISOString()
  };

  orders.push(newOrder);

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));

  return newOrder;
};

export const updateOrderStatus = async (orderId, newStatus) => {
  await checkApiAvailability();
  if (apiAvailable) {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, status: newStatus })
      });
      if (res.ok) {
        // Return updated list from API
        return await getOrders();
      }
    } catch (e) {
      console.warn("API failed, falling back to LocalStorage:", e);
    }
  }

  initDb();
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  const updatedOrders = orders.map(order => {
    if (order.order_id === orderId) {
      return { ...order, status: newStatus };
    }
    return order;
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
};

export const getStats = async () => {
  await checkApiAvailability();
  if (apiAvailable) {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("API failed, falling back to LocalStorage:", e);
    }
  }

  initDb();
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  const customers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY)) || [];

  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const confirmed = orders.filter(o => o.status === "Confirmed").length;
  const preparing = orders.filter(o => o.status === "Preparing").length;
  const ready = orders.filter(o => o.status === "Ready For Delivery").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  return {
    total,
    pending,
    confirmed,
    preparing,
    ready,
    delivered,
    cancelled,
    totalCustomers: customers.length
  };
};

export const exportToCSV = (data, filename = "orders.csv") => {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), 
    ...data.map(row => 
      headers.map(header => {
        const val = row[header] !== undefined ? row[header] : '';
        const escaped = ('' + val).replace(/"/g, '""');
        return /[\n,"]/.test(escaped) ? `"${escaped}"` : escaped;
      }).join(',')
    )
  ];

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
