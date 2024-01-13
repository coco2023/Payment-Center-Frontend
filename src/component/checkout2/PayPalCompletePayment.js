import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PayPalCompletePayment = () => {
  const salesOrderData = JSON.parse(sessionStorage.getItem("salesOrderData"));
  const supplierId = salesOrderData.supplierId;
  console.log("sessionStorage: salesOrderDetailData", salesOrderData);

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
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentId = queryParams.get("paymentId");
    const payerId = queryParams.get("PayerID");

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
              salesOrderSn: salesOrderData.salesOrderSn,
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
  }, []);

  return <div>Processing PayPal payment...</div>;
};

export default PayPalCompletePayment;
