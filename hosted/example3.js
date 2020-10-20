"use strict";

//controlling our state manually (though this could be done through libraries such as flux, redux or others)
var friendState = {
  name: 'Cody',
  friends: ['My', 'Myself', 'I', 'The gangs all here']
};
var newFriendState = {
  newFriend: ''
};

var renderList = function renderList() {
  //For each name in the names inherited array (friends in FriendsContainer)
  //we will put that name into an <li>. 
  var listItems = this.props.names.map(function (friend) {
    return /*#__PURE__*/React.createElement("li", null, " ", friend, " ");
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, " Friends "), /*#__PURE__*/React.createElement("ul", null, listItems));
};

var updateNewFriend = function updateNewFriend(e) {
  newFriendState.newFriend = e.target.value;
  ReactDOM.render( /*#__PURE__*/React.createElement(FriendsContainer, {
    name: friendState.name,
    friends: friendState.friends
  }), document.getElementById('app'));
};
/**
  Notice, we are using .concat instead of push.
  The concat function will create a new array
  from the old array with the new values appended.
  
  We call this immutability. 
  
  Why do we want the array to be immutable? 
  Well React and many frameworks check current values
  against the previous value to see differences. This 
  also means we can undo changes 
  (several times if we store several states).
  
  The difference check is actually much easier to maintain 
  and faster to calculate than trying to see if an array
  has been mutated over time (without having separate arrays or history).
  
  Changes in the array can trigger events like re-rendering and such. 
  Immutability makes this process much faster and easier.
**/


var addNewFriend = function addNewFriend(e) {
  friendState.friends = friendState.friends.concat([newFriendState.newFriend]);
  newFriendState.newFriend = '';
  ReactDOM.render( /*#__PURE__*/React.createElement(FriendsContainer, {
    name: friendState.name,
    friends: friendState.friends
  }), document.getElementById('app'));
}; //Creating a new React component

/** 
  This will create a component we can call in JSX generates HTML
  or other JSX that will be rendered.
  
  The following will create a React component called 
  AddFriend that, when we make <AddFriend /> tags,
  will render out AddFriend JSX.
  
  React has special events different from the normal events. 
  Instead of onclick or onchange, React has custom events with camelcase
  that automatically set up listeners and scope. 
  These are events like onClick and onChange. They work similarly, but
  have a lot of special code involved. 
  
  Items passed in as attributes are called props.
  These will be inherited as this.props in children
  made by this element. 

  The attribute name is the variable name
  <ShowList names=['Cody', 'V'] />
  would make a new ShowList object
  with this.props.names set equal to ['Cody', 'V']
  
  In this 
  <AddFriend addNew={addFriendToContainer} />
  line we are setting a prop inside of
  an AddFriend object as props.addNew 
  that is set equal to the Container's 
  addFriendToContainer function.
**/


var FriendsContainer = function FriendsContainer(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, " Name: ", props.name, " "), /*#__PURE__*/React.createElement(AddFriend, {
    newFriend: newFriendState.newFriend
  }), /*#__PURE__*/React.createElement(ShowList, {
    names: props.friends
  }));
};

var AddFriend = function AddFriend(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: props.newFriend,
    onChange: updateNewFriend
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addNewFriend
  }, " Add Friend "));
};
/**
  propTypes allows us to specify the variable type of custom
  props passed in from the parent. It will ensure the parent
  provides the correct variables and functions to the child element.
  
  PropTypes allow type checking on a variable.
  Check out prop type options here
  https://facebook.github.io/react/docs/typechecking-with-proptypes.html
**/


AddFriend.propTypes = {
  addNew: PropTypes.func.isRequired,
  newFriend: PropTypes.string.isRequired
};

var ShowList = function ShowList(props) {
  //map is a build-in for-each loop for an array
  //but lets you selectively add/edit/remove
  //on the fly while building a new array
  var listItems = props.names.map(function (friend) {
    return /*#__PURE__*/React.createElement("li", null, " ", friend, " ");
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, " Friends "), /*#__PURE__*/React.createElement("ul", null, listItems));
};

var init = function init() {
  ReactDOM.render( /*#__PURE__*/React.createElement(FriendsContainer, {
    name: friendState.name,
    friends: friendState.friends
  }), document.getElementById('app'));
};

window.onload = init;