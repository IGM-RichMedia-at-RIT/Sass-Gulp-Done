const handleNameChange = (e) => {
  ReactDOM.render(
    <HelloUser username={e.target.value} />,
    document.getElementById('app')
  );
};

const HelloUser = (props) => {
  //onChange is a custom react listener for element.onchange. 
  //We can embed it in elements, but it doesn't get rendered into the HTML
  //Instead it gets interpreted by JSX and adds a listener 
  return (
    <div>
      Hello {props.username}
      <p>Change Name:</p>
      <input type="text" value={props.username} onChange={handleNameChange} />
    </div>
  )
};

const init = () => {
  ReactDOM.render(
    <HelloUser username='Cody' />,
    document.getElementById('app')
  );
};

window.onload = init;