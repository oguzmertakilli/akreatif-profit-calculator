import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EcomProfitCalculator() {
const [purchaseCost, setPurchaseCost] = useState("");
const [shippingCost, setShippingCost] = useState("");
const [serviceFee, setServiceFee] = useState("");
const [commissionRate, setCommissionRate] = useState("");
const [salePrice, setSalePrice] = useState("");
const [targetMargin, setTargetMargin] = useState("");

const pCost = parseFloat(purchaseCost) || 0;
const sCost = parseFloat(shippingCost) || 0;
const sFee  = parseFloat(serviceFee) || 0;
const cRate = parseFloat(commissionRate) || 0;
const sPrice = parseFloat(salePrice) || 0;

const commissionAmount = (sPrice * cRate) / 100;
const netPayment = sPrice - commissionAmount - sCost - sFee;
const totalCost = pCost + sCost + sFee;
const netProfit = netPayment - pCost;
const profitMargin = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;


  const handleTargetClick = () => {
    const c = commissionRate / 100;
    const requiredSale = (totalCost * (1 + targetMargin / 100)) / (1 - c);
    setSalePrice(Number(requiredSale.toFixed(2)));
  };

  return (
    <div className="w-full min-h-screen p-0 m-0 bg-transparent">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Pazaryeri Kâr Hesaplayıcı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field label="Alış Fiyatı (₺)" value={purchaseCost} onChange={setPurchaseCost} />
              <Field label="Kargo Maliyeti (₺)" value={shippingCost} onChange={setShippingCost} />
              <Field label="Hizmet Bedeli (₺)" value={serviceFee} onChange={setServiceFee} />
              <Field label="Komisyon Oranı (%)" value={commissionRate} onChange={setCommissionRate} />
              <Field label="Satış Fiyatı (₺)" value={salePrice} onChange={setSalePrice} />
            </div>
            <div className="space-y-4">
              <Output label="Komisyon Tutarı" value={commissionAmount} />
              <Output label="Net Ödeme" value={netPayment} />
              <Output label="Toplam Maliyet" value={totalCost} />
              <Output label="Net Kâr" value={netProfit} />
              <Output label="Kar Marjı" value={`${profitMargin.toFixed(2)} %`} />
            </div>
          </div>

          <div
  className="mt-8 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-end gap-4"
  style={{ backgroundColor: "#f5d5de" }}
>
  <div className="flex-1 w-full">
    <Label className="font-medium">Hedef Kar Marjı (%)</Label>
    <Input
      type="number"
      className="mt-1 w-full"
      value={targetMargin}
      onChange={(e) => setTargetMargin(Number(e.target.value))}
    />
  </div>

  <Button
    onClick={handleTargetClick}
    className="h-10 w-full md:w-auto text-white font-medium"
    style={{
      backgroundColor: "#f28c3a", // turuncu renk
      borderRadius: 8,
    }}
  >
    Hedef Satış Fiyatını Hesapla
  </Button>
</div>

        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>

      <Input
        type="number"
        value={value}
        className="text-sm"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}


function Output({ label, value }) {
  return (
    <div
      className="flex justify-between items-center rounded-lg px-4 py-2"
      style={{ backgroundColor: "#f5d5de" }}
    >
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-base font-semibold text-gray-900">
        {typeof value === "number" ? value.toFixed(2) + " ₺" : value}
      </span>
    </div>
  );
}



