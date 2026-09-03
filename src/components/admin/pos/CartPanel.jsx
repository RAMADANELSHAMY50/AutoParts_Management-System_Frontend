import React from "react";
import {
  MdAdd,
  MdRemove,
  MdDeleteOutline,
} from "react-icons/md";

export default function CartPanel({
  cartItems = [],
  increaseQty,
  decreaseQty,
  removeItem,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const discount=0;

  return (
    <aside className="w-[360px] h-full bg-[#181818] border-r border-zinc-800 flex flex-col">

      {/* Header */}
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white">
          Shopping Cart
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
          {cartItems.length} Item(s)
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {cartItems.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-500">
            Cart is empty
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#222222] rounded-xl p-3 flex gap-3"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-white font-medium">
                  {item.name}
                </h3>

                <p className="text-blue-400 font-semibold mt-1">
                  ${item.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 rounded-lg bg-[#2d2d2d] hover:bg-zinc-700 flex items-center justify-center"
                  >
                    <MdRemove />
                  </button>

                  <span className="w-8 text-center text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                  >
                    <MdAdd />
                  </button>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-400 self-start"
              >
                <MdDeleteOutline size={22} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="border-t border-zinc-800 p-5 space-y-4">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Tax (15%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>
    </aside>
  );
}