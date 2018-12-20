import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import DisplayRepos from "./DisplayRepos";
import Pagination from "./Pagination";

class App extends React.Component {
  state = { data: [], pagenumber: 0, searchkeyword: "", jsondata: [] };
  onReposearch = async keyword => {
    if (keyword !== "") {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc&per_page=20&page=${this
          .state.pagenumber + 1}`
      );
      const repo = keyword;
      let reposdata = response.data.items;
      this.setState({
        data: reposdata,
        pagenumber: this.state.pagenumber + 1,
        searchkeyword: repo,
        jsondata: []
      });
    } else {
      return alert("Enter something before submittimg");
    }
  };
  toResetpage = value => {
    if (value === "" || value !== this.state.searchkeyword) {
      this.setState({ pagenumber: 0, data: [] });
    } else {
      return;
    }
  };

  onPrevPageSearch = async keyword => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc&per_page=20&page=${this
        .state.pagenumber - 1}`
    );
    let reposdata = response.data.items;
    this.setState({
      data: reposdata,
      pagenumber: this.state.pagenumber - 1,
      jsondata: []
    });
  };
  toResetpage = value => {
    if (value === "" || value !== this.state.searchkeyword) {
      this.setState({ pagenumber: 0, data: [], jsondata: [] });
    } else {
      return;
    }
  };
  pagination = () => {
    if (this.state.pagenumber === 0) {
      return null;
    } else if (this.state.pagenumber === 1) {
      return (
        <Pagination
          pagenumber={this.state.pagenumber}
          reponame={this.state.searchkeyword}
          clicknext={this.onReposearch}
          disabled={true}
        />
      );
    } else {
      return (
        <Pagination
          pagenumber={this.state.pagenumber}
          reponame={this.state.searchkeyword}
          clicknext={this.onReposearch}
          clickprev={this.onPrevPageSearch}
          disabled={false}
        />
      );
    }
  };
  disableSearchbutton = () => {
    if (this.state.pagenumber === 0) {
      return (
        <SearchBar
          disable={false}
          onclick={this.onReposearch}
          inputchange={this.toResetpage}
        />
      );
    } else {
      return <SearchBar disable={true} inputchange={this.toResetpage} />;
    }
  };

  onStoringJsondata = data => {
    this.setState(prevState => ({
      jsondata: prevState.jsondata.concat(data)
    }));
  };

  render() {
    console.log(this.state.jsondata);
    return (
      <div>
        <div>{this.disableSearchbutton()}</div>
        <DisplayRepos
          jsoncontent={this.state.jsondata}
          click={this.onStoringJsondata}
          repositems={this.state.data}
        />

        <div>{this.pagination()}</div>
      </div>
    );
  }
}

export default App;
