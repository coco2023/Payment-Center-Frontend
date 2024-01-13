import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Processing = () => {
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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentId = queryParams.get("paymentId");
    const payerId = queryParams.get("PayerID");
    const supplierId = orderDetails.supplierId; // JSON.parse(sessionStorage.getItem("supplierId"));

    const completePayPalPayment = async (paymentId, payerId, supplierId) => {
      try {
        const response = await fetch(
          `http://localhost:9011/api/v1/payments/paypal/complete?paymentId=${paymentId}&PayerID=${payerId}&SupplierId=${supplierId}`,
          {
            method: "POST",
          }
        );

        console.log("***response" + response);
        if (!response.ok) {
          throw new Error("Failed to complete PayPal payment");
        }

        const responseData = await response.json();
        console.log(
          "paymentId: " + paymentId + ", payerId: " + payerId,
          "Payment completed successfully:",
          responseData
        );
        return responseData;
      } catch (error) {
        console.error("Error completing PayPal payment:", error);
      }

      const processComplete = async () => {
        if (paymentId && payerId) {
          try {
            const responseData = await completePayPalPayment(
              paymentId,
              payerId,
              supplierId
            );
            // store the orderSn info
            sessionStorage.setItem(
              "orderDataInfo",
              JSON.stringify({
                paymentInfo: responseData,
                salesOrderSn: orderDetails.salesOrderSn,
                orderDetailInfo: orderDetails.salesOrderDetail,
              })
            );
            window.location.href = `/payment-success`;
          } catch (error) {
            // Handle the case where the parameters are not available
            console.error("Payment failed: Missing paymentId or PayerID");
          }
        }
      };

      processComplete();
    };
  }, [orderDetails]);

  return <div>Processing PayPal payment...</div>;
};

export default Processing;
