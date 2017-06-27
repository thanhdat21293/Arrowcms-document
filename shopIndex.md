# Thêm dữ liệu vào trang index

### Features Items

render dữ liệu ra index nên ta sẽ vào _/features/dashboard/frontend/controllers/index.js_

Sử dụng thư viện

```
const promise = require('arrowjs').Promise;
```

dùng thằng này để xử lý nhiều truy vấn cùng 1 lúc:

``` 
promise.all([ ])
```

Lấy product và đếm tổng product

```
application.models.product.findAndCountAll({
    include: [
        {
            model: application.models.user,
            attributes: ['id', 'display_name', 'user_email', 'user_image_url']
        }
    ],
    offset: (page - 1) * itemOfPage,
    limit: itemOfPage,
    order: 'id DESC'
})
```

Lấy product được giảm giá

```
application.models.product.findAll({
    where: {
        price_sale: {
            $ne: 0 // Khác 0
        },
        quantity: {
            $gt: 0 // Lớn hơn 0
        }
    },
    limit: 3,
    order: 'count_views DESC'
})
```

Lấy 4 product mới nhất

```
application.models.product.findAll({
    limit: 4,
    order: 'id ASC'
})
```

Lấy 4 product mới nhất có 'status' = 1

```
application.models.product.findAll({
    where: {
        status: 1
    },
    limit: 4,
    order: 'id DESC'
})
```

Lấy 4 product mới nhất có 'status' = 0

```
application.models.product.findAll({
    where: {
        status: 0
    },
    limit: 4,
    order: 'id DESC'
})
```

### Render ra frontend

Vì chúng ta ko dùng _Add to wishlist_ và _Add to compare_ nên sẽ bỏ

Lấy ảnh: Vì trong 1 product sẽ có nhiều ảnh mà ta chỉ lấy 1 ảnh nên dùng kiểu này

```
{{ product.images | getImage(0) }}
```

#### Add to cart

function sau sẽ đc thêm vào file __layout.twig_

function này dùng ajax gửi request lên server để lưu product id vào req.session.cart.
```
function add_cart(id){
        $.ajax({
            method : 'get',
            url : '/cart/'+id
        }).done(function(result){
            if (result == 'exists'){
                alert('Sản phẩm này đã có trong giỏ hàng !');
            }else{
                alert('Đã cho vào giỏ hàng !');
                $('#cart_quantity').text('( '+result.length+' )');
            }
        });
    }
```

Href để add to cart:

sử dụng ở frontend, function _add_cart()_ đã có ở __layout.twig_
```
javascript:add_cart({{ product.id }})
```

Phần route.js sẽ thêm ở trong _/features/products/_

Lưu product id mà người dùng add to cart.
```
"/cart/:pid([0-9]+)": {
    get: {
        handler: comp.add_cart
    }
},
```

Controller cho _add_cart_

Lưu vào session cart

```
controller.add_cart = function (req, res) {
    let sess = req.session;
    let products_ids = {};
    let exists = true;
    if (sess.cart) {
        products_ids = sess.cart;
        // products_ids.forEach(function (value) {
        //     if (products_ids[req.params.pid] > 0) {
        //         exists = false;
        //         return;
        //     }
        // })
        if (products_ids[req.params.pid] > 0) {
            exists = false;
        }
    }
    if (exists) {
        products_ids[req.params.pid] = 1;
        console.log(products_ids)
        sess.cart = products_ids;
        res.send(products_ids);
    } else {
        res.send('exists');
    }
};
```

#### View cart

Xem cách hoàn thiện trang cart [tại đây](https://github.com/thanhdat21293/Arrowcms-document/blob/master/cart.md)


### Hiển thị danh sách products theo categories

Tạo 1 function callback

```
application.models.product.findAll({
            where: {
                categories: {
                    $ilike: '%:' + item.id + ':%',
                }
            },
            limit: 8,
            order: 'id DESC',
            raw: true
        })
            .then(function (results) {
                item['products'] = results;
                cb(null, item)
            }).catch(function (err) {
                item['products'] = {};
                cb(null, item)
            });
```

Khi đó ở phần render ra trang index

Sử dụng hàm này để lấy tất cả categories

```
application.models.product_category.findAll({
    order: 'id DESC',
    raw: true
})
```

Sử dụng hàm async để lấy tất cả products by categories

Không biết sử dụng tra [google](https://www.google.com.vn) là có.

```
async.mapSeries
```



