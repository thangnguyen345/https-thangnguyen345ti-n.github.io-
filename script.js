let customers = [];
let products = [];

// Thêm khách hàng vào danh sách
function addCustomer() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const date = document.getElementById('date').value;

    if (customerName && customerPhone && customerAddress && date) {
        customers.push({ name: customerName, phone: customerPhone, address: customerAddress, date: date });
        updateCustomerTable();
    } else {
        alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
    }
}

// Cập nhật bảng khách hàng
function updateCustomerTable() {
    const table = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    customers.forEach(customer => {
        const row = table.insertRow();
        row.insertCell(0).innerText = customer.name;
        row.insertCell(1).innerText = customer.phone;
        row.insertCell(2).innerText = customer.address;
        row.insertCell(3).innerText = customer.date;
    });
}

// Thêm sản phẩm vào danh sách
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;

    if (productName && productPrice && productQuantity) {
        const total = productPrice * productQuantity;
        products.push({ name: productName, price: productPrice, quantity: productQuantity, total: total });
        updateProductTable();
    } else {
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
    }
}

// Cập nhật bảng sản phẩm
function updateProductTable() {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    products.forEach(product => {
        const row = table.insertRow();
        row.insertCell(0).innerText = product.name;
        row.insertCell(1).innerText = product.price;
        row.insertCell(2).innerText = product.quantity;
        row.insertCell(3).innerText = product.total;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Xóa';
        deleteButton.onclick = () => deleteProduct(row, product);
        row.insertCell(4).appendChild(deleteButton);
    });
}

// Xóa sản phẩm
function deleteProduct(row, product) {
    const index = products.indexOf(product);
    if (index > -1) {
        products.splice(index, 1);
        row.remove();
    }
}

// Lưu danh sách sản phẩm vào Excel
function downloadProductExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(products);
    XLSX.utils.book_append_sheet(wb, ws, "Sản phẩm");
    XLSX.writeFile(wb, "products.xlsx");
}

// Lưu thông tin khách hàng vào Excel
function downloadCustomerExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(customers);
    XLSX.utils.book_append_sheet(wb, ws, "Khách hàng");
    XLSX.writeFile(wb, "customers.xlsx");
}
