import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './Home.css';


const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }, { id: 2, title: 'Lol the Barbarian', year: '1986' },
{ id: 3, title: 'Bmh the Barbarian', year: '1966' }, { id: 6, title: 'Ade the Barbarian', year: '1935' },
{ id: 4, title: 'Iyt the Barbarian', year: '1977' }, { id: 7, title: 'Xre the Barbarian', year: '1939' },
{ id: 5, title: 'Vcd the Barbarian', year: '1988' }, { id: 8, title: 'Hyt the Barbarian', year: '1972' },


{ id: 9, title: 'Conan the Barbarian', year: '1982' }, { id:13, title: 'Lol the Barbarian', year: '1986' },
{ id: 10, title: 'Bmh the Barbarian', year: '1966' }, { id: 14, title: 'Ade the Barbarian', year: '1935' },
{ id: 11, title: 'Iyt the Barbarian', year: '1977' }, { id: 15, title: 'Xre the Barbarian', year: '1939' },
{ id: 12, title: 'Vcd the Barbarian', year: '1988' }, { id: 16, title: 'Hyt the Barbarian', year: '1972' }];
const columns = [
    {
        name: 'Title',
        selector: 'title',
        sortable: true,      
    },
    {
        name: 'Year',
        selector: 'year',
        sortable: true,
    },
];

const myTheme = {
    title: {        
        height: '0px !important',
      },
    header: {
        fontSize: '16px',
        fontWeight: '900',
        fontColor: 'black',
    }
}

const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
  };
  
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.callservice();
    }

    callservice() {
        var apiBaseUrl = process.env.REACT_APP_API_KEY + "displayfilelist";

        axios.post(apiBaseUrl, { "name": "a" }).then(function (response) {
            console.log("response=====>>>>>", response)
        }).catch(function (error) {
            console.log("error=====>>>>>", error);
        });
    }



    render() {
        return (
            <div>
                <h1>Data Table</h1>
                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                        customTheme={myTheme}
                        fixedHeader= {true}
                        highlightOnHover={true}
                        responsive={true}     
                        selectableRows={true}    
                        onRowSelected={handleChange}       
                    />
                </div>
            </div>
        );
    }
}

export default Home;