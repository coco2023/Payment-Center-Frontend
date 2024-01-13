export const processPaymentWithPayPal = async (salesOrder) => {
  try {
    const response = await fetch(
      `http://localhost:9024/api/users/checkout/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesOrder), // Make sure salesOrder does not contain circular references
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(
        responseData.message || "Failed to initiate PayPal payment"
      );
    }
    console.log(response);
    const responseData = await response.json();
    console.log("Response from server:", responseData);
    window.location.href = responseData.approvalUrl; // Assuming the response contains the redirect URL
  } catch (error) {
    console.error("Error initiating PayPal payment:", error);
    throw error;
  }
};

export const processPaymentWithStripe = async (
  stripeToken,
  salesOrder,
  salesOrderDetailData
) => {
  try {
    console.log("Stripe Token:", stripeToken);
    console.log("salesOrder:", salesOrder);

    const response = await fetch(
      `http://localhost:9024/api/users/checkout/stripe/charge`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: stripeToken,
          salesOrder: salesOrder,
        }),
      }
    );

    const responseData = await response.json();

    if (responseData.status == "succeeded") {
      console.log("Payment successful:", responseData);
      // Handle successful payment (e.g., navigate to a success page, update UI)
      sessionStorage.setItem(
        "paymentData",
        JSON.stringify({
          paymentInfo: responseData,
          orderInfo: salesOrder,
          orderDetailInfo: salesOrderDetailData,
        })
      );
      window.location.href = "/payment-success";
    } else {
      console.log("Payment failed:", responseData);
      // Handle failed payment (e.g., display an error message)
      throw new Error(
        `Payment failed: ${responseData.transactionId || "Payment failed"}`
      );
    }
  } catch (error) {
    console.error("Error during payment processing:", error);
    throw new Error(`Payment failed: ${error || "Payment failed"}`);
  }
};
