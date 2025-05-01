document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
  
    const data = await res.json();
    const result = document.getElementById('registerResult');
  
    if (data.token) {
      // ✅ เก็บ token และ memberId
      localStorage.setItem('token', data.token);
      localStorage.setItem('memberId', data.memberId);
  
      // ✅ แสดงข้อความสำเร็จ
      result.innerHTML = `✅ สมัครสมาชิกสำเร็จ!<br>Token ถูกเก็บไว้เรียบร้อย สามารถสั่งซื้อได้แล้ว`;
      result.style.color = 'green';
  
      // อัปเดต UI หรือโหลดสินค้าอีกรอบถ้าต้องการ
      loadProducts();
    } else {
      result.innerText = data.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
      result.style.color = 'red';
    }
  });
  