import React, { Component } from 'react';

import QuestionEdit from './question_edit/QuestionEdit';

class QuizEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quiz-editor">
        {this.props.questions.map((question) => (
          <QuestionEdit
            question={question}
            onQuestionTextChange={this.props.onQuestionTextChange }
            onQuestionChoiceChange={this.props.onQuestionChoiceChange}/>
        ))}
        <button
          className="secondary-button block"
          onClick={this.props.onAddQuestion}>
            <i class="fas fa-plus-circle"> </i>
            Add Question
        </button>
      </div>
    )
  }
}

export default QuizEditor;
