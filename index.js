const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // สำหรับสร้าง token

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const membersFile = path.join(dataDir, 'members.json');
const ordersFile = path.join(dataDir, 'orders.json');
const productsFile = path.join(dataDir, 'products.json');

if (!fs.existsSync(productsFile)) {
  const initialProducts = [
    { id: 101, name: 'BLACKPINK - 2025 SPECIAL ALBUM', price: 950, available: true },
    { id: 102, name: 'SEVENTEEN - 12th Mini Album', price: 870, available: false }
  ];
  fs.writeFileSync(productsFile, JSON.stringify(initialProducts, null, 2));
}

// Helper
function readData(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function generateToken() {
  return crypto.randomBytes(16).toString('hex'); // 32-char token
}

// ✅ สมัครสมาชิก (register)
app.post('/register', (req, res) => {
  const members = readData(membersFile);
  const { name, email, password } = req.body;

  if (members.find(m => m.email === email)) {
    return res.status(400).json({ error: 'อีเมลนี้ลงทะเบียนแล้ว' });
  }

  const id = members.length + 1;
  const token = generateToken();
  const member = { id, name, email, password, token };

  members.push(member);
  writeData(membersFile, members);

  res.json({
    message: 'ลงทะเบียนสำเร็จ',
    memberId: id,
    token
  });
});

// ✅ สั่งซื้อสินค้า (ต้องแนบ token)
app.post('/preorder', (req, res) => {
  const { memberId, token, productId, quantity, address } = req.body;

  const members = readData(membersFile);
  const member = members.find(m => m.id === memberId && m.token === token);

  if (!member) {
    return res.status(401).json({ error: 'token ไม่ถูกต้อง หรือไม่มีสมาชิกนี้' });
  }

  const orders = readData(ordersFile);
  const orderId = orders.length + 1;

  const order = {
    orderId,
    memberId,
    productId,
    quantity,
    address,
    tracking: `TH${Math.floor(Math.random() * 1e8)}`,
    status: 'waiting for the payment'
  };

  orders.push(order);
  writeData(ordersFile, orders);

  res.json({ orderId, message: 'สั่งซื้อสำเร็จ', status: order.status });
});

// ✅ แสดงสินค้า
app.get('/products', (req, res) => {
  const products = readData(productsFile);
  res.json(products);
});

// ✅ ตรวจสอบ Tracking
app.get('/tracking/:id', (req, res) => {
  const orders = readData(ordersFile);
  const order = orders.find(o => o.orderId == req.params.id);
  if (!order) return res.status(404).json({ error: 'ไม่พบคำสั่งซื้อ' });

  res.json({
    orderId: order.orderId,
    trackingNumber: order.tracking,
    status: order.status
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API is running at http://localhost:${PORT}`);
});
