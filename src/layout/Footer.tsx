export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="mb-2 font-medium uppercase md:mb-4">Về chúng tôi</h3>
            <p className="text-gray-300">
              <strong className="text-white">khoamthanh.com</strong> là nền tảng
              cung cấp các hiệu ứng âm thanh và bản nhạc chất lượng cao.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-medium uppercase md:mb-4">Liên hệ</h3>
            <div className="flex gap-4 text-gray-300">
              <span>Facebook</span>
              <span>Twitter</span>
              <span>Instagram</span>
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
