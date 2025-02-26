export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-medium">Về chúng tôi</h3>
            <p className="text-gray-300">
              khoamthanh.com là nền tảng cung cấp các hiệu ứng âm thanh và bản
              nhạc chất lượng cao.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Liên hệ chúng tôi</h3>
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
