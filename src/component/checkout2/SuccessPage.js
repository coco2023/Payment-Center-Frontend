import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessPage = () => {
    const salesOrderData = JSON.parse(sessionStorage.getItem("salesOrderData"));
    console.log("sessionStorage: salesOrderDetailData", salesOrderData)

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Order Number: {salesOrderData.salesOrderSn}</p>
            <p>Supplier ID: {salesOrderData.supplierId}</p>
        </div>
    );
};

export default SuccessPage;
