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

export const processPaymentWithAlipay1 = async (amount, orderNumber) => {
  try {
    console.log("aliSalesOrder: " + amount, orderNumber);
    const response = await fetch(
      `http://localhost:9013/api/alipay/create-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          orderNumber: orderNumber,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create Alipay payment");
    }

    const responseBody = await response.json();

    console.log(responseBody);

    // Assuming the API returns a URL to redirect to Alipay's payment page
    // window.location.href = responseBody.paymentUrl;
  } catch (error) {
    console.error("Error during Alipay payment creation:", error);
    // Handle errors appropriately in your UI
  }
};

export const processPaymentWithAlipay2 = async (orderDetails) => {
  try {
    console.log("aliSalesOrder: " + orderDetails);

    const response = await fetch(
      "http://localhost:9013/api/alipay/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      }
    );

    // const data = await response.json();
    if (response.ok) {
      console.log(response);
      // window.location.href = response;
    } else {
      throw new Error(response.error || "Failed to initiate payment");
    }
  } catch (error) {
    console.error("Payment error:", error);
    // Handle error in the UI
  }
};

export const processPaymentWithAlipay = async (amount, currency, orderNumber) => {
  try {
    const response = await fetch(
      "http://localhost:9013/api/alipay/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
          orderNumber: orderNumber, //orderNumber,
        }),
      }
    );
    // Handle the response
    // handlePaymentResponse(response.data);
    // This function will handle the PaymentResponse
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (responseData.paymentUrl) {
      // Directly write the HTML form to the document body and submit it
      document.body.innerHTML = responseData.paymentUrl;
      document.forms[0].submit();
    } else {
      console.error("Payment URL not received");
    }

    // console.log("response: " + response.data, " " + response.json() + " " + response.body)
    // if (response.data.paymentUrl) {
    //   document.body.innerHTML = response.data.paymentUrl;
    // } else {
    //   console.error("Payment URL not received");
    // }
  } catch (error) {
    console.error("Error during payment request", error);
  }
};

// export const handlePaymentResponse = (data) => {
//   // This function will handle the PaymentResponse
//   if (data.paymentUrl) {
//     document.body.innerHTML = data.paymentUrl;
//   } else {
//     console.error("Payment URL not received");
//   }
// };
