$(document).delegate('form', 'submit', function(event) {
var $form = $(this);
var id = $form.attr('id');
 $.ajax({
  type: "POST",
  crossDomain: true,
  async:true,
  url: "http://getit-lms.cloudapp.net/LMS.svc/User/Enquiry",
  data: JSON.stringify($form.serializeObject()),
  contentType: "application/json; charset=utf-8",
  dataType: 'json',
  success: function(msg) {
    if(msg['UserEnquiryResult'] === "Success")
        { 
            alert("Your message sent successfully");
            document.getElementById(id).reset();
        }
    else
        {
            alert("Sorry! Enquiry has not been sent successfully");
        }
  }
});
return false;
});
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    //a.splice(7,2); // remove captcha field from parameter
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};