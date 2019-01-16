/* eslint-disable no-console */
import 'rc-cascader/assets/index.less';
import Cascader from 'rc-cascader';
import React from 'react';
import ReactDOM from 'react-dom';

const addressOptions = [
  {
    label: '福建',
    isLeaf: false,
    value: 'fj',
  },
  {
    label: '浙江',
    isLeaf: false,
    value: 'zj',
  },
];

class Demo extends React.Component {
  state = {
    inputValue: '',
    options: addressOptions,
  };

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join(', '),
    });
  };

  loadData = selectedOptions => {
    return new Promise(resolve => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      // 动态加载下级数据
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.loaded = true;
        if (targetOption.value === 'dynamic1') {
          targetOption.isleaf = true;
        } else {
          targetOption.children = [
            {
              label: `${targetOption.label}动态加载1`,
              value: 'dynamic1',
              isLeaf: false,
            },
            {
              label: `${targetOption.label}动态加载2`,
              value: 'dynamic2',
              isLeaf: false,
            },
          ];
          this.setState({
            options: [...this.state.options],
          });
        }
        resolve();
      }, 1000);
    });
  };

  render() {
    return (
      <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange}>
        <input value={this.state.inputValue} readOnly />
      </Cascader>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
