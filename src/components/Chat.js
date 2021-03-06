import React from "react";
import { connect } from "react-redux";
import { guessed, triggerHint } from "../actions/guessAction";

class Chat extends React.Component {
  state = {
    text: "",
    chat: [],
  };

  componentDidMount = () => {
    // socket.on是一個註冊的動作
    this.props.socket.on("chat msg", (msg) => {
      console.log("msg in client side", msg);
      this.setState({ chat: [...this.state.chat, msg] });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ text: "" });

    this.props.guessed(this.state.text);
    this.props.triggerHint(this.state.text, this.props.question);

    this.props.socket.emit("chat msg", this.state.text);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.chat.map((item) => (
            <ul key={item}>{item}</ul>
          ))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="text"
            value={this.state.text}
            type="text"
            placeholder="Your answer"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    question: reduxState.question,
    guess: reduxState.guess,
    hint: reduxState.hint,
  };
};

export default connect(mapStateToProps, { guessed, triggerHint })(Chat);
