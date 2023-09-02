import React, { Component } from 'react';
import '../styles/form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      formErrors: { searchQuery: '' },
      formValid: false,
      userData: {},
      totalStats: {},
      mods: {},
      profileData: {},
      showLoading: false,
      loadingText: 'Loading',
      fetchDataIntervalId: null,
    };
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let searchValid = false;
    let userName = '';

    if (fieldName === 'searchQuery') {
      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      const userLinkRegex =
        /^(https?:\/\/)?(www\.)?steamcommunity\.com\/id\/(\w+)(\/myworkshopfiles(\/\?appid=\d+)?)?\/?$/;

      const matchLink = value.match(userLinkRegex);
      const matchUserName = value.match(usernameRegex);

      searchValid = userLinkRegex.test(value) || usernameRegex.test(value);

      formErrors.searchQuery = searchValid || value === '' ? '' : ' is invalid';

      if (matchLink) {
        userName = matchLink[3];
      } else if (matchUserName) {
        userName = matchUserName[0];
      }

      console.log(userName);
    }

    this.setState(
      {
        formErrors,
        formValid: searchValid,
        userName: userName,
      },
      this.validateForm
    );
  }

  validateForm() {
    // You can add additional form-level validation here if needed
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.fetchDataIntervalId) {
      clearInterval(this.state.fetchDataIntervalId);
    }

    this.setState({
      showLoading: true,
    });
    this.props.mods({});
    this.props.totalStats({});
    this.props.userData({});
    this.props.profileData({});

    //alert(ref.current.value);
    fetch('/search/' + this.state.userName)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          showLoading: false,
        });
        this.props.mods(data.modList); // Assuming `data.modList` is the data you want to update
        this.props.userData(data.userData);
        this.props.totalStats(data.totalStats);
        console.log(data.profileData);
        this.props.profileData(data.profileData);
        //console.log(data.modList)
      });

    const fetchDataIntervalId = setInterval(() => {
      fetch('/search/' + this.state.searchQuery)
        .then((res) => res.json())
        .then((data) => {
          this.props.mods(data.modList); // Assuming `data.modList` is the data you want to update
          this.props.userData(data.userData);
          this.props.totalStats(data.totalStats);
          this.props.profileData(data.profileData);
          //console.log(data.modList)
        });
    }, 30000);

    this.setState({ fetchDataIntervalId });
  };

  componentDidMount() {
    this.loadingTextInterval = setInterval(() => {
      this.setState((prevState) => {
        const loadingTextVariations = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
        const currentIndex = (loadingTextVariations.indexOf(prevState.loadingText) + 1) % loadingTextVariations.length;
        return { loadingText: loadingTextVariations[currentIndex] };
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.loadingTextInterval);
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  renderFormErrors() {
    const { formErrors } = this.state;

    return (
      <div className="formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return (
              <p key={i} className={fieldName === 'searchQuery' ? 'searchWarning' : ''}>
                {fieldName === 'searchQuery'
                  ? 'Please enter a valid steam ID, profile link, or workshop URL'
                  : `${fieldName} ${formErrors[fieldName]}`}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  render() {
    const { searchQuery, formErrors, formValid, showLoading } = this.state;

    return (
      <>
        <div className="wrapper">
          <div className="introText">Enter Steam ID, profile link, or workshop link to get started...</div>
          <div className="searchContainer">
            <div className="searchContainer2">
              <form
                className={`search-form form-container ${this.errorClass(formErrors.searchQuery)}`}
                onSubmit={this.handleSubmit}
              >
                <input
                  onChange={this.handleUserInput}
                  name="searchQuery"
                  type="search"
                  placeholder="Search for user..."
                  className="input-text"
                  value={searchQuery}
                />
                <button
                  type="submit"
                  className="input-submit"
                  disabled={!formValid || showLoading}
                  title={!formValid || showLoading ? 'Please enter a valid search query' : 'Click to search'}
                >
                  Search
                </button>
              </form>
              {this.renderFormErrors()}

              <div className="loadingText">{this.state.showLoading ? this.state.loadingText : ''}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Form;
