var mainContainer = $("#main_container");

var logout = function () {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        console.log("success");
        window.location.replace("login.html");
      },
      function () {}
    );
};

var init = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("stay");
      mainContainer.css("display", "");

      // user details
      const userId = user.uid;
      const userName = user.displayName;

      var UID = userId;
      CometChat.getUser(UID).then(
        (user) => {
          console.log("User details fetched for user:", user);

          //You can now call login function.
          CometChatWidget.login({
            uid: userId,
          }).then(
            (response) => {
              CometChatWidget.launch({
                widgetID: "0a095bb8-74a4-4f2d-830d-36c669555f5d",
                target: "#cometchat",
                roundedCorners: "true",
                height: "600px",
                width: "800px",
                defaultID: "superhero1", //default UID (user) or GUID (group) to show,
                defaultType: "user", //user or group
              });
            },
            (error) => {
              console.log("User login failed with error:", error);
              //Check the reason for error and take appropriate action.
            }
          );
        },
        (error) => {
          console.log("User details fetching failed with error:", error);

          // create user
          let apiKey = "a660ee508bb8d428d37daf432c1bec1f529653ef";
          var uid = userId;
          var name = userName;

          var user = new CometChat.User(uid);

          user.setName(name);

          CometChat.createUser(user, apiKey).then(
            (user) => {
              console.log("user created", user);

              //You can now call login function.
              CometChatWidget.login({
                uid: userId,
              }).then(
                (response) => {
                  CometChatWidget.launch({
                    widgetID: "0a095bb8-74a4-4f2d-830d-36c669555f5d",
                    docked: "true",
                    alignment: "left", //left or right
                    roundedCorners: "true",
                    height: "450px",
                    width: "400px",
                    defaultID: "superhero1", //default UID (user) or GUID (group) to show,
                    defaultType: "user", //user or group
                  });
                },
                (error) => {
                  console.log("User login failed with error:", error);
                  //Check the reason for error and take appropriate action.
                }
              );
            },
            (error) => {
              console.log("error", error);
            }
          );
        }
      );
    } else {
      // log user out of CometChat
      CometChat.logout().then(
        () => {
          //Logout completed successfully
          console.log("Logout completed successfully");
        },
        (error) => {
          //Logout failed with exception
          console.log("Logout failed with exception:", { error });
        }
      );

      // No user is signed in.
      mainContainer.css("display", "none");
      console.log("redirect");
      window.location.replace("login.html");
    }
  });
};

init();
