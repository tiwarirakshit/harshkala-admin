
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminOrders from './AdminOrders'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';  
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar'; 


const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.ORIGIN}/orders`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
   
    fetchOrders();
  }, []);

  const trackShipment = async (orderId, trackingNumber) => {
    try {
      const response = await axios.get(
        `${process.env.ICARRY_API_URL}/track?trackingNumber=${trackingNumber}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SHIPROCKET_API_KEY}`,
          },
        }
      );

      console.log(`Shipment status for order ${orderId}: ${response.data.status}`);
    } catch (error) {
      console.error('Error tracking shipment:', error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar name="Track" />

      <div className="flex-grow p-8">
      <AdminTopbar />

        <h1 className="text-2xl font-bold mb-4">Track Customer Order</h1>
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Invoice no</th>
              
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Shipment Number</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                <td className="py-2 px-4 border-b">{order.customerDetails}</td>
                <td className="py-2 px-4 border-b">{order.shipmentNumber}</td>
                <td className="py-2 px-4 border-b">
                  {order.status === 'pending' && (
                    <span className="text-yellow-500">Pending</span>
                  )}
                  {order.status === 'delivered' && (
                    <span className="text-green-500">Delivered</span>
                  )}
                  {order.status === 'dispatched' && (
                    <span className="text-blue-500">Dispatched</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => trackShipment(order.id, order.trackingNumber)}
                  >
                    Track Shipment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;
