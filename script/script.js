$(window).on('load', function () {
    $('[data-work="operator"]').on('click', operator);
    $('[data-work="number"]').on('click', number);
    $('[data-work="function"]').on('click', others);
    var myStorage = localStorage;
    if (myStorage.getItem('savedValue') != null) {
        $(".memory").html(`M`);
    }
});

function number() {
    var index = $(this).data("value");
    $("#workbench").val($("#workbench").val() + index);
}

function operator() {
    var actualVal = $("#workbench").val(),
        index = $(this).data("value");
    if (actualVal === 0) {
        $("#workbench").val(index);
    }
    if (actualVal === '') {
        return;
    }
    var lastchar = actualVal.slice(actualVal.length - 1);
    if (isNaN(lastchar)) {
        $("#workbench").val(actualVal.slice(0, actualVal.length - 1) + index);
    } else {
        $("#workbench").val(actualVal + index);
    }
}

function others() {
    var index = $(this).data("value"),
        actualVal = $("#workbench").val(),
        myStorage = localStorage;
    switch (index) {
        case 'RES':
            $("#workbench").val(eval(actualVal));
            break;
        case 'CE':
            $("#workbench").val('');
            break;
        case 'ONOFF':
            $(".overlay").toggle();
            $(".memory").toggle();
            $('.calculator').toggleClass('gray');
            $('input').toggleClass('off');
            $("#workbench").val('');
            break;
        case 'SQRT':
            $("#workbench").val(Math.sqrt(eval(actualVal)));
            break;
        case 'MRC':
            var storageValue = myStorage.getItem('savedValue');
            if (storageValue != null) {
                $("#workbench").val(actualVal + storageValue);
            }
            break;
        case 'M':
            myStorage.setItem('savedValue', actualVal);
            $(".memory").html(`M`);
            break;
        case 'MNEG':
            myStorage.removeItem('savedValue');
            $(".memory").html(``);
            break;
        default:
            console.error("Button not ready");
            alert("Button not ready");
            break;
    }
}