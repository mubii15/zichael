
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    items: [
      { name: 'Classic Tailored Suit', quantity: 1, price: 499.99 },
      { name: 'Cotton Oxford Shirt', quantity: 2, price: 89.99 }
    ],
    totalPrice: 679.97,
    orderDate: '2025-04-01',
    status: 'Pending'
  },
  {
    id: 'ORD-002',
    customerName: 'Emma Johnson',
    items: [
      { name: 'Designer Evening Gown', quantity: 1, price: 899.99 }
    ],
    totalPrice: 899.99,
    orderDate: '2025-04-02',
    status: 'Processing'
  },
  {
    id: 'ORD-003',
    customerName: 'Michael Brown',
    items: [
      { name: 'Silk Blouse', quantity: 1, price: 129.99 },
      { name: 'Cotton Blend Midi Skirt', quantity: 1, price: 79.99 }
    ],
    totalPrice: 209.98,
    orderDate: '2025-04-03',
    status: 'Shipped'
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Wilson',
    items: [
      { name: 'Kids Dress Set', quantity: 1, price: 79.99 }
    ],
    totalPrice: 79.99,
    orderDate: '2025-04-03',
    status: 'Cancelled'
  }
];

const statusOptions = [
  { value: 'Pending', label: 'Pending', icon: Clock },
  { value: 'Processing', label: 'Processing', icon: Clock },
  { value: 'Shipped', label: 'Shipped', icon: Truck },
  { value: 'Cancelled', label: 'Cancelled', icon: XCircle },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Pending': return <Clock size={16} className="text-yellow-500" />;
      case 'Processing': return <Clock size={16} className="text-blue-500" />;
      case 'Shipped': return <Truck size={16} className="text-green-500" />;
      case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-sm font-medium hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 md:mb-0">Manage Orders</h1>
          </div>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table className="border border-gray-200 rounded-lg overflow-hidden">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm truncate">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{order.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center">
                                <option.icon size={16} className="mr-2" />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-8 bg-white border border-gray-200 rounded-lg">
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminOrders;
