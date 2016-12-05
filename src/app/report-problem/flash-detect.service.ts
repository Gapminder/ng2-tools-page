import { Injectable } from '@angular/core';

@Injectable()
export class FlashDetectService {

  installed = false;
  raw = "";
  major = -1;
  minor = -1;
  revision = -1;
  revisionStr = "";

  activeXDetectRules = [
    {
      "name":"ShockwaveFlash.ShockwaveFlash.7",
      "version":function(obj){
        return this.getActiveXVersion(obj);
      }
    },
    {
      "name":"ShockwaveFlash.ShockwaveFlash.6",
      "version":function(obj){
        var version = "6,0,21";
        try{
          obj.AllowScriptAccess = "always";
          version = this.getActiveXVersion(obj);
        }catch(err){}
        return version;
      }
    },
    {
      "name":"ShockwaveFlash.ShockwaveFlash",
      "version":function(obj){
        return this.getActiveXVersion(obj);
      }
    }
  ];

  constructor() {

    var versionObj = <any>{};
    if(navigator.plugins && navigator.plugins.length>0){
      var type = 'application/x-shockwave-flash';
      var mimeTypes = navigator.mimeTypes;
      if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
        var version = mimeTypes[type].enabledPlugin.description;
        versionObj = this.parseStandardVersion(version);
        this.raw = versionObj.raw;
        this.major = versionObj.major;
        this.minor = versionObj.minor;
        this.revisionStr = versionObj.revisionStr;
        this.revision = versionObj.revision;
        this.installed = true;
      }
    }else if(navigator.appVersion.indexOf("Mac")==-1 && window['execScript']){
      var version = <any>-1;
      for(var i=0; i<this.activeXDetectRules.length && version==-1; i++){
        var obj = this.getActiveXObject(this.activeXDetectRules[i].name);
        if(!obj.activeXError){
          this.installed = true;
          version = this.activeXDetectRules[i].version(obj);
          if(version!=-1){
            versionObj = <any>this.parseActiveXVersion(version);
            this.raw = versionObj.raw;
            this.major = versionObj.major;
            this.minor = versionObj.minor;
            this.revision = versionObj.revision;
            this.revisionStr = versionObj.revisionStr;
          }
        }
      }
    }

  }

  /**
   * Extract the ActiveX version of the plugin.
   *
   * @param {Object} The flash ActiveX object.
   * @type String
   */
  getActiveXVersion = function(activeXObj){
    var version = <any>-1;
    try{
      version = activeXObj.GetVariable("$version");
    } catch(err){}
    return version;
  }
  /**
   * Try and retrieve an ActiveX object having a specified name.
   *
   * @param {String} name The ActiveX object name lookup.
   * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
   * @type Object
   */
  getActiveXObject = function(name){
    var obj =<any>-1;
    if(typeof window['ActiveXObject'] != 'undefined') {
      try{
        obj = <any>new window['ActiveXObject'](name);
      }catch(err){
        obj = {activeXError:true};
      }
    }
    return obj;
  }
  /**
   * Parse an ActiveX $version string into an object.
   *
   * @param {String} str The ActiveX Object GetVariable($version) return value.
   * @return An object having raw, major, minor, revision and revisionStr attributes.
   * @type Object
   */
  parseActiveXVersion = function(str){
    var versionArray = str.split(",");//replace with regex
    return {
      "raw":str,
      "major":parseInt(versionArray[0].split(" ")[1], 10),
      "minor":parseInt(versionArray[1], 10),
      "revision":parseInt(versionArray[2], 10),
      "revisionStr":versionArray[2]
    };
  }
  /**
   * Parse a standard enabledPlugin.description into an object.
   *
   * @param {String} str The enabledPlugin.description value.
   * @return An object having raw, major, minor, revision and revisionStr attributes.
   * @type Object
   */
  parseStandardVersion = function(str){
    var descParts = str.split(/ +/);
    var majorMinor = descParts[2].split(/\./);
    var revisionStr = descParts[3];
    return {
      "raw":str,
      "major":parseInt(majorMinor[0], 10),
      "minor":parseInt(majorMinor[1], 10),
      "revisionStr":revisionStr,
      "revision":this.parseRevisionStrToInt(revisionStr)
    };
  }
  /**
   * Parse the plugin revision string into an integer.
   *
   * @param {String} The revision in string format.
   * @type Number
   */
  parseRevisionStrToInt = function(str){
    return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || this.revision;
  }
  /**
   * Is the major version greater than or equal to a specified version.
   *
   * @param {Number} version The minimum required major version.
   * @type Boolean
   */
  majorAtLeast = function(version){
    return this.major >= version;
  }
  /**
   * Is the minor version greater than or equal to a specified version.
   *
   * @param {Number} version The minimum required minor version.
   * @type Boolean
   */
  minorAtLeast = function(version){
    return this.minor >= version;
  }
  /**
   * Is the revision version greater than or equal to a specified version.
   *
   * @param {Number} version The minimum required revision version.
   * @type Boolean
   */
  revisionAtLeast = function(version){
    return this.revision >= version;
  }
  /**
   * Is the version greater than or equal to a specified major, minor and revision.
   *
   * @param {Number} major The minimum required major version.
   * @param {Number} (Optional) minor The minimum required minor version.
   * @param {Number} (Optional) revision The minimum required revision version.
   * @type Boolean
   */
  versionAtLeast = function(major){
    var properties = [this.major, this.minor, this.revision];
    var len = Math.min(properties.length, arguments.length);
    for(var i=0; i<len; i++){
      if(properties[i]>=arguments[i]){
        if(i+1<len && properties[i]==arguments[i]){
          continue;
        }else{
          return true;
        }
      }else{
        return false;
      }
    }
  }

}
