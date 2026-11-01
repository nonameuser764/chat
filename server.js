const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Cấu hình để server phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Lắng nghe khi có người kết nối vào web
io.on('connection', (socket) => {
    console.log(`Có người vừa kết nối: ${socket.id}`);

    // Khi nhận được tin nhắn từ một client gửi lên
    socket.on('chatMessage', (msg) => {
        // Gửi tin nhắn đó đến TẤT CẢ mọi người đang kết nối (kể cả người gửi)
        io.emit('chatMessage', msg);
    });

    // Khi có người ngắt kết nối (tắt tab, mất mạng)
    socket.on('disconnect', () => {
        console.log(`Người dùng đã ngắt kết nối: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});