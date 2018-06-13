//# sourceURL=application.js

//
//  application.js
//  ChoqueDeCultura
//
//  Created by Guilherme Paciulli on 12/06/18.
//  Copyright © 2018 Guilherme Paciulli. All rights reserved.
//

/*
 * This file provides an example skeletal stub for the server-side implementation
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is
 * configured in the AppDelegate of the TVML application. Note that  the various
 * javascript functions here are referenced by name in the AppDelegate. This skeletal
 * implementation shows the basic entry points that you will want to handle
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript
 * has been parsed into a JavaScript context. The handler is passed an object
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents
 * the URL that was used to retrieve the application JavaScript.
 */
var baseURL;

function loadingTemplate() {
    var template = '<document><loadingTemplate><activityIndicator><text>Programa cultural</text></activityIndicator></loadingTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
}

function getDocument(extension) {
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
    
    loadingTemplate();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}

function pushPage(document) {
    var currentDoc = getActiveDocument();
    if (currentDoc.getElementsByTagName("loadingTemplate").item(0) == null) {
        console.log("no loading");
        navigationDocument.pushDocument(document);
    } else {
        navigationDocument.replaceDocument(document, currentDoc);
        console.log("loading");
    }
}

function loadImage(extension) {
    return baseURL + extension
}

function playMediaExternal(videourl, mediaType) {
    var singleVideo = new MediaItem(mediaType, videourl);
    var videoList = new Playlist();
    videoList.push(singleVideo);
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
}

function playMedia(extension, mediaType) {
    var videourl = baseURL + extension;
    var singleVideo = new MediaItem(mediaType, videourl);
    var videoList = new Playlist();
    videoList.push(singleVideo);
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
}

App.onLaunch = function(options) {
    baseURL = options.BASEURL;
    loadingTemplate();
    var extension = "templates/main.tvml";
    getDocument(extension);
}

App.onExit = function() {
    console.log("exited");
}
