export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="mb-2 font-medium uppercase md:mb-4">Về chúng tôi</h3>
            <p className="text-gray-300">
              <a
                href="https://www.khoamthanh.com"
                className="text-white font-bold"
              >
                khoamthanh.com
              </a>{" "}
              là nền tảng cung cấp các hiệu ứng âm thanh miễn phí và chất lượng
              cao.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-medium uppercase md:mb-4">Liên hệ</h3>
            <div>
              <p>
                <span className="text-gray-300">SĐT/Zalo:</span>{" "}
                <a href="tel:0977480791">0977480791</a>
              </p>
              <p>
                <span className="text-gray-300">Email:</span>{" "}
                <a href="mailto:khoamthanh@gmail.com">khoamthanh@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-300">
            © 2025 Sound Effect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
