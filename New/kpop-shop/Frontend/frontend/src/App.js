import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [address, setAddress] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleRegister = async () => {
    const res = await fetch(`http://localhost:8080/api/register?username=${formData.name}`, {
      method: 'POST',
    });

    if (res.ok) {
      setIsRegistered(true);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:8080/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handlePreorder = async () => {
    const albumName = products.find(p => p.id === selectedProductId)?.name;
    const res = await fetch(`http://localhost:8080/api/preorder?username=${formData.name}&album=${albumName}`, {
      method: 'POST',
    });

    if (res.ok) {
      const message = await res.text();
      setOrderStatus(message);
    }
  };

  const requestTracking = async () => {
    const res = await fetch(`http://localhost:8080/api/tracking?username=${formData.name}&album=${searchTerm}`);
    if (res.ok) {
      const result = await res.text();
      setTrackingNumber(result);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">K-Pop Shop</h1>

      {!isRegistered ? (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Register</h2>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border p-2 w-full"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded">
            <p className="text-green-700 font-semibold">🎉 สมัครสมาชิกสำเร็จ!</p>
            <p>คุณจะได้รับส่วนลดพิเศษ 10% และสิทธิ์ในการ Pre-order ก่อนใคร</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">ค้นหาสินค้า</h2>
            <input
              type="text"
              placeholder="ค้นหาชื่อสินค้า..."
              className="border p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchProducts} className="mt-2 bg-gray-800 text-white px-4 py-2 rounded">
              ดูสินค้าทั้งหมด
            </button>

            <div className="mt-4 space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.name}
                  className="border p-4 rounded flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p>ราคา: ฿{product.price}</p>
                    <p>คงเหลือ: {product.stock > 0 ? product.stock : 'หมด'}</p>
                  </div>
                  {product.stock > 0 && (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      เลือก
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedProductId && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">ที่อยู่สำหรับจัดส่ง</h2>
              <textarea
                className="border w-full p-2"
                placeholder="กรอกที่อยู่..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button onClick={handlePreorder} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
                สั่งซื้อสินค้า
              </button>
            </div>
          )}

          {orderStatus && (
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <p className="text-blue-700 font-medium">{orderStatus}</p>
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">เช็กเลข Tracking</h2>
            <input
              type="text"
              placeholder="ชื่ออัลบั้ม"
              className="border p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={requestTracking}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
            >
              ขอเลข Tracking
            </button>
            {trackingNumber && (
              <p className="mt-2 text-purple-800">เลข Tracking: <span className="font-mono">{trackingNumber}</span></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
