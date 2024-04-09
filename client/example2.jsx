//JSX to be built by webpack. See React Functional Component demo.
const React = require('react');
const {createRoot} = require('react-dom/client');

const HelloUser = (props) => {
  const [username, setUsername] = React.useState(props.username);

  return (
    <div>
      <p>Hello {username}</p>
      <label>Change Name: </label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    </div>
  )
}

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<HelloUser username='Austin' />);
};

window.onload = init;
