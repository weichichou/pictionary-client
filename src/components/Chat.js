import React from "react";
import { connect } from "react-redux";
import { guessed, triggerHint } from "../actions/guessAction";

class Chat extends React.Component {
  state = {
    text: "",
    chat: [],
    roundover: "",
  };

  componentDidMount = () => {
    // socket.on是一個註冊的動作
    this.props.socket.on("chat msg", (msg) => {
      this.setState({ chat: [...this.state.chat, msg] });
    });
    this.props.socket.on("roundover", (username) => {
      this.setState({ roundover: username });
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

    this.props.socket.emit("chat msg", {
      username: this.props.username,
      text: this.state.text,
    });
    this.checkAnswer(this.state.text);
  };

  checkAnswer = (text) => {
    if (text === this.props.question) {
      this.props.socket.emit("roundover", this.props.username);
    }
  };

  render() {
    return (
      <div>
        <div>
          {this.state.chat.map((item) => (
            <ul key={item.text}>{`${item.username}: ${item.text}`}</ul>
          ))}
        </div>
        <div className="winning-msg">
          {this.state.roundover !== "" ? `${this.state.roundover} wins!` : ""}
        </div>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            onChange={this.handleChange}
            name="text"
            value={this.state.text}
            type="text"
            placeholder="Your answer"
            required
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
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
