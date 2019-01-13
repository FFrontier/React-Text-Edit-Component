var TextEditComponent = React.createClass({
  displayName: 'TextEditComponent',

  propTypes: {
    text: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      text: this.props.text,
      split_text: null,
      edit: null,
    };
  },

  componentWillMount() {
    let text = this.state.text;
        text = text.split(' ');
    this.state.split_text = text;
  },

  componentDidUpdate() {
    if (this.state.edit != null) {
      document.getElementById(this.state.edit).focus();
    }
  },

  _showEditor: function (e) {
    this.setState({edit: e.target.id});
  },

  _save: function (e) {
    if (e.key === 'Enter') {
      if (e.target.tagName.toUpperCase() == 'INPUT') {
        let data = this.state.split_text.slice();
        data[this.state.edit] = e.target.value;
        this.setState({
          edit: null,
          split_text: data,
        });
      }
    }
  },

  render: function () {
    let wId = this.state.edit;
    return (
        React.DOM.div({onClick: this._showEditor, onKeyPress: this._save},
            this.state.split_text.map(function (word, idx) {
                      let content =  React.DOM.span({id: idx, key: idx},
                          word
                      );
                      if (idx == wId){

                        content = React.DOM.input({
                          type: word,
                          id: idx,
                          defaultValue: word,
                          key: idx,
                        })

                      }
                  return content;
                }
            )
        )
    );
  }

});