import React, { useState, useEffect } from 'react';
import { 
  Lock, Eye, FileSpreadsheet, Search, Filter, RefreshCw, 
  Users, ShoppingBag, CheckCircle2, Clock, Truck, XCircle, ChevronRight, Check
} from 'lucide-react';
import { getOrders, getCustomers, getStats, updateOrderStatus, exportToCSV } from '../utils/db';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('orders'); // orders, customers
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({});

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    // Check if already logged in (session check)
    const storedAuth = localStorage.getItem('tcb_admin_auth');
    if (storedAuth === 'true') {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const ords = await getOrders();
      const custs = await getCustomers();
      const st = await getStats();
      setOrders(ords);
      setCustomers(custs);
      setStats(st);
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('tcb_admin_auth', 'true');
      setLoginError('');
      loadData();
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('tcb_admin_auth');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setIsLoading(true);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders(updated);
      const st = await getStats();
      setStats(st);
    } catch (e) {
      console.error("Failed to change order status:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const dataToExport = filteredOrders.map(o => ({
      "Order ID": o.order_id,
      "Customer Name": o.customer_name,
      "Mobile": o.mobile,
      "Email": o.email,
      "Product Name": o.product_name,
      "Category": o.category,
      "Quantity": o.quantity,
      "Weight/Pack Size": o.weight,
      "Flavor": o.flavor,
      "Delivery Date": o.delivery_date,
      "Delivery Time": o.delivery_time,
      "Delivery Address": o.delivery_address,
      "Notes": o.notes,
      "Status": o.status,
      "Created Date": new Date(o.created_at).toLocaleDateString()
    }));
    exportToCSV(dataToExport, `TheCakeBites_Orders_${new Date().toISOString().split('T')[0]}.csv`);
  };

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.mobile.includes(searchQuery) ||
      order.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDate = !dateFilter || order.delivery_date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredCustomers = customers.filter(cust => {
    return cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           cust.mobile.includes(searchQuery) ||
           cust.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Preparing': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Ready For Delivery': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="glass-card max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-bakery-chocolate">Admin Access</h1>
            <p className="text-sm text-gray-500">Log in to manage orders and view business analytics.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-text">Username</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g. admin"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            {loginError && <p className="text-xs text-rose-600 font-semibold">{loginError}</p>}
            
            <p className="text-[10px] text-gray-400 text-center font-medium">Demo Details: Use <span className="font-bold text-gray-600">admin</span> / <span className="font-bold text-gray-600">admin123</span></p>
            
            <button type="submit" className="btn-primary w-full py-3 mt-2 text-sm font-semibold">
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-bakery-pink/15 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-bakery-chocolate">Order Management Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track, update and analyze cake orders and customer data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={loadData}
            disabled={isLoading}
            className="p-2.5 bg-white border border-bakery-pink/15 rounded-xl hover:bg-bakery-softpink text-bakery-chocolate shadow-sm disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-primary-500' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-bakery-dark hover:bg-bakery-chocolate text-white text-sm font-semibold rounded-xl"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl font-extrabold text-bakery-chocolate mt-0.5">{stats.total || 0}</h3>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pending / Confirmed</p>
            <h3 className="text-2xl font-extrabold text-bakery-chocolate mt-0.5">
              {(stats.pending || 0) + (stats.confirmed || 0)}
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Preparing / Out</p>
            <h3 className="text-2xl font-extrabold text-bakery-chocolate mt-0.5">
              {(stats.preparing || 0) + (stats.ready || 0)}
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Delivered Orders</p>
            <h3 className="text-2xl font-extrabold text-bakery-chocolate mt-0.5">{stats.delivered || 0}</h3>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-bakery-pink/15">
        <button
          onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
          className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-bakery-chocolate'
          }`}
        >
          Orders List
        </button>
        <button
          onClick={() => { setActiveTab('customers'); setSearchQuery(''); }}
          className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all ${
            activeTab === 'customers'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-bakery-chocolate'
          }`}
        >
          Customer Base ({stats.totalCustomers || 0})
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="input-field pl-10 py-2.5 text-sm"
              placeholder={activeTab === 'orders' ? "Search Order ID, Name, Mobile, Product..." : "Search Customers by Name, Mobile..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'orders' && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </div>
              
              {/* Status filter */}
              <select
                className="px-3 py-2 bg-white border border-bakery-pink/15 rounded-xl text-xs font-semibold focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready For Delivery">Ready For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* Date Filter */}
              <input
                type="date"
                className="px-3 py-1.5 bg-white border border-bakery-pink/15 rounded-xl text-xs font-semibold focus:outline-none"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />

              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" /> Export CSV
              </button>
            </div>
          )}
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' ? (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bakery-softpink/20 text-xs font-bold text-bakery-chocolate uppercase border-b border-bakery-pink/10">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer Details</th>
                    <th className="px-6 py-4">Product Info</th>
                    <th className="px-6 py-4">Delivery Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bakery-pink/10 text-sm">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-5 font-bold text-primary-600">{order.order_id}</td>
                        <td className="px-6 py-5">
                          <div className="font-semibold text-bakery-chocolate">{order.customer_name}</div>
                          <div className="text-xs text-gray-500">{order.mobile}</div>
                          <div className="text-xs text-gray-400">{order.email}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-semibold text-bakery-chocolate">{order.product_name}</div>
                          <div className="text-xs text-gray-500">
                            {order.weight} • {order.flavor}
                            {order.quantity > 1 && ` • Qty: ${order.quantity}`}
                          </div>
                          {order.notes && (
                            <div className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100 max-w-xs mt-1.5 italic">
                              Note: {order.notes}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-medium text-bakery-chocolate">{new Date(order.delivery_date).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">At {order.delivery_time}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <select
                            className="px-2 py-1 bg-white border border-gray-200 rounded text-xs focus:outline-none"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready For Delivery">Ready For Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-gray-400 font-serif">No orders match the criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Customers Table */
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bakery-softpink/20 text-xs font-bold text-bakery-chocolate uppercase border-b border-bakery-pink/10">
                    <th className="px-6 py-4">Cust ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Mobile</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Total Orders</th>
                    <th className="px-6 py-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bakery-pink/10 text-sm">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((cust) => (
                      <tr key={cust.customer_id} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-500">{cust.customer_id}</td>
                        <td className="px-6 py-5 font-semibold text-bakery-chocolate">{cust.name}</td>
                        <td className="px-6 py-5 text-gray-600">{cust.mobile}</td>
                        <td className="px-6 py-5 text-gray-500">{cust.email || '-'}</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-700 border border-primary-100 font-bold">
                            {cust.total_orders}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-gray-400">
                          {new Date(cust.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-gray-400 font-serif">No customers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
