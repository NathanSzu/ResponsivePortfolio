$(".submit-email").click((event) => {
    event.preventDefault();

    var formData = {
        name: $("#InputName").val(),
        email: $("#InputEmail").val(),
        message: $("#InputMessage").val()
    };

    $.ajax({
        method: "POST",
        url: "/send",
        data: formData
    })
        .then(function () {
            $("#send-msg").addClass("send-confirmation");
            setTimeout(() => {
                $("#send-msg").removeClass("send-confirmation");
            }, 3000);
            
        })
        .catch(err => console.log(err))

})