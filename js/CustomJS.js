var userId = "1703409";

$(document).ready(function () {
    $.ajax({
        // url: 'http://search-testing-for-staging-ambab-1587144774.ap-southeast-1.elb.amazonaws.com:9999/search/askme/place?id=U1101598L1886510&source=true',
        url: 'http://search-testing-for-staging-ambab-1587144774.ap-southeast-1.elb.amazonaws.com:9999/search/askme/place?userid='+userId+'&source=true&size=20',
        dataType: 'JSONp',
        success: function (data, status) {

			//Home Page
            $('#company_information_home_text').append(data.results.hits.hits[0]._source.CompanyDescription);
            $('#company_information_home_image').append('<img src="' + data.results.hits.hits[0]._source.CompanyLogoURL + '"/>');
			
			//Products Menu
			 var productsList = "";
			 for (var i = 0; i < data.results.hits.hits[0]._source.Product.length; i++) {
               if (data.results.hits.hits[0]._source.Product[i].imageurls != '') {
                    productsList += '<li><a href="#">'+data.results.hits.hits[0]._source.Product[i].name +'</a></li>'
				 }
			 }
			 $('#product-list').append(productsList);

			//Contact Us Page
            $('#contactUsCompanyName').append(data.results.hits.hits[0]._source.CompanyName);
            $('#contactUsAddress').append(data.results.hits.hits[0]._source.Address + ', ' + data.results.hits.hits[0]._source.Area);
            $('#contactUsCity').append(data.results.hits.hits[0]._source.City);
            $('#contactUsState').append(data.results.hits.hits[0]._source.State);
            $('#contactUsCountry').append(data.results.hits.hits[0]._source.Country);
            
            $('#contactUsPinCode').append(data.results.hits.hits[0]._source.PinCode);
            $('#contactUsMobile').append(data.results.hits.hits[0]._source.ContactMobile);
            $('#contactUsEmailId').append(data.results.hits.hits[0]._source.LocationEmail);
			
			//Cities
            var cities = '<option value="select" >Select City';
            for (var i = 0; i < data.results.aggregations.city.buckets.length; i++) {
                cities += '<option value="' + data.results.aggregations.city.buckets[i].key + '">' + data.results.aggregations.city.buckets[i].key;
            }

            $('#contactUsCities').append(cities);
			
			//Product Index Page
            var divProducts = "";
            for (var i = 0; i < data.results.hits.hits[0]._source.Product.length; i++) {
                if (data.results.hits.hits[0]._source.Product[i].imageurls != '') {
                    divProducts += '<div class="row"><div class="span12"><img alt="image" class="product_img span3" src="' +
               data.results.hits.hits[0]._source.Product[i].imageurls + '"><a onclick="loadData('
               + data.results.hits.hits[0]._source.Product[i].id + ')"  href="productDetail.html"><h3>'
               + data.results.hits.hits[0]._source.Product[i].name + '</h3></a><p>'
               + data.results.hits.hits[0]._source.Product[i].description + '</p></div></div>';
                }
            }

           
            $('#serviceproducts').append(divProducts);

            localStorage["mainResponse"] = JSON.stringify(data);
        },
        error: function () {
            //handle the error
        }
    });
   
    //Product Detail
    var productId = localStorage["productId"];
    if (productId != null) {
        var data = JSON.parse(localStorage["mainResponse"]);
        var divProducts = "";
        for (var i = 0; i < data.results.hits.hits[0]._source.Product.length; i++) {
            if (data.results.hits.hits[0]._source.Product[i].id == productId) {
                divProducts = '<div class="row"><div class="span12"><img alt="image" class="product_img span3" src="' +
                data.results.hits.hits[0]._source.Product[i].imageurls + '"><a onclick="loadData('
                + data.results.hits.hits[0]._source.Product[i].id + ')"  href="#"><h3>'
                + data.results.hits.hits[0]._source.Product[i].name + '</h3></a><p>'
                + data.results.hits.hits[0]._source.Product[i].description + '</p></div></div>';
                break;
            }
        }
        $('#productDetail').append(divProducts);

    }
});

function changeCity() {
    document.getElementById("contactUsCompanyName").innerHTML = "";
    document.getElementById("contactUsAddress").innerHTML = "";
    document.getElementById("contactUsCountry").innerHTML = "";
    document.getElementById("contactUsState").innerHTML = "";
    document.getElementById("contactUsPinCode").innerHTML = "";
    document.getElementById("contactUsMobile").innerHTML = "";
    document.getElementById("contactUsCountry").innerHTML = "";
    document.getElementById("contactUsEmailId").innerHTML = "";
   document.getElementById("contactUsCity").innerHTML = "";
    var city = document.getElementById("contactUsCities").value;
    document.getElementById("contactUsArea").innerHTML = "";
    $.ajax({
        // url: 'http://search-testing-for-staging-ambab-1587144774.ap-southeast-1.elb.amazonaws.com:9999/search/askme/place?id=U1101598L1886510&source=true',
        url: 'http://search-testing-for-staging-ambab-1587144774.ap-southeast-1.elb.amazonaws.com:9999/search/askme/place?userid='+userId+'&city=' + city + '&source=true&size=20',
        dataType: 'JSONp',
        success: function (data, status) {
            var locations = '';

            for (var i = 0; i < data.results.aggregations.area.buckets.length; i++) {
                locations += '<option value="' + data.results.aggregations.area.buckets[i].key + '">' + data.results.aggregations.area.buckets[i].key;
            }

            $('#contactUsArea').append(locations);
            $('#contactUsCompanyName').append(data.results.hits.hits[0]._source.CompanyName);
            $('#contactUsAddress').append(data.results.hits.hits[0]._source.Address + ', ' + data.results.hits.hits[0]._source.Area);
            $('#contactUsCountry').append(data.results.hits.hits[0]._source.Country);
            $('#contactUsState').append(data.results.hits.hits[0]._source.State);
            $('#contactUsPinCode').append(data.results.hits.hits[0]._source.PinCode);
            $('#contactUsMobile').append(data.results.hits.hits[0]._source.ContactMobile);
            $('#contactUsEmailId').append(data.results.hits.hits[0]._source.LocationEmail);
          
            $('#contactUsCity').append(data.results.hits.hits[i]._source.City);
            localStorage["AccToCity"] = JSON.stringify(data);
        },
        error: function () {
            //handle the error
        }
    });


    //if (city == "Jaipur") {
    //    $.getJSON(
    //        "Jaipur.json",
    //        function(data) {
    //            //var locations = '<option value="select" >Select Location';
    //            var locations = '';

    //            for (var i = 0; i < data[0].results.aggregations.area.buckets.length; i++) {
    //                locations += '<option value="' + data[0].results.aggregations.area.buckets[i].key + '">' + data[0].results.aggregations.area.buckets[i].key;
    //            }

    //            $('#contactUsArea').append(locations);

    //            $('#contactUsCompanyName').append(data[0].results.hits.hits[0]._source.CompanyName);
    //            $('#contactUsAddress').append(data[0].results.hits.hits[0]._source.Address);
    //            $('#contactUsCity').append(data[0].results.hits.hits[0]._source.City);
    //            $('#contactUsState').append(data[0].results.hits.hits[0]._source.State + ',' + data[0].results.hits.hits[0]._source.Country);
    //            $('#contactUsPinCode').append(data[0].results.hits.hits[0]._source.PinCode);
    //            $('#contactUsMobile').append(data[0].results.hits.hits[0]._source.ContactMobile);
    //            $('#contactUsEmailId').append(data[0].results.hits.hits[0]._source.LocationEmail);

    //        }
    //    );
    //}

    // alert(city);

}

function changeArea() {
    document.getElementById("contactUsCompanyName").innerHTML = "";
    document.getElementById("contactUsAddress").innerHTML = "";
    document.getElementById("contactUsCity").innerHTML = "";
    document.getElementById("contactUsCountry").innerHTML = "";
    document.getElementById("contactUsState").innerHTML = "";
    document.getElementById("contactUsPinCode").innerHTML = "";
    document.getElementById("contactUsMobile").innerHTML = "";
    document.getElementById("contactUsEmailId").innerHTML = "";
  
    var area = document.getElementById("contactUsArea").value;

    var data = JSON.parse(localStorage["AccToCity"]);

    for (var i = 0; i < data.results.hits.hits.length; i++) {
        if (data.results.hits.hits[i]._source.Area == area) {
            $('#contactUsCompanyName').append(data.results.hits.hits[i]._source.CompanyName);
            $('#contactUsAddress').append(data.results.hits.hits[i]._source.Address + ', ' + data.results.hits.hits[i]._source.Area);
            $('#contactUsCity').append(data.results.hits.hits[i]._source.City);
           
            $('#contactUsCountry').append(data.results.hits.hits[i]._source.Country);
            $('#contactUsState').append(data.results.hits.hits[i]._source.State);
            $('#contactUsPinCode').append(data.results.hits.hits[i]._source.PinCode);
            $('#contactUsMobile').append(data.results.hits.hits[i]._source.ContactMobile);
            $('#contactUsEmailId').append(data.results.hits.hits[i]._source.LocationEmail);
            break;
        }
    }
}

function loadData(productId) {

    localStorage["productId"] = productId;
    //$.getJSON(
    //    "Test2.json",
    //    function (data) {
    //        var divProducts = "";
    //        for (var i = 0; i < data[0].results.hits.hits[0]._source.Product.length; i++) {
    //            if (data[0].results.hits.hits[0]._source.Product[i].id == productId) {
    //                divProducts = '<div class="col-md-12 img1"><img src="http://img.getit.in/'
    //                   + data[0].results.hits.hits[0]._source.Product[i].imageurls
    //                   + '" class = "col-md-3"> <a style="text-underline:black"> <h4>'
    //                   + data[0].results.hits.hits[0]._source.Product[i].name + '</h4></a><p>'
    //                   + data[0].results.hits.hits[0]._source.Product[i].description
    //                   + '</p></div>';
    //                break;
    //            }
    //        }
    //        $('#productDetail').append(divProducts);
    //    });


}