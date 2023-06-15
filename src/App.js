import './App.css';
import React from 'react';
import Toolbar from './components/toolbar';
import Menubar from './components/menubar';
import Actionbar from './components/actionbar';
import Contextmenu from './components/contextmenu';
import Zoom from './components/zoom';
import Preview from './components/preview';
import { Stage } from 'foxyjs';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { stage: void 0 };
  }

  componentDidMount() {
    const board = document.querySelector('.board');
    const stage = new Stage(board);
    window.stage = stage;
    this.setState({
      stage,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.stage && <Menubar />}
        <div id="editor">
          {this.state.stage && <Toolbar />}
          <div className="board"></div>
          {this.state.stage && <Actionbar />}
        </div>
        {this.state.stage && <Contextmenu />}
        {this.state.stage && <Zoom />}
        {this.state.stage && <Preview />}
      </div>
    );
  }
}



export default App;
