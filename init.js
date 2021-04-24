var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
  apiKey: "AIzaSyBnqTPtrSqHu33dhXRydhfjxUPFsUOz1M4",
  authDomain: "cometchat-jquery.firebaseapp.com",
  projectId: "cometchat-jquery",
  storageBucket: "cometchat-jquery.appspot.com",
  messagingSenderId: "417540857629",
  appId: "1:417540857629:web:1e36cc4670e5a0ccb7cbf4",
};
if (!hasInit) {
  firebase.initializeApp(config);
  hasInit = true;
}

(function () {
  // cometchat initialization
  var appID = "324411fcdc5bd35";
  var region = "us";
  var appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    (error) => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );
})();

// cometchat widget initialization
window.addEventListener("DOMContentLoaded", (event) => {
  CometChatWidget.init({
    appID: "324411fcdc5bd35",
    appRegion: "us",
    authKey: "3dbb7f5703362a6c3abd6f5e8974d5ef6bac4645",
  }).then(
    (response) => {
      console.log("Initialization (CometChatWidget) completed successfully");
    },
    (error) => {
      console.log("Initialization (CometChatWidget) failed with error:", error);
      //Check the reason for error and take appropriate action.
    }
  );
});
