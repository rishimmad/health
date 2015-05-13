/**
 * Created by rishi on 14-04-2015.
 */
var userId = "13243";//102978,"1703409";2089714654,1910552(duplicates)
var siteInfo = null;
var productList = [];

//root function
$(document).ready(function(){
       if(!sessionStorage.getItem(userId)){
        $.ajax({
            url: 'http://search-testing-for-staging-ambab-1587144774.ap-southeast-1.elb.amazonaws.com:9999/search/askme/place?userid='+userId+'&source=true&size=20',
            dataType: 'JSONp',
            success: function (data, status) {
                siteInfo = sessionStorage.setItem(userId,JSON.stringify(data));
                populatePage();
            },
            error: function () {
                //handle the error
            }
        });
    }
    else{populatePage();}

});

function populatePage(){

    var complexData = sessionStorage.getItem(userId);
    siteInfo = JSON.parse(complexData);
	
	//Common info on all pages
	var didnumber = siteInfo.results.hits.hits[0]._source.LocationDIDNumber;
	if(didnumber === '') didnumber = siteInfo.results.hits.hits[0]._source.ContactMobile
	$('#call-us').html(IsAvailable(didnumber));
    
    var companyName = siteInfo.results.hits.hits[0]._source.CompanyName;
    $('#company-name-title').html(IsAvailable(companyName));
                              
    //Home Page
    var companySummaryImage = siteInfo.results.hits.hits[0]._source.CompanyLogoURL;
    var companySummaryText = siteInfo.results.hits.hits[0]._source.CompanyDescription;
	
    $('#companySummaryText').html(IsAvailable(companySummaryText));
    $('#companySummaryImage').html('<img src="' + IsAvailable(companySummaryImage) + '"/>');

    //Banner Images - Product Images - Combine

    //Products - Menu - Common for all pages
    if(productList.length === 0) createProductList();
    //Menu
    var productMenu = "";
    if(productList.length>0){
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].name != '') {
                productMenu += '<li><a onclick="storeProductId('
                + productList[i].id +')" href="productDetail.html">'
                + productList[i].name +'</a></li>'
            }
        }
        $('#product-list').html(productMenu);
    }

    //Product Index Page
    
    var divProducts = "";
    if(productList.length>0){
        for (var i = 0; i < productList.length; i++) {

            divProducts += '<div class="row"><div class="about-description"><div class="col-md-3"><img alt="image" class="product_img span3" src="' +
            productList[i].imageurl + '"></div><a onclick="storeProductId('
            + productList[i].id + ')"  href="productDetail.html"><h3>'
            + productList[i].name + '</h3></a><p>'
            + productList[i].description + '</p></div></div>';
        }
        $('#product-index').html(divProducts);
    }

    //Product Detail Page
    
                                    
    var productId = sessionStorage.getItem("productKey");
    if (productId != null && productList.length>0) {
        var divProducts = "";
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].id == productId) {
                divProducts = '<div class="row"><div class="span12"><div class="col-md-3"><img alt="image" class="product_img span3" src="' +
                productList[i].imageurl + '"></div><a onclick="loadData('
                +  productList[i].id + ')"  href="#"><h3>'
                + productList[i].name + '</h3></a><p>'
                +  productList[i].description + '</p></div></div>';
                break;
            }
        }
        $('#product-detail').html(divProducts);
    }

    //Contact Us Page

    // Google Map TBD - Lat, Long
    //Cities - Select first city by default
   
    
    var cityCount = siteInfo.results.aggregations.city.buckets.length;
    var cities = '';
    if(cityCount > 0){
        for (var i = 0; i < siteInfo.results.aggregations.city.buckets.length; i++) {
            if(i==0){cities = '<option value="' + siteInfo.results.aggregations.city.buckets[i].key + '"selected>' + siteInfo.results.aggregations.city.buckets[i].key;}
            else{cities += '<option value="' + siteInfo.results.aggregations.city.buckets[i].key + '">' + siteInfo.results.aggregations.city.buckets[i].key;}
            
        }
        $('#contactUsCities').html(cities);

        //Area - Select first area by default
        changeCity();
    }
    else{
        $('#contactUsCities').remove();
        $("#contactUsArea").remove();
    }

    $('#contactUsCompanyName').html(siteInfo.results.hits.hits[0]._source.CompanyName);
    $('#contactUsAddress').html(siteInfo.results.hits.hits[0]._source.Address + ', ' + siteInfo.results.hits.hits[0]._source.Area);
    $('#contactUsCity').html(siteInfo.results.hits.hits[0]._source.City);
    $('#contactUsState').html(siteInfo.results.hits.hits[0]._source.State);
    $('#contactUsCountry').html(siteInfo.results.hits.hits[0]._source.Country);
    $('#contactUsPinCode').html(siteInfo.results.hits.hits[0]._source.PinCode);
    $('#contactUsMobile').html(siteInfo.results.hits.hits[0]._source.ContactMobile);
    $('#contactUsEmailId').html(siteInfo.results.hits.hits[0]._source.LocationEmail);
    
    //Send Enquiry Page
    
    
    var divProductsList = "";
    if(productList.length>0){
        for (var i = 0; i < productList.length; i++) {

            divProductsList += '<option>' + productList[i].name + '</option>';
        }
        $('#product-dd').html(divProductsList);
    }
    else $('#product-dd').remove();
    
}

//Create product list - no duplicates
function createProductList(){
    if(siteInfo){
        //loop through hits.hits.source.product to get all products
        for(var i=0;i<siteInfo.results.hits.hits.length;i++){
            for(var j=0;j<siteInfo.results.hits.hits[i]._source.Product.length;j++){
                var product = {
                    imageurl:siteInfo.results.hits.hits[i]._source.Product[j].imageurls,
                    id:siteInfo.results.hits.hits[i]._source.Product[j].id,
                    name:siteInfo.results.hits.hits[i]._source.Product[j].name,
                    description:siteInfo.results.hits.hits[i]._source.Product[j].description
                };
                productList.push(product);
            }
        }
        //Sort Array by product id
        productList = sortArrayByKey(productList,'id');

        //Delete duplicates
        for(var c=0;c<productList.length;c++){
            if(productList[c+1] && (productList[c].id === productList[c+1].id)){
                delete productList[c];
            }
        }
        //Remove 'undefined' entries
        productList = productList.filter(function( el ){ return (typeof el !== "undefined"); });
    }
}

//Array sorting by key
function sortArrayByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

//Store product
function storeProductId(productid){
    sessionStorage.setItem("productKey",productid);
}
//Event Handlers
//Change City
$("#contactUsCities").change(function(){
    changeCity();
    
});

function changeCity() {

    var city = $("#contactUsCities").val();
    $.ajax({
        url: 'http://search-testing-for-staging-ambab-1587144774.ap-southeast-1.elb.amazonaws.com:9999/search/askme/place?userid='+userId+'&city=' + city + '&source=true&size=20',
        dataType: 'JSONp',
        success: function (data, status) {
            var locations = '';
            for (var i = 0; i < data.results.aggregations.area.buckets.length; i++) {
                if(i==0){locations += '<option value="' + data.results.aggregations.area.buckets[i].key + '"selected>' + data.results.aggregations.area.buckets[i].key;}
                else{locations += '<option value="' + data.results.aggregations.area.buckets[i].key + '">' + data.results.aggregations.area.buckets[i].key;}
            }

            if(locations == '') { $('#contactUsArea').remove();}
            else $('#contactUsArea').html(locations);
            
            $('#contactUsCompanyName').html(data.results.hits.hits[0]._source.CompanyName);
            $('#contactUsAddress').html(data.results.hits.hits[0]._source.Address + ', ' + data.results.hits.hits[0]._source.Area);
            $('#contactUsCountry').html(data.results.hits.hits[0]._source.Country);
            $('#contactUsState').html(data.results.hits.hits[0]._source.State);
            $('#contactUsPinCode').html(data.results.hits.hits[0]._source.PinCode);
            $('#contactUsMobile').html(data.results.hits.hits[0]._source.ContactMobile);
            $('#contactUsEmailId').html(data.results.hits.hits[0]._source.LocationEmail);
            $('#contactUsCity').html(data.results.hits.hits[0]._source.City);
            //Clear storage
             if(sessionStorage.getItem("cityInfo")){
                 sessionStorage.removeItem("cityInfo");
                 sessionStorage.setItem("cityInfo",JSON.stringify(data));
                //reload page to reflect new location
                initialize();
             }  
            else { sessionStorage.setItem("cityInfo",JSON.stringify(data));}                       
        },
        error: function () {
            //handle the error
        }
    });
}

//Change Area
$("#contactUsArea").change(function(){
    changeArea();
});
function changeArea() {

    var area = $("#contactUsArea").val();
    var data = JSON.parse(sessionStorage.getItem("cityInfo"));

    for (var i = 0; i < data.results.hits.hits.length; i++) {
        if (data.results.hits.hits[i]._source.Area == area) {
            $('#contactUsCompanyName').html(data.results.hits.hits[i]._source.CompanyName);
            $('#contactUsAddress').html(data.results.hits.hits[i]._source.Address + ', ' + data.results.hits.hits[i]._source.Area);
            $('#contactUsCity').html(data.results.hits.hits[i]._source.City);
            $('#contactUsCountry').html(data.results.hits.hits[i]._source.Country);
            $('#contactUsState').html(data.results.hits.hits[i]._source.State);
            $('#contactUsPinCode').html(data.results.hits.hits[i]._source.PinCode);
            $('#contactUsMobile').html(data.results.hits.hits[i]._source.ContactMobile);
            $('#contactUsEmailId').html(data.results.hits.hits[i]._source.LocationEmail);
            break;
        }
    }
}
//Return - Not Available
function IsAvailable(content){
    if(content === '') return "Not Available"
    else return content;
}

