/*
(async function() {
    try {
        let response = await makeHTTPRequest("http://www.google.com", "GET", null, null, console.log);
        console.log(JSON.stringify(response));
    } catch (err) {
        console.log('exception: '+JSON.stringify(err));
    }
})();
*/

function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
       var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
       return uuid.toString(16);
    });
 }
 
function decode(res, key) {

    let byteArr = base64tobytearr(res);
  
    for (let i = 0; i < byteArr.length; i++) {
        byteArr[i] ^= key;   
    }

    let base64str = bytearrtobase64(byteArr);

    let jsonstr = atob(base64str);
    return jsonstr; //JSON.parse(jsonstr);
}

function makeHTTPRequest(url, action, headers, body, loggerfn) {
    const funcname = 'makeHTTPRequest';

    if ( ! loggerfn )
        loggerfn = () => {};

    loggerfn(funcname+': url: '+url+' action: '+action);

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(action, url);

        let hasheaders = headers && headers.length >= 1;

        if ( hasheaders ) {
            headers.forEach( header => {
                xhr.setRequestHeader(header.key, header.value);    
            })
        }
        
        if ( hasheaders ) {
            if ( ! headers.includes("Accept") )
                xhr.setRequestHeader("Accept", "*/*");

            if ( ! headers.includes("Content-Type") )
                xhr.setRequestHeader("Content-Type", "application/json");
        }
    
        xhr.onprogress = function() {
            loggerfn(funcname+': onprogress: status: '+xhr.readyState);
        }

        xhr.onreadystatechange = function () {
            loggerfn(funcname+': onreadystatechange: readyState: '+xhr.readyState);

            if (xhr.readyState === 4) { //
                let res = xhr.responseText;

                loggerfn(funcname+': success: '+res.length+' chars');

                resolve(res);
            }

        };

        xhr.onload = function () {
            loggerfn(funcname+': onload: status: '+this.status);

            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.onerror = function() {
            loggerfn(funcname+': onerror: status: '+this.status+' text: '+xhr.statusText);

            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

          
        if ( body )
            xhr.send(body);
        else
            xhr.send();

    });
}

function uploadNote(fname, text) {
    const funcname = 'uploadNote';

    console.log(funcname+': fname: '+fname+' text: '+text.length+' chars');

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://testdev2375.azurewebsites.net/api/httpTriggerDevTestB?fname="+fname+"&fpath=Notes");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-functions-key","IhwKwdueHUuMepR4dgg-ZWAIPo2HXxDW_72cBBvpdFGzAzFuekcPAw==");

        xhr.onreadystatechange = function () {
            console.log(funcname+': onreadystatechange: readyState: '+this.readyState);

            let business = function () {
                res = xhr.responseText;

                console.log('success: '+res.length+' chars');
                console.log('response: '+JSON.stringify(res));

                resolve(xhr.responseText);
            }

            if (xhr.readyState === 4) {
                business();
            }

        };

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.send(text);

    });
}

function uploadObject(id, text) {
    console.log('uploadObject: id: '+id+' text: '+text.length+' chars');

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://testdev2375.azurewebsites.net/api/httpTriggerDevTestB?fname="+id+".json&fpath=Objects");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-functions-key","IhwKwdueHUuMepR4dgg-ZWAIPo2HXxDW_72cBBvpdFGzAzFuekcPAw==");

        xhr.onreadystatechange = function () {
            console.log('uploadObject: onreadystatechange: readyState: '+this.readyState);

            let business = function () {
                res = xhr.responseText;

                console.log('success: '+res.length+' chars');
                console.log('response: '+JSON.stringify(res));

                resolve(xhr.responseText);
            }

            if (xhr.readyState === 4) {
                business();
            }

        };

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.send(text);

    });
}