# Tạo page

### Bước 1: Chỉnh lại route với menu cho khớp

Vì _page_ và _post_ ta viết trong _/features/blog/_ nên ta sẽ xử lý phần server trong này.

Vào _/features/blog/backend/controllers/page.js_, function _linkMenuPage_ sửa

    ```
    link_template: '/{alias}'
    ```
    
    thành
    
    ```
    link_template: '/blog/{alias}'
    ```
    
Tạo 1 page trong admin

![page](upload/17.jpg)

Thêm page vào menu, nếu chưa có menu thì tạo 1 menu

![menu admin](upload/18.jpg)

Vào _widgets_, kéo menu vào sidebar _Main menu_ rồi chọn layout của theme (Không nhớ tên layout thì vào _themes/frontend/{theme active}/widgets/menus_) thì tên file chính là tên layout.

![widget](upload/19.jpg)

Ra ngoài frontend, reload lại thì thấy có _contact_ vừa thêm là ok

![menu frontend](upload/20.jpg)

### Bước 2: Layout riêng cho page _contact_

Vì phần layout của _contact_ có phần map hiển thị full width nên sẽ ko sử dụng

```
{% block content %} {% endblock %}
```

Mà ta thêm 1 block nữa ở __layout.twig_

```
{% block post %}
<div id="content">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <!-- Blog Article Start-->
                {% block content %}

                {% endblock %}
                <!-- Blog Article End-->
            </div>
            <div class="col-md-4">
                {% include "_right_sidebar.twig" %}
            </div>
        </div>
    </div>
</div><!-- Content End -->
{% endblock %}
```

Ở _contact_: 

- Vì trang _contact_ có phần googlemap hiển thị full width nên nó sẽ nằm ngoài thẻ _id = contnet_ 
    
    Phần content các bạn tự thêm.
```
{% block post %}

//Content contact.


{% if layout === 'contact' %}
    //Sử dụng embed google maps
{% endif %}

{% endblock %}
```

Giao diện khi hoàn thành

- Vì map trong contact khi dùng phải điền API Key nên ta sử dụng Embed map google vậy. Vào đây search địa điểm rồi lấy code thêm vào contact (https://www.google.com/maps)

![hoan thanh](upload/21.jpg)


## Bài thực hành

Tạo 1 page 'About' và hiển thị nội dung _full_text_ và ảnh.

