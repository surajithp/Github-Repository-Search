import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import DisplayRepos from "./DisplayRepos";
import Pagination from "./Pagination";

class App extends React.Component {
  state = { data: [], pagenumber: 0, searchkeyword: "" };
  onReposearch = async keyword => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc&per_page=20&page=${this
        .state.pagenumber + 1}`
    );
    const repo = keyword;
    let reposdata = response.data.items;
    this.setState({
      data: reposdata,
      pagenumber: this.state.pagenumber + 1,
      searchkeyword: repo
    });
  };
  onPrevPageSearch = async keyword => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc&per_page=20&page=${this
        .state.pagenumber - 1}`
    );
    let reposdata = response.data.items;
    this.setState({
      data: reposdata,
      pagenumber: this.state.pagenumber - 1
    });
  };
  pagnation = () => {
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
  render() {
    console.log(this.state.data);
    return (
      <div>
        <SearchBar onclick={this.onReposearch} />
        <DisplayRepos repositems={this.state.data} />
        <div>{this.pagnation()}</div>
      </div>
    );
  }
}

export default App;
