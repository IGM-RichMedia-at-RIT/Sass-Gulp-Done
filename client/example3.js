//controlling our state manually (though this could be done through libraries such as flux, redux or others)

const friendState = {
  name: 'Cody',
  friends: ['My', 'Myself', 'I', 'The gangs all here'], 
}

const newFriendState = {
  newFriend: ''
};

const renderList = function() {
  //For each name in the names inherited array (friends in FriendsContainer)
  //we will put that name into an <li>. 
  const listItems = this.props.names.map((friend) => {
    return <li> {friend} </li>;
  });
  
  return (
    <div>
      <h3> Friends </h3>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};


const updateNewFriend = (e) => {
  newFriendState.newFriend = e.target.value;
  
  ReactDOM.render(
    <FriendsContainer name={friendState.name} friends={friendState.friends} />,
    document.getElementById('app')
  );
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
const addNewFriend = function(e) {
  friendState.friends = friendState.friends.concat([newFriendState.newFriend]);

  newFriendState.newFriend = '';
  
  ReactDOM.render(
    <FriendsContainer name={friendState.name} friends={friendState.friends} />,
    document.getElementById('app')
  );
};

//Creating a new React component
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
const FriendsContainer = (props) => {
  return (
    <div>
      <h3> Name: {props.name} </h3>
      <AddFriend newFriend={newFriendState.newFriend} />
      <ShowList names={props.friends} />
    </div>
  )
};


const AddFriend = (props) => {
  return (
    <div>
      <input type="text" value={props.newFriend} onChange={updateNewFriend} />
      <button onClick={addNewFriend}> Add Friend </button>
    </div>
  ); 
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

const ShowList = function(props) {
  //map is a build-in for-each loop for an array
  //but lets you selectively add/edit/remove
  //on the fly while building a new array
  const listItems = props.names.map((friend) => {
    return <li> {friend} </li>;
  });
  return (
    <div>
      <h3> Friends </h3>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

const init = () => {
  ReactDOM.render(
    <FriendsContainer name={friendState.name} friends={friendState.friends} />,
    document.getElementById('app')
  );
};

window.onload = init;