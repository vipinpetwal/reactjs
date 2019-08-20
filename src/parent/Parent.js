import React from 'react';
import './Parent.css';
import Child from '../child/Child';

class Parent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displaydata: [{ "id": 1, "name": "TestRLSWell01", "type": "rls", "source": "1000001" }, { "id": 2, "name": "TestESPWell02", "type": "esp", "source": "1000002" }, { "id": 3, "name": "TestRLSWell03", "type": "rls", "source": "1000003" }],
            selectedrow: {}
        }
    }

    fetchDetails = (data) => {
        this.setState({ selectedrow: data })
    }

    callbackFunction = (childData) => {
        this.setState({ displaydata: this.state.displaydata.concat(childData) })
    }

    render() {
        return (
            <div>
                <h1>Parent Component</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.displaydata.map(obj => {
                                    return (
                                        <tr onClick={() => this.fetchDetails(obj)} key={obj.id}>
                                            <td>{obj.name}</td>
                                            <td>{obj.type}</td>
                                            <td onClick={this.clickSource}>{obj.source}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>

                    </table>
                </div>
                {
                    Object.keys(this.state.selectedrow).length > 0 && (
                        <div>
                            <Child listNameFromParent={this.state.selectedrow} parentCallback={this.callbackFunction} />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Parent;