//----------------------------------------------------
// brainCloud client source code
// Copyright 2016 bitHeads, inc.
//----------------------------------------------------

brainCloudClient.version = "2.26.0";

/**
 * Initializes the brainCloud client with your game information. This method
 * must be called before any API method is invoked.
 *
 * @param {string}
 *            gameId - The game id
 * @param {string}
 *            secret - The game secret
 * @param {string}
 *            gameVersion - The game version (e.g. "1.0.0").
 */
brainCloudClient.initialize = function(gameId, secret, gameVersion) {
    brainCloudManager.initialize(gameId, secret, gameVersion);
};

/**
 * Initializes the identity service with the most recently
 * used profile id and saved anonymous installation id
 *
 * @param profileId The id of the profile id that was most recently used by the app (on this device)
 * @param anonymousId  The anonymous installation id that was generated for this device
 */
brainCloudClient.initializeIdentity = function(profileId, anonymousId) {
    brainCloudClient.authentication.initialize(profileId, anonymousId);
};

/**
 * Sets the brainCloud server URL. Developers should not need to change this
 * value.
 *
 * @param serverUrl
 *            {string} - The server URL e.g. "https://sharedprod.braincloudservers.com"
 */
brainCloudClient.setServerUrl = function(serverUrl) {
    brainCloudManager.setServerUrl(serverUrl);
};

/**
 * Returns the session id if a connection with brainCloud has been established.
 *
 * @return {string} - The brainCloud session id.
 */
brainCloudClient.getSessionId = function() {
    return brainCloudManager.getSessionId();
};

/**
 * Sets a callback handler for any out of band messages that come from
 * brainCloud (essentially any message sent from brainCloud that wasn't in
 * direct response to a client request).
 *
 * @param eventCallback
 *            {function} eventCallback is a function which takes a json object as it's only parameter
 *
 * where jsonEvents looks like the following:
 * {
 *   "events": [{
 *      "fromPlayerId": "178ed06a-d575-4591-8970-e23a5d35f9df",
 *      "eventId": 3967,
 *      "createdAt": 1441742105908,
 *      "gameId": "10170",
 *      "toPlayerId": "178ed06a-d575-4591-8970-e23a5d35f9df",
 *      "eventType": "test",
 *      "eventData": {"testData": 117}
 *    }],
 *    ]
 *  }
 *
 * @see brainCloudClient.events
 */
brainCloudClient.registerEventCallback = function(eventCallback) {
    brainCloudManager.registerEventCallback(eventCallback);
};

/**
 * Deregisters the event callback.
 */
brainCloudClient.deregisterEventCallback = function() {
    brainCloudManager.deregisterEventCallback();
};

/**
 * Sets a reward handler for any api call results that return rewards.
 *
 * @param in_rewardCallback The reward callback handler.
 * @see The brainCloud apidocs site for more information on the return JSON
 */
brainCloudClient.registerRewardCallback = function(rewardCallback) {
    brainCloudManager.registerRewardCallback(rewardCallback);
};

/**
 * Deregisters the reward callback
 */
brainCloudClient.deregisterRewardCallback = function() {
    brainCloudManager.deregisterRewardCallback();
};

/**
 * Sets a callback handler for any error messages that come from brainCloud.
 * This will include any networking errors as well as requests from the client
 * which do not register a callback handler.
 *
 * @param errorCallback
 *            {function} - The error callback
 */
brainCloudClient.setErrorCallback = function(errorCallback) {
    brainCloudManager.setErrorCallback(errorCallback);
};

/**
 * Turns on/off debugging. This will write all requests/responses
 * to the javascript console log.
 *
 * @param debugEnabled
 *            {boolean} - True to enable debugging, false otherwise.
 */
brainCloudClient.enableLogging = function(enableLogging) {
    brainCloudManager.setDebugEnabled(enableLogging);
};

// deprecated
brainCloudClient.setDebugEnabled = function(debugEnabled) {
    brainCloudManager.setDebugEnabled(debugEnabled);
};

/**
 * Set this flag to use (or not use) jquery as the underlying
 * mechanism to execute http calls. By default, this is true.
 *
 * @param useJQuery
 * {boolean} - True to use JQuery, false otherwise.
 */
brainCloudClient.useJQuery = function(value) {
    brainCloudManager.useJQuery(value);
};

/**
 * Returns whether the client is initialized.
 * @return True if initialized, false otherwise.
 */
brainCloudClient.isInitialized = function() {
    return brainCloudManager.isInitialized();
};

/**
 * Returns whether the client is authenticated with the brainCloud server.
 * @return True if authenticated, false otherwise.
 */
brainCloudClient.isAuthenticated = function() {
    return brainCloudManager.isAuthenticated();
};

brainCloudClient.resetCommunication = function() {
    brainCloudManager.resetCommunication();
};

/**
 * Inserts a marker which will tell the brainCloud comms layer
 * to close the message bundle off at this point. Any messages queued
 * before this method was called will likely be bundled together in
 * the next send to the server.
 *
 * To ensure that only a single message is sent to the server you would
 * do something like this:
 *
 * InsertEndOfMessageBundleMarker()
 * SomeApiCall()
 * InsertEndOfMessageBundleMarker()
 *
 */
brainCloudClient.insertEndOfMessageBundleMarker = function() {
    var message = {
        "operation": "END_BUNDLE_MARKER"
    };
    brainCloudManager.sendRequest(message);
};

brainCloudClient.heartbeat = function(callback) {
    brainCloudManager.sendRequest({
        service : "heartbeat",
        operation : "READ",
        callback : callback
    });
};
