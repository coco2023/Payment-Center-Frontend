import React, { useState } from "react";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

const Checkout = () => {
  const [orderDetails, setOrderDetails] = useState({
    salesOrderSn: "SN12350",
    customerId: 1,
    supplierId: 1,
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    totalAmount: 19.0,
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
        unitPrice: 2.0,
        discount: 0.1,
        lineTotal: 19.0,
      },
    ],
  });

  const createOrder = () => {
    Axios.post(
      "http://localhost:9024/api/users/checkout/create-order",
      orderDetails
    )
      .then((response) => {
        console.log("Order created:", response.data);
        // Handle additional logic or state updates
      })
      .catch((error) => console.error("Error creating order", error));
  };

  const processPaymentWithPayPal = async (salesOrder) => {
    try {
      const response = await fetch(
        `http://localhost:9024/api/users/checkout/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(salesOrder),
        }
      );

      console.log("salesOrder: ", salesOrder);
      const responseData = await response.json();
      console.log(
        "PayPal create - responseData: " + JSON.stringify(responseData)
      );

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to initiate PayPal payment"
        );
      }

      return responseData.approvalUrl; // Assuming the response contains the redirect URL
    } catch (error) {
      console.error("Error initiating PayPal payment:", error);
      throw error;
    }
  };

  const onPaymentSuccess = (details, data) => {
    Axios.post(
      `http://localhost:9011/api/v1/payments/paypal/complete?paymentId=${data.paymentID}&PayerID=${data.payerID}&SupplierId=${orderDetails.supplierId}`
    )
      .then((response) => {
        console.log("Payment successful:", response.data);
        // Redirect to success page or handle success logic
      })
      .catch((error) => console.error("Error completing payment", error));
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={processPaymentWithPayPal}>Confirm Order</button>
      {/* <PayPalButton
        amount={orderDetails.totalAmount}
        onSuccess={onPaymentSuccess}
        options={{
          clientId:
            "AWhLD4_pmHlrCpHJSSKobJ4nwbwy_e16mcgbtrL_M5DzBaJk9zj84QYazMoy5TB7htSmjry7_ArOE9yU",
        }}
      /> */}
    </div>
  );
};

export default Checkout;
