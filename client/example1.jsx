//JSX to be built by webpack. See React Functional Component demo.
const React = require('react');
const {createRoot} = require('react-dom/client');

const HelloWorld = () => {
  return (
      <div>
          Hello World!!
      </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<HelloWorld />);
};

window.onload = init;