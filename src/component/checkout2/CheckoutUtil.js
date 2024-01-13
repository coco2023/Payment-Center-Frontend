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
