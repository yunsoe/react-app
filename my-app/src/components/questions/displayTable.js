import React from 'react';
import axios from 'axios';
import Table from './Table.js';

class DisplayTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.answer,
            maxSharpeTableData: [],
            targetVolTableData: [],
            targetReturnTableData: [],
            columns: [
                { heading: 'ETF', value: 'asset_name' },
                { heading: 'Annualized Return (%)', value: 'annualized_return' },
                { heading: 'Annualized Volatility (%)', value: 'annualized_vol' },
                { heading: 'Sharp Ratio', value: 'sharpe_ratio' },
                { heading: 'Allocation (%)', value: 'allocation' },
            ],
        }
    }

    componentDidMount = () => {
        console.log("Inside Display Table :", this.props.answer);
        this.fetchData();
    }
    fetchData = async () => {
        let url = 'http://127.0.0.1:8000/optimizer/?Q1=' + this.props.answer[0] + '&Q2=' + this.props.answer[1] + '&Q3=' + this.props.answer[2] + '&Q4=' + this.props.answer[3] + '&Q5=' + this.props.answer[4] + '&Q6=' + this.props.answer[5] + '&data_source=saved'
        await axios.get(url)
            .then((res) => {
                console.log(res);
                let data = res.data;
                let maxsharpedata = [];
                let targetvoldata = [];
                let targetreturndata = [];
                for (let i = 0; i < data.length; i++) {
                    data[i].asset_name = data[i].asset_name+' ('+ data[i].asset_ticker +')';
                    data[i].annualized_return = data[i].annualized_return*100;
                    data[i].annualized_vol = data[i].annualized_vol*100;

                    if (data[i].Portfolio === 'Max Sharpe') {
                        maxsharpedata.push(data[i]);
                    }
                    else if (data[i].Portfolio === 'Target Vol') {
                        targetvoldata.push(data[[i]]);
                    }
                    else {
                        targetreturndata.push(data[i]);
                    }
                }
                this.setState({
                    maxSharpeTableData: maxsharpedata,
                    targetVolTableData: targetvoldata,
                    targetReturnTableData: targetreturndata,
                });

            }).catch((e) => {
                console.log(e);
            })
    }
    render() {

        return (
            <div>
                <h1 className='centre'>Here's your final portfolio</h1>
                <span>The following allocation best suits you!</span>
                {this.state.maxSharpeTableData.length > 0 &&
                    <Table
                        data={this.state.maxSharpeTableData}
                        column={this.state.columns}
                        type='Max Sharpe' />
                }
                {this.state.targetVolTableData.length > 0 &&
                    <Table
                        data={this.state.targetVolTableData}
                        column={this.state.columns}
                        type='Target Vol' />
                }
                {this.state.targetReturnTableData.length > 0 &&
                    <Table
                        data={this.state.targetReturnTableData}
                        column={this.state.columns}
                        type='Target Return' />
                }

                <h2 className='centre'>We're almost at the end...just a few more questions...</h2>


            </div>
        );
    }
}

export default DisplayTable;



