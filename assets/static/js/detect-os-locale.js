altID = [];
altData.forEach(item => altID.push(item[0]));

var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="GNU";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

function detectLang() {
  if (navigator.languages != undefined) {
    return navigator.languages[0];
  }
  else {
    return navigator.language;
  }
}

var userLocale = detectLang();
var userLocaleStripped = userLocale.split('-')[0];
var filter = altID.filter(s => s.includes(userLocaleStripped));

if (filter != undefined && filter.length > 0) {
  console.log("filter is defined");
  if (filter.length > 1) {
    var altLang = userLocale;
    var index =  altID.findIndex(s => s == userLocale);
    var language = altData[index][1];
  }
  else {
    var altLang = userLocaleStripped;
    var index =  altID.findIndex(s => s == userLocaleStripped);
    var language = altData[index][1];
  }
}
else {
  console.log("filter is undefined");
  var altLang = 'en-US';
  var language = 'English (en)';
}

console.log("userLocale is " + userLocale);
console.log("userLocaleStripped is " + userLocaleStripped);
console.log(altData);
console.log("filter is " + filter);
console.log("altLang is " + altLang);
console.log("fulLang is " + language);

if (OSName ==  "Windows"){
    if (navigator.userAgent.indexOf("WOW64") != -1 || 
        navigator.userAgent.indexOf("Win64") != -1 ){
       alert("This is a 64 bit Windows OS");
       var arch = 'win64-';
    } 
    else {
      var arch = '';
    }
    var download_link = download_prefix + 'torbrowser-install-' + arch + version + '_' + altLang + '.exe';
    var sig_link = download_link + '.asc';
    var label = "Windows";
    var id = "fa-windows-png";
    }

else if (OSName == "MacOS"){
    var download_link = download_prefix + 'TorBrowser-' + version + '-osx64' + '_' + altLang + '.dmg';
    var sig_link = download_link + '.asc';
    var label = "OS X";
    var id = "fa-apple-png";
    }

else {
    if (navigator.userAgent.indexOf("Linux x86_64") != -1 || navigator.userAgent.indexOf("Linux aarch64") != -1 || navigator.userAgent.indexOf("Linux armv8l") != -1){
      alert("This is a 64 bit Linux OS");
      var arch = 'linux64';
    }
    else {
      var arch = 'linux32';
    } 
    var download_link = download_prefix + 'tor-browser-linux64-' + arch + '-' + version + '_' + altLang + '.tar.xz';
    var sig_link = download_link + '.asc';
    var label = "GNU/Linux";
    var id = "fa-linux-png";
}

window.onload = function() {
  document.getElementById('buttonBr').insertAdjacentHTML('beforebegin', label);
  document.getElementById('downloadButton').insertAdjacentHTML('beforeend', language);
  document.getElementById("downloadIcon").classList.add(id);
  document.getElementById('downloadButton').href = 'https://www.torproject.org' + download_link;
  document.getElementById("downloadLink").href = 'https://www.torproject.org' + download_link;
  document.getElementById("sigLink").href = 'https://www.torproject.org' + sig_link;
}