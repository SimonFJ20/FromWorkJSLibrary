
/*
*       FromWorkJS Library
*
*       Filename:   fromwork.ts
*       Pathname:   src/fromwork.ts
*       Language:   TypeScript
*       Content:    FromWorkJS main library file
*
*       Authors:
*       Simon From Jakobsen
*           Email:      simonfromjakobsen@gmail.com
*           GitHub:     SimonFJ20
*
*       Created:    22-02-2021
*       Last Edit:  22-02-2021
*
*       You are welcome to edit this exact file, just be ware of the license!
*       Know and understand the implications before publishing your edited version!
*
*       License:    GPL-2.0
*
*    This is the Main file for the FromWorkJS Library
*    Copyright (C) 2021  Simon From Jakobsen
*
*    This program is free software; you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation; either version 2 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License along
*    with this program; if not, write to the Free Software Foundation, Inc.,
*    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
*
*
*/




/**
 * General utility for managing the HTML DOM (Document Object Model)
 */
export class DOM {


    /** Get the website title */
    public static getTitle = (): string => document.title;



    /**
     * Change the website title
     * @param {string} title - New title string
     */

    public static setTitle = (title: string): void => {

        document.title = title;

    };



    /**
     * Specify CSS import
     * @param {string} url - CSS file location in `dist/`
     */

    public static setCssImport = (url: string): void => {

        // assign pointer to new <link> element
        const newLinkElement = document.createElement("link");

        // equivalent to <link rel="stylesheet" href="{url}" />
        newLinkElement.rel = 'stylesheet';
        newLinkElement.href = url;

        // can be used if all css should be in a specific folder
        //newLinkElement.href = "./style/" + url;

        // add element to DOM at head
        document.head.appendChild(newLinkElement);

    };





    /**
     * Get pointer to existing DOM element by id
     * @param {string} id - DOM id of element
     * @returns {Element} Specific type pointer to element
     */

    public static id = (id: string) => {

        // get the single first element with id
        return <HTMLElement>document.getElementById(id);

    };



    /**
     * Get pointer to the first existing DOM element by DOM query
     * @param {string} id - DOM query of element
     * @returns {Element} Specific type pointer to element
     */

    public static q = (elementQuery: string) => {

        // get the single first element with query
        return <Element>document.querySelector(elementQuery);

    };



}



/**
 * App Component contaning `html(string)` 
 */

export type Component = string;



/**
 * Convert html string into Component and removes whitespace and linebreaks
 * @param {string} html - String with html
 * @warning Does **NOT** remove JS comments `//` `/* * /` 
 */
// TODO: make to remove comments, single line from '//' to '\n', multiline from '/*' to '*/'
// removes line breaks, tabs, space*4
export const html = (html: string): Component => html.replace(/\r?\n|\r|\s{4}/g, '');




/* Runtime Code Execution */

// only accepts void functions to avoid potential errors
const runtimeCallbacks: Array<() => void> = [];



/**
 * Runs callback functions after html has been rendered.
 * Can be used, but isn't limited, to interacting with html.
 * @param {() => void} callbacks - Function to be run
 */

export const setRuntime = (...callbacks: Array<() => void>): void => {
    callbacks.forEach((callback) => {
        runtimeCallbacks.push(callback);
    });
};

/**
 * Runs the callback functions, that have been set with `setRuntime()`.
 * Usually run after html is rendered.
 */

export const execRuntime = (): void => {
    runtimeCallbacks.forEach((callback) => {
        callback();
    });
};



/* HTTP request */

/**
 * Execute HTTP GET request, with fetch api as JSON.
 * @param {string} url - For local location use `/path/location`, for outside location use `http(s)://yourURL/location`
 * @param {(response: object) => void} callback - Callback function for handling the response
 * @param {object} data - Optional, parse a JavaScript object as requst body
 */

export const get = (url: string, callback: (response: object, error?: boolean) => void, data?: object): void => {
    
    // setting up request and body

    const body = JSON.stringify(data);

    const headers = new Headers();

    headers.append("Content-Type", "application/json");



    // maximum error handling to maintain stability
    try {

        // execute request, follows redirects, expects json
        fetch(url, {method: 'GET', headers: headers, body: body, redirect: 'follow'})
            .then(body => body.json())
            .then(response => callback(response))
            .catch(error => callback(error, true));

    } catch(error) {
        callback(error, true);
    }

}


/**
 * Execute HTTP GET request, with fetch api as JSON.
 * @param {string} url - Url relative to root, for outside use `http(s)://`
 * @param {object} data - Parse a JavaScript object as requst body
 * @param {(response: object) => void} callback - Callback function for handling the response
 */

export const post = (url: string, data: object, callback: (response: object, error?: boolean) => void) => {
    
    // setting up request and body

    const body = JSON.stringify(data);

    const headers = new Headers();

    headers.append("Content-Type", "application/json");



    // maximum error handling to maintain stability
    try {

        // execute request, follows redirects, expects json
        fetch(url, {method: 'POST', headers: headers, body: body, redirect: 'follow'})
            .then(body => body.json())
            .then(response => callback(response))
            .catch(error => callback(error, true));

    } catch(error) {
        callback(error, true);
    }

}




/* Miscellaneous utilities */


/**
 * Generates a random string.
 * @param {string} length - Length of the string
 */

export const makeid = (length: number): string => {

    let id = '';

    // only strictly legal characters used
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {

        // picks random char
        id += characters.charAt(Math.floor(Math.random() * characters.length));

    }

    return id;

};

