export const salesOrder = {
  salesOrderSn: `SO-${new Date().getTime()}-${Math.floor(
    Math.random() * 10000
  )}`,
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
      lineTotal: 1.0,
    },
  ],
};
