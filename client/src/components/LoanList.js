import React, { Component } from 'react';
import axios from 'axios';

class LoanList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loansCollection: []
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage["user"]);
        const token = user.token;
        axios({
            method: 'get',
            url: 'http://localhost:5000/business',
            headers: {token: token }
        })
            .then(res => {
                this.setState({ loansCollection: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getAllBusinessesWithLoans() {
        return this.state.loansCollection.map((data, i) => {
            if (data.loan) {
                const arrayLength = data.loan.status.length;
                return <tr>
                    <td><a href={`/dashboard/loans/${data._id}`}>{data.businessName}</a></td>
                    <td>${data.loan.amount}</td>
                    <td>{data.loan.status[arrayLength-1].currentStatus}</td>
                </tr>;
            }
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <td>Merchant </td>
                            <td>Amount Requested</td>
                            <td>Application Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getAllBusinessesWithLoans()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default LoanList;