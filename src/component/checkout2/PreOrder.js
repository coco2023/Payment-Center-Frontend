import React, { useState, useEffect } from "react";

const PreOrder = () => {
  const [salseOrder, setSalseOrder] = useState({
    salesOrderSn: `SO-${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`,
    customerId: 1,
    supplierId: 1,
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    totalAmount: 1.0,
    shippingAddress: "1234 Main St, Anytown, AT 12345",
    billingAddress: "1234 Main St, Anytown, AT 12345",
    orderStatus: "PENDING",
    paymentMethod: "PayPal",
    paymentProcessed: false,
    expirationDate: "2024-01-19T15:00:00",
    salesOrderDetail: [
      {
        salesOrderDetailId: 456,
        salesOrderSn: "SN12345",
        skuCode: "SKU00124",
        supplierId: 1,
        quantity: 10,
        unitPrice: 0.11,
        discount: 0.01,
        lineTotal: 1.00,
      },
    ],
  });
  sessionStorage.setItem('salesOrderData', JSON.stringify(salseOrder));

  const processPaymentWithPayPal = async () => {
    try {
      const response = await fetch(
        `http://localhost:9024/api/users/checkout/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(salseOrder), // Make sure salseOrder does not contain circular references
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(
          responseData.message || "Failed to initiate PayPal payment"
        );
      }
      console.log(response)
      const responseData = await response.json();
      console.log("Response from server:", responseData);
      window.location.href = responseData.approvalUrl; // Assuming the response contains the redirect URL

    } catch (error) {
      console.error("Error initiating PayPal payment:", error);
      throw error;
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={processPaymentWithPayPal}>Confirm Order - PayPal</button>
    </div>
  );
};

export default PreOrder;
