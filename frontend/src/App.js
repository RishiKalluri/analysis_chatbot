import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'
import ChatBot from 'react-simple-chatbot';
import styledComponents from "styled-components"

class AnalysisBot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.chatInput.value;


    const queryUrl = `https://secret-chamber-49228.herokuapp.com/process_chat`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        const data = this.responseText;
        console.log(data)

        self.setState({ loading: false, result: data });

      }
    }

    var params = {
      'message': search
    }
    xhr.open('POST', queryUrl);
    xhr.send(JSON.stringify(params));
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        {result }
      </div>

    );
  }
}

AnalysisBot.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

AnalysisBot.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};


class App extends Component {
  render() {
    return (
      <div>
        <ChatBot steps={
                [{
                        id: '1',
                        message: 'Hello World',
                        trigger: 'chatInput',
                    },
                    {
                        id: 'chatInput',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        component: <AnalysisBot/>,
                        asMessage: true,
                        trigger: 'chatInput'
                    }

                ]}
                 hideHeader={true}
                 width={100}/>
      </div>
    );
  }
}

export default App;
