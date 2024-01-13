import React from "react";
import { useSearchParams } from "react-router-dom";

const Cancel = () => {
  const [searchParams] = useSearchParams();
  const salesOrderSn = searchParams.get("salesOrderSn");
  const supplierId = searchParams.get("supplierId");

  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Order Number: {salesOrderSn}</p>
      <p>Supplier ID: {supplierId}</p>
    </div>
  );
};

export default Cancel;
