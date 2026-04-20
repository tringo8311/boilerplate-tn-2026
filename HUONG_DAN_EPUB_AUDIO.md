# Hướng Dẫn Tạo EPUB Với Âm Thanh

Hướng dẫn này sẽ giúp bạn tạo file EPUB có âm thanh (như MP3), nhúng chúng vào sách điện tử của bạn, và xuất bản sách lên Google Play. Dưới đây là những nội dung chính mà bạn sẽ tìm thấy trong hướng dẫn này:

## Cấu Trúc Thư Mục

Để bắt đầu, bạn cần có cấu trúc thư mục rõ ràng cho dự án EPUB của mình. Dưới đây là ví dụ về cấu trúc thư mục:
```
/your-epub-project
|-- META-INF/
|   |-- container.xml
|-- OEBPS/
|   |-- content.opf
|   |-- toc.ncx
|   |-- chapter1.xhtml
|   |-- chapter2.xhtml
|   |-- audio/
|       |-- sound1.mp3
|       |-- sound2.mp3
```

## Ví Dụ Về file package.opf

File `content.opf` chứa thông tin về tài liệu EPUB của bạn, bao gồm metadata, mục lục, và nội dung:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf">
  <metadata>
    <dc:title>Tiêu Đề Sách</dc:title>
    <dc:author>Tác Giả</dc:author>
    <dc:identifier id="bookid">urn:isbn:978-3-16-148410-0</dc:identifier>
    <dc:language>vi</dc:language>
  </metadata>
  <manifest>
    <item id="chapter1" href="chapter1.xhtml" media-type="application/xhtml+xml" />
    <item id="audio1" href="audio/sound1.mp3" media-type="audio/mpeg" />
  </manifest>
  <spine>
    <itemref idref="chapter1" />
  </spine>
</package> 
```

## Tích Hợp Âm Thanh MP3

Để nhúng âm thanh MP3 vào trong sách của bạn, bạn có thể sử dụng thẻ HTML5 `<audio>` trong file XHTML:
```html
<audio controls>
  <source src="audio/sound1.mp3" type="audio/mpeg">
  Trình duyệt của bạn không hỗ trợ phát âm thanh.
</audio>
```

## SMIL Files

SMIL (Synchronized Multimedia Integration Language) cho phép bạn điều khiển cách mà nội dung đa phương tiện được phát lại trong EPUB. Một ví dụ đơn giản về file SMIL như sau:
```xml
<smil>
  <head>
    <meta name="text" content="text1.xhtml" />
  </head>
  <body>
    <seq>
      <seq>
        <video src="video1.mp4" />
        <audio src="audio/sound1.mp3" />
      </seq>
    </seq>
  </body>
</smil>
```

## Công Cụ Kiểm Tra

Có một số công cụ bạn có thể sử dụng để kiểm tra độ chính xác của EPUB:
1. **EPUBCheck**: Công cụ chính thức để kiểm tra file EPUB của bạn.
2. **Sigil**: Trình chỉnh sửa EPUB có tích hợp kiểm tra và sửa lỗi.

## Xử Lý Sự Cố

Nếu bạn gặp lỗi khi xuất bản lên Google Play, hãy kiểm tra những điểm sau:
- Đảm bảo file EPUB của bạn tuân thủ các tiêu chuẩn EPUB.
- Kiểm tra các thẻ HTML và các đường dẫn tới âm thanh có chính xác không.
- Sử dụng công cụ kiểm tra trên để tìm lỗi trước khi xuất bản.

Hy vọng rằng hướng dẫn này đã cung cấp cho bạn các bước cần thiết để tạo file EPUB với âm thanh và xuất bản thành công trên Google Play!