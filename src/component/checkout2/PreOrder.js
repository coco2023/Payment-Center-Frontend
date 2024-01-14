import React, { useState, useEffect } from "react";
import { processPaymentWithPayPal, processPaymentWithStripe, processPaymentWithAlipay } from "./CheckoutUtil";

const PreOrder = () => {
  const [salesOrder, setSalesOrder] = useState({
    salesOrderSn: `SO-${new Date().getTime()}-${Math.floor(
      Math.random() * 10000
    )}`,
    customerId: 1,
    supplierId: 1,
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    totalAmount: 1.00,
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
        lineTotal: 1.0,
      },
    ],
  });

  const [ aliSalesOrder, setAliSalesOrder ] = useState({
    amount: 1.00,
    currency: "CNY",
    orderNumber: `SO-${new Date().getTime()}-${Math.floor(
      Math.random() * 10000
    )}`
  });
  
  sessionStorage.setItem("salesOrderData", JSON.stringify(salesOrder));

  // input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSalesOrder({ ...salesOrder, [name]: value });
  };

  const payPalOnClick = async () => {
    processPaymentWithPayPal(salesOrder);
  };

  // TODO: add payment methods
  const stripeOnClick = async () => {
        processPaymentWithStripe("tok_visa", salesOrder, salesOrder.salesOrderDetail);
  };

  const aliPayOnClick = async () => {
        processPaymentWithAlipay(aliSalesOrder.amount, aliSalesOrder.currency, aliSalesOrder.orderNumber);
  };

  const klarnaOnClick = async () => {
    //     processPaymentWithKlarnaPay(salesOrder);
  };

  const applePayOnClick = async () => {
    //     processPaymentWithApplePay(salesOrder);
  };

  const googlePayOnClick = async () => {
    //     processPaymentWithGooglePay(salesOrder);
  };

  const aterPayPayOnClick = async () => {
    //     processPaymentWithAfterPay(salesOrder);
  };

  return (
    <div>
      <h1>Checkout Page</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          // processPaymentWithPayPal(salesOrder);
        }}
      >
        <input
          type="text"
          name="customerName"
          value={salesOrder.customerName}
          onChange={handleInputChange}
          placeholder="Customer Name"
        />
        <input
          type="email"
          name="customerEmail"
          value={salesOrder.customerEmail}
          onChange={handleInputChange}
          placeholder="Customer Email"
        />
        <input
          type="text"
          name="shippingAddress"
          value={salesOrder.shippingAddress}
          onChange={handleInputChange}
          placeholder="Shipping Address"
        />
        <input
          type="text"
          name="billingAddress"
          value={salesOrder.billingAddress}
          onChange={handleInputChange}
          placeholder="Billing Address"
        />
        ($):
        <input
          type="number"
          name="totalAmount"
          value={salesOrder.totalAmount}
          onChange={handleInputChange}
          placeholder="Total Amount"
        />
      </form>

      <button onClick={payPalOnClick}>Confirm Order - PayPal</button>
      <button onClick={stripeOnClick}>Confirm Order - Stripe</button>
      <button onClick={aliPayOnClick}>Confirm Order - Alipay</button>
      <button onClick={klarnaOnClick}>Confirm Order - Klarna</button>
      <button onClick={applePayOnClick}>Confirm Order - Apple Pay</button>
      <button onClick={googlePayOnClick}>Confirm Order - Google Pay</button>
      <button onClick={aterPayPayOnClick}>Confirm Order - AfterPay</button>
      <br />
      <button onClick={aliPayOnClick}>Confirm Order - Affirm</button>
      <button onClick={aliPayOnClick}>Confirm Order - Wechat Pay</button>
      <button onClick={aliPayOnClick}>支付 - 蚂蚁花呗</button>
      <button onClick={aliPayOnClick}>支付 - 京东百条</button>
    </div>
  );
};

export default PreOrder;
