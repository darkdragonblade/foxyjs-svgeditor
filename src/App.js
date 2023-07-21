import './App.css';
import React from 'react';
import Toolbar from './components/toolbar';
import Menubar from './components/menubar';
import Actionbar from './components/actionbar';
import Contextmenu from './components/contextmenu';
// import Preview from './components/preview';
import { Stage } from 'foxyjs';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { stage: void 0 };
  }

  componentDidMount = () => {
    const board = document.querySelector('.board');
    const stage = new Stage(board);
    window.stage = stage;
    this.setState({
      stage,
    });

    //   const s = document.head.querySelector(':scope > meta[name="icons"]');
    // const icons = s ? s.content
    //   .split(",")
    //   .map((t) => t.trim())
    //   .find((t) => "" !== t)
    //   : ""
    // let e;
    // try {

    //   fetch(icons).then(async (data) => {
    //     const text = await data.text();
    //     console.log(text);
    //     let domparser = new DOMParser();
    //     const svg = domparser.parseFromString(text, 'text/html');


    //     const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    //     svgg.setAttribute('preserveAspectRatio', 'none');
    //     svgg.setAttribute('viewBox', '0 0 100 100');
    //     svgg.setAttribute('width', '0px');
    //     svgg.setAttribute('height', '0px');

    //     svgg.id = 'svg';


    //     svgg.innerHTML = svg.querySelector('#transform-tool').innerHTML;
    //     document.body.append(svgg);

    //   });
    // } catch (t) {

    // }

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

        {/* {this.state.stage && <Preview />} */}
      </div>
    );
  }
}



export default App;
