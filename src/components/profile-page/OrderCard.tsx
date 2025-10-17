interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderCardProps {
  orderNumber: string
  placedOn: string
  total: number
  status: "Completed" | "Pending" | "Cancelled"
  items: OrderItem[]
}

export default function OrderCard({
  orderNumber,
  placedOn,
  total,
  status,
  items,
}: OrderCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-gray-800">{orderNumber}</div>
        <div className="text-sm text-gray-500">Placed on {placedOn}</div>
      </div>

      {/* Total & Status */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">${total}</div>
        <div
          className={`px-2 py-1 rounded-full text-sm font-semibold ${
            status === "Completed"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-200">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between py-2">
            <div className="text-gray-700">
              {item.name} × {item.quantity}
            </div>
            <div className="text-gray-900 font-medium">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}