import React from "react";
import DisplaySingleRepo from "./DisplayRepo";
import Showdependency from "./Showdependency";
import SplitterLayout from "react-splitter-layout";
class DisplayRepos extends React.Component {
  concatingdata = data => {
    this.props.click(data);
  };
  render() {
    let dependencies = this.props.jsoncontent;
    let counteddependencies = dependencies.reduce(
      (alldependencies, dependency) => {
        if (dependency in alldependencies) {
          alldependencies[dependency]++;
        } else {
          alldependencies[dependency] = 1;
        }
        return alldependencies;
      },
      {}
    );
    let dependenciesarray = Object.entries(counteddependencies);
    let sortingdependencies = dependenciesarray.sort((a, b) => {
      return b[1] - a[1];
    });
    let toptendependencies = sortingdependencies.filter((item, i) => {
      return i < 10;
    });
    return (
      <SplitterLayout>
        <div>
          {this.props.repositems.map((item, i) => (
            <DisplaySingleRepo
              click={this.concatingdata}
              key={item.id}
              serialno={i + 1}
              {...item}
            />
          ))}
        </div>
        <div>
          {toptendependencies.map((item, i) => (
            <Showdependency key={i} name={item[0]} count={item[1]} />
          ))}
        </div>
      </SplitterLayout>
    );
  }
}

export default DisplayRepos;
