import React, { Component } from 'react';
import '../styles/form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      formErrors: { searchQuery: '' },
      formValid: false,
      userName: '',
      userData: {},
      totalStats: {}
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
      const userLinkRegex = /^(https?:\/\/)?(www\.)?steamcommunity\.com\/id\/(\w+)(\/myworkshopfiles(\/\?appid=\d+)?)?\/?$/;
  
      const matchLink = value.match(userLinkRegex);
      const matchUserName = value.match(usernameRegex);
  
      searchValid = userLinkRegex.test(value) || usernameRegex.test(value);
  
      formErrors.searchQuery = searchValid || value === '' ? '' : ' is invalid';
  
      if (matchLink) {
        userName = matchLink[3];
      } else if (matchUserName) {
        userName = matchUserName[0];
      }
    }
  
    this.setState(
      {
        formErrors,
        formValid: searchValid,
        userName: userName
      },
      this.validateForm
    );
  }

  validateForm() {
    // You can add additional form-level validation here if needed
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //alert(ref.current.value);

    fetch("/search/"+this.state.searchQuery)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.userData)
      });

  };

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  renderFormErrors() {
    const { formErrors } = this.state;

    return (
      <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return (
              <p key={i} className={fieldName === 'searchQuery' ? 'searchWarning' : ''}>
                {fieldName === 'searchQuery' ? 'Please enter a valid steam ID, profile link, or workshop URL' : `${fieldName} ${formErrors[fieldName]}`}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  render() {
    const { searchQuery, formErrors, formValid } = this.state;

    return (
      <>
        <div className='wrapper'>
          <div className='introText'>Enter Steam ID, profile link, or workshop link to get started...</div>
          <div className='searchContainer'>
            

            <div className='searchContainer2'>
              <form className={`search-form form-container ${this.errorClass(formErrors.searchQuery)}`} onSubmit={this.handleSubmit}>
                <input
                  onChange={this.handleUserInput}
                  name='searchQuery'
                  type='search'
                  placeholder='Search for user...'
                  className='input-text'
                  value={searchQuery}
                />
                <button type='submit' className='input-submit' disabled={!formValid}>
                  Search
                </button>
              </form>
              {this.renderFormErrors()}
            </div>

            <div className='profileName'><p value={this.state.userData.userName}>{this.state.userData.userName}</p></div>

            {/* <p value={followers}>{followers} Followers</p> */}
          </div>
        </div>
      </>
      // disabled={!formValid}
    );
  }
}

export default Form;