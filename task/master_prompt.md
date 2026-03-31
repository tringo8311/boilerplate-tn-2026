MASTER PROMPT: CHROME EXTENSION BOILERPLATE ARCHITECT (MANIFEST V3)

Role: Senior Extension Architect.
Goal: Thiết kế một bộ Boilerplate Chrome Extension (MV3) đa mục đích, cực kỳ bảo mật, dễ mở rộng (Scalable) và tuân thủ các chuẩn mực Clean Code cao nhất.

1. TECH STACK & BUILD SYSTEM

Core: Vite + React + TypeScript + Tailwind CSS.

Vite Config: Sử dụng @crxjs/vite-plugin để hỗ trợ HMR cho Content Script.

Entry Points: Cấu hình xuất nhiều trang riêng biệt: popup, options, landing-page, và instruction-page.

Optimization: Thực hiện Code-splitting để các trang tĩnh (Landing/Instruction) không làm nặng Background Service Worker. Tự động generate manifest.json.

2. FOLDER STRUCTURE (MODULAR)

src/
├── api/                # Axios instances & Zod schemas cho External API
├── assets/             # Icons & static resources
├── background/         # Service Worker & Message Router
│   ├── handlers/       # Feature handlers (Auth, Scraper, etc.)
│   ├── services/       # Core services (Storage, Menu, Migration, Logger)
│   └── index.ts        
├── content/            # Content Scripts
│   ├── components/     # ShadowDOMContainer & Injected UI
│   └── styles/         # Tailwind entry cho Shadow DOM
├── features/           # Logic dùng chung theo từng module tính năng
├── pages/              # UI Pages (Popup, Options, Landing, Instruction)
├── shared/             # Định nghĩa Types, Constants, MessageBus, Schemas
└── vite.config.ts      # Cấu hình build đa mục tiêu


3. CORE ARCHITECTURAL COMPONENTS

A. Message Router (Background)

Xây dựng class MessageRouter điều hướng dựa trên feature và action.

Tất cả message phải bọc trong try-catch toàn cục. Trả về kết quả theo format: { success: boolean, data?: T, error?: AppError }.

B. UI Isolation (Shadow DOM)

Viết React component ShadowDOMContainer để cô lập hoàn toàn CSS của Extension khỏi website.

Hỗ trợ inject Tailwind styles động vào Shadow Root.

C. Type-safe Storage & Migration

Wrapper cho chrome.storage.local sử dụng Generics và Zod để validate dữ liệu khi truy xuất.

MigrationService: Kiểm tra version và thực hiện transform dữ liệu khi extension được cập nhật.

D. Message Bus (Cross-context Sync)

Class MessageBus giúp đồng bộ State realtime giữa Popup, Options và Content Script thông qua sự kiện.

E. Context Menu Builder (Fluent API)

Xây dựng class tiện ích để đăng ký menu chuột phải thông qua cấu hình tập trung. Đảm bảo tính Idempotency (không tạo trùng menu khi reload).

4. STRICT CODING RULES (AI INSTRUCTIONS)

1. Data Integrity & Typing

No any: 100% sử dụng TypeScript interfaces/types.

Zod-Gate: Mọi dữ liệu từ bên ngoài (API, Storage, Message Payload) phải được validate qua Zod Schema. Nếu fail, quăng lỗi VALIDATION_ERROR lập tức.

2. Layered Isolation

UI Layer: Không logic nghiệp vụ, không gọi trực tiếp chrome.* APIs (trừ gửi message).

Service Layer: Chứa logic thuần túy, không phụ thuộc vào UI hay DOM.

Background Layer: Giữ State quan trọng (Token, User Info). Cấm gọi API trực tiếp từ Content Script (tránh CORS/Security).

3. MV3 Lifecycle & Security

Persistence: Do SW có thể bị suspend, mọi state quan trọng phải được lưu vào Storage ngay khi thay đổi.

Idempotency: Các hành động inject script hoặc UI phải kiểm tra sự tồn tại trước khi thực hiện để tránh lặp lại.

Security: Cấu hình CSP chặt chẽ. Tuyệt đối không dùng eval() hay inline-scripts.

4. Error Handling

Sử dụng Result Pattern cho tất cả các hàm logic.

Định nghĩa class AppError với các mã lỗi định danh (e.g., AUTH_EXPIRED, STORAGE_FULL).

5. DX & Performance

Sử dụng Barrel Exports cho mỗi module.

Logger Service: Chỉ hoạt động ở môi trường development.

Dọn dẹp (Cleanup) sạch sẽ các event listeners khi component unmount.