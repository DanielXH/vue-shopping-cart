let vm = new Vue({
    el:'#app',
    data:{
        productList:[],
        totalMoney:0,
        checkedAllFlag: false,
        delFlag: false,
        delIndex: 0
    },
    filters:{
        formatMoney: function (value) {
            return '￥' + value.toFixed(2);
        }
    },
    mounted: function () {
        this.cartView();
    },
    methods:{
        cartView: function () {
            let _this = this;
            this.$http.get('data/cartData.json',{'id':123}).then(function (res) {
                _this.productList = res.data.result.list;
                // _this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function (product, way) {
            way == 1? product.productQuantity++ : product.productQuantity--;
            while (product.productQuantity < 1)
                product.productQuantity++;
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            var _this = this;
            if (typeof item.checked == 'undefined') {
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            _this.checkedAllFlag = this.productList.every(function(item, index) {
                return item.checked;
            })
            this.calcTotalPrice();
        },
        checkedAll: function () {
            this.checkedAllFlag = !this.checkedAllFlag;
            this.productList.forEach((item, index) => {
                if (typeof item.checked) {
                    item.checked = this.checkedAllFlag;
                } else {
                    this.$set(item, "checked", this.checkedAllFlag);
                }
            })
            this.calcTotalPrice();
        },
        delFlagFun: function (index) {
            this.delIndex = index;
            this.delFlag = true;
        },
        deleteProduct: function () {
            this.productList.splice(this.delIndex,1);
            this.delFlag = false;
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        }
    }
})
