# Sidebar + Widget

Widget sẽ được kéo thả trong _http://localhost:8000/admin/widgets/_. Và sẽ được lưu theo dạng json trong database.

Ở file __right_sidebar.twig_ ta sẽ gọi 1 hàm để lấy sidebar và bỏ tất cả code

File __right_sidebar.twig_ mới
```
<div class="sidebar">
    {{ getSidebar('right-sidebar') | async | safe }}
</div>
```

Hàm này sẽ tự động vào database, bảng _arr_wiget_ để lấy tất cả _widgets_ trong nó để hiển thị.

Giao diện widgets sẽ được lấy trong _themes//frontend/{theme active}/wigets/_

