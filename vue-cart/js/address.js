var vm = new Vue({
    el: '.container',
    data:{
        addressList: [],
        limitedNum: 3,
        currentIndex: 0,
        shippingMethod: 1,
        delAddressFlag: false,
        delAddressIndex: 0,
        newAddressFlag: false,
        addressCounted:0,

        newUserName: '',
        newStreetName: '',
        newTel: ''
    },
    mounted: function () {
        this.getAddressList();
    },
    methods:{
        getAddressList: function () {
            this.$http.get('data/address.json').then(function (res) {
                this.addressList = res.data.result;
            });
        },
        loadMore: function () {
            if (this.limitedNum == 3)
                this.limitedNum = this.addressList.length;
            else
                this.limitedNum = 3;
        },
        setDefault: function (item) {
            this.addressList.forEach(function (address,index) {
                if (address.addressId == item.addressId) {
                    address.isDefault = true;
                    console.log(item.addressId)
                } else {
                    address.isDefault = false;
                }
            })
        },
        delAddressIndexFun: function (index) {
            this.delAddressFlag = true;
            this.delAddressIndex  = index;
        },
        delAddress: function () {
            this.addressList.splice(this.delAddressIndex, 1);
            this.delAddressFlag = false;
            this.addressCounted = this.addressList.length;
        },
        newAddress: function () {
            this.addressCounted = this.addressList.length;
            let newItem = {};
            if (this.newUserName !== '' && this.newStreetName !== '') {
                newItem.addressId = 100001 + this.addressList.length;
                newItem.isDefault = false;
                newItem.postCode = newItem.addressId.toString();
                newItem.streetName = this.newStreetName;
                newItem.tel = this.newTel;
                newItem.userName = this.newUserName;
                this.addressList.splice(1,0,newItem);
            }
            this.newStreetName = '';
            this.newTel = '';
            this.newUserName = '';
            this.newAddressFlag = false;
            this.addressCounted = this.addressList.length;
        }
    },
    computed:{
        filterAddressList: function (limitedNum) {
            return this.addressList.slice(0,this.limitedNum);
        }
    }
})
