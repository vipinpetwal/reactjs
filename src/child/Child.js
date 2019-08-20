import React from 'react';
//import axios from 'axios';
import './Child.css';
import Modal from 'react-responsive-modal';


class Child extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            type: '',
            source: '',
            open: false
        };
        this.baseState = this.state;
    }

    componentDidMount() {
        setTimeout(this.setState({
            name: this.props.listNameFromParent.name,
            type: this.props.listNameFromParent.type,
            source: this.props.listNameFromParent.source
        }), 100);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: Math.floor(Math.random() * (1000000)),
            name: nextProps.listNameFromParent.name,
            type: nextProps.listNameFromParent.type,
            source: nextProps.listNameFromParent.source
        });
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === 'name') {
            this.setState({ name: value });
        }
        if (name === 'type') {
            this.setState({ type: value });
        }
        if (name === 'source') {
            this.setState({ source: value });
        }
    }


    mySubmitHandler = async (e) => {
        e.preventDefault();
        await this.props.parentCallback(this.state)
        await this.setState(this.baseState);
        console.log("State After", this.state);
    }


    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    render() {
        const { open } = this.state;
        return (
            <div>
                <h1>Child Component</h1>
                <div>
                    <form onSubmit={this.mySubmitHandler}>
                        <p>Name:</p>
                        <input type="text" name='name' value={this.state.name} onChange={this.myChangeHandler} />
                        <p>Type:</p>
                        <input type="text" name='type' value={this.state.type} onChange={this.myChangeHandler} />
                        <p>Source Key:</p>
                        <input type="text" name='source' value={this.state.source} onChange={this.myChangeHandler} disabled /><br /><br />
                        <button type="button" onClick={this.onOpenModal}>Open modal</button>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2>Simple centered modal</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                             </p>
                        </Modal>
                        {/*   <button type="submit">Add</button> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default Child;